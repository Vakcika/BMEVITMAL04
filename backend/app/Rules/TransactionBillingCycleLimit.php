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
        // If no subscription_id provided, no validation needed
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

        // Count transactions in this period (excluding current transaction if updating)
        $query = Transaction::where('subscription_id', $subscription->id)
            ->whereBetween('transaction_date', [$periodStart, $periodEnd]);

        // If updating existing transaction, exclude it from count
        if (request()->route('transaction')) {
            $query->where('id', '!=', request()->route('transaction'));
        }

        $transactionCount = $query->count();

        // Each billing cycle allows only 1 transaction per period
        if ($transactionCount > 0) {
            $fail("This subscription already has the maximum allowed transactions for the current {$subscription->billingCycle->name} billing period.");
        }
    }
}
