<?php

namespace App\Rules;

use App\Models\Subscription;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Translation\PotentiallyTranslatedString;

class SubscriptionConsistency implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param string $attribute
     * @param mixed $value (either amount or currency_id)
     * @param Closure(string): PotentiallyTranslatedString $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $subscriptionId = request('subscription_id');

        if (is_null($subscriptionId)) {
            return;
        }

        $subscription = Subscription::find($subscriptionId);

        if (!$subscription) {
            $fail('The selected subscription does not exist.');
            return;
        }

        // Determine which field we're validating
        if ($attribute === 'amount') {
            if (abs($value - $subscription->amount) >= PHP_FLOAT_EPSILON) {
                $fail('The transaction amount must match the subscription amount of ' . number_format($subscription->amount, 2) . '.');
            }
        } elseif ($attribute === 'currency_id') {
            if ($value != $subscription->currency_id) {
                $fail('The transaction currency must match the subscription currency.');
            }
        }
    }
}
