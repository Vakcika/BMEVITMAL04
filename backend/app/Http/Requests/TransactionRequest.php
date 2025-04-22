<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TransactionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'customer_id' => 'required|exists:customers,id',
            'currency_id' => 'required|exists:currencies,id',
            'created_by_id' => 'required|exists:users,id',
            'subscription_id' => 'nullable|exists:subscriptions,id',
            'transaction_type_id' => 'required|exists:transaction_types,id',
            'amount' => 'required|numeric|min:0',
            'amount_in_base' => 'required|numeric|min:0',
            'transaction_date' => 'required|date',
            'due_date' => 'nullable|date',
            'payment_date' => 'nullable|date',
            'note' => 'nullable|string',
        ];
    }
}
