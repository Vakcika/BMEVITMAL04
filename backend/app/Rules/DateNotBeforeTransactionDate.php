<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Carbon;

class DateNotBeforeTransactionDate implements ValidationRule
{
    protected ?Carbon $transactionDate;

    public function __construct($transactionDate = null)
    {
        $this->transactionDate = $transactionDate ? Carbon::parse($transactionDate) : null;
    }

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (empty($value)) {
            return;
        }

        try {
            $dateToCheck = Carbon::parse($value)->startOfDay();
            $comparisonDate = ($this->transactionDate ?? Carbon::parse(request('transaction_date')))->startOfDay();

            if ($dateToCheck->lessThan($comparisonDate)) {
                $fieldName = ucfirst(str_replace('_', ' ', $attribute));
                $fail("The {$fieldName} must be on or after the transaction date ({$comparisonDate->toDateString()}).");
            }
        } catch (\Exception $e) {
            $fail("Invalid date format provided for {$attribute}.");
        }
    }
}
