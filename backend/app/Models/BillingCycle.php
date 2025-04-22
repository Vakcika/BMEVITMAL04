<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BillingCycle extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'name',
    ];
}
