<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use \App\Rules\TransactionBillingCycleLimit;
use \App\Rules\DateNotBeforeTransactionDate;
use \App\Rules\SubscriptionConsistency;
use App\Models\Currency;

class TransactionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        /** @var \Illuminate\Http\Request $this */
        $currencyCode = $this->input('currency.code') ?? $this->input('currency');

        if ($currencyCode) {
            $currency = Currency::where('code', strtoupper($currencyCode))->first();

            if ($currency) {
                $this->merge([
                    'currency_id' => $currency->id,
                ]);
            }
        }
    }

    public function rules(): array
    {
        return [
            'customer_id' => 'required|exists:customers,id',
            'currency_id' => [
                'required',
                'exists:currencies,id',
                new SubscriptionConsistency()
            ],
            'created_by_id' => 'required|exists:users,id',
            'subscription_id' => ['nullable', 'exists:subscriptions,id', new TransactionBillingCycleLimit()],
            'transaction_type_id' => 'required|exists:transaction_types,id',
            'amount' => [
                'required',
                'numeric',
                'min:0',
                new SubscriptionConsistency()
            ],
            'amount_in_base' => 'required|numeric|min:0',
            'transaction_date' => 'required|date',
            'due_date' => [
                'nullable',
                'date',
                new DateNotBeforeTransactionDate(request('transaction_date'))
            ],
            'payment_date' => [
                'nullable',
                'date',
                new DateNotBeforeTransactionDate(request('transaction_date'))
            ],
            'note' => 'nullable|string',
        ];
    }
}
