<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    protected $fillable = [
        'customer_id',
        'billing_cycle_id',
        'currency_id',
        'name',
        'amount',
        'start_date',
        'end_date',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function billingCycle()
    {
        return $this->belongsTo(BillingCycle::class);
    }

    public function currency()
    {
        return $this->belongsTo(Currency::class);
    }
}
