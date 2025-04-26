<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use App\Models\Subscription;
use App\Models\Transaction;
use Carbon\Carbon;

class TransactionBillingCycleLimit implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (empty($value)) {
            return;
        }

        $subscription = Subscription::find($value);
        if (!$subscription) {
            $fail('The selected subscription does not exist.');
            return;
        }

        // Get transaction date from request
        $transactionDate = request('transaction_date');
        if (!$transactionDate) {
            $fail('Transaction date is required to validate against subscription billing cycle.');
            return;
        }

        // Check if editing an existing transaction for this subscription
        $currentTransactionId = request()->route('id');
        if ($currentTransactionId) {
            // If found a transaction ID in the route, check if it belongs to this subscription
            $existingTransaction = Transaction::find($currentTransactionId);

            // If editing a transaction that already belongs to this subscription, allow it
            if ($existingTransaction && $existingTransaction->subscription_id == $value) {
                return; // Skip validation - modifying an existing transaction for this subscription
            }
        }

        $date = Carbon::parse($transactionDate);

        // Get period dates based on billing cycle
        $periodStart = null;
        $periodEnd = null;
        switch ($subscription->billingCycle->name) {
            case 'Monthly':
                $periodStart = (clone $date)->startOfMonth();
                $periodEnd = (clone $date)->endOfMonth();
                break;
            case 'Quarterly':
                $quarter = ceil($date->month / 3);
                $periodStart = Carbon::create($date->year, ($quarter - 1) * 3 + 1, 1)->startOfMonth();
                $periodEnd = Carbon::create($date->year, $quarter * 3, 1)->endOfMonth();
                break;
            case 'Yearly':
                $periodStart = (clone $date)->startOfYear();
                $periodEnd = (clone $date)->endOfYear();
                break;
            default:
                $fail('Invalid billing cycle type.');
                return;
        }

        // Count transactions in this period
        $transactionCount = Transaction::where('subscription_id', $subscription->id)
            ->whereBetween('transaction_date', [$periodStart, $periodEnd])
            ->count();

        // Each billing cycle allows only 1 transaction per period
        if ($transactionCount > 0) {
            $fail("This subscription already has the maximum allowed transactions for the current {$subscription->billingCycle->name} billing period. ({$transactionCount})");
        }
    }
}
