<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CustomerStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('customer_statuses')->insert([
            ['name' => 'Outreached'],
            ['name' => 'Meeting Scheduled'],
            ['name' => 'Offer Sent'],
            ['name' => 'In Progress'],
            ['name' => 'Loyal Customer'],
            ['name' => 'Failed'],
        ]);
    }
}
