<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CustomerStatus extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'name',
    ];
}
