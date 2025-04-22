<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CustomerRequest extends FormRequest
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
            'user_id' => 'required|exists:users,id',
            'status_id' => 'required|exists:customer_statuses,id',
            'company_name' => 'required|string|max:55',
            'name' => 'required|string|max:55',
            'phone_number' => 'nullable|string|max:20',
            'email' => 'required|email|max:55',
            'address' => 'nullable|string',
            'tax_number' => 'nullable|string|max:55',
            'website' => 'nullable|string|max:255',
            'description' => 'nullable|string',
        ];
    }
}
