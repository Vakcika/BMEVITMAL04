<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class DateNotBeforeTransactionDate implements ValidationRule
{

    protected $transactionDate;

    public function __construct($transactionDate = null)
    {
        $this->transactionDate = $transactionDate;
    }

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        // Get transaction date from constructor or from request if not provided
        $transactionDate = $this->transactionDate ?? request('transaction_date');

        if ($value && $transactionDate && strtotime($value) < strtotime($transactionDate)) {
            $fieldName = ucfirst(str_replace('_', ' ', $attribute));
            $fail("The {$fieldName} must not be earlier than the transaction date.");
        }
    }
}
