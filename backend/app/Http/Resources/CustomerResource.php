<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\UserResource;

class CustomerResource extends JsonResource
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
            'user' => new UserResource($this->user),
            'status' => $this->status ? [
                'id' => $this->status->id,
                'name' => $this->status->name,
            ] : null,
            'company_name' => $this->company_name,
            'name' => $this->name,
            'phone_number' => $this->phone_number,
            'email' => $this->email,
            'address' => $this->address,
            'tax_number' => $this->tax_number,
            'website' => $this->website,
            'description' => $this->description,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
