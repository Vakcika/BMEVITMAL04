<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BillingCycleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('billing_cycles')->insert([
            ['name' => 'Monthly'],
            ['name' => 'Quarterly'],
            ['name' => 'Yearly'],
        ]);
    }
}
