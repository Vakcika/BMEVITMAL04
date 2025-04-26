<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\CustomerResource;
use App\Http\Resources\UserResource;

class TransactionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'customer' => new CustomerResource($this->customer),
            'currency' => $this->currency,
            'created_by' => new UserResource($this->creator),
            'subscription' => $this->subscription,
            'transaction_type' => $this->type,
            'amount' => $this->amount,
            'amount_in_base' => $this->amount_in_base,
            'transaction_date' => $this->transaction_date,
            'due_date' => $this->due_date,
            'payment_date' => $this->payment_date,
            'note' => $this->note,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
