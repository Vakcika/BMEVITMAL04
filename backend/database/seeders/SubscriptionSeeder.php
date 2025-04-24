<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

use App\Models\Customer;
use App\Models\Currency;
use App\Models\BillingCycle;
use Faker\Factory as Faker;

class SubscriptionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        $customers = Customer::pluck('id');
        $billingCycles = BillingCycle::pluck('id');
        $currencies = Currency::pluck('id');

        foreach (range(1, 30) as $i) {
            $start = $faker->dateTimeBetween('-6 months', 'now');
            $end = $faker->optional()->dateTimeBetween($start, '+6 months');

            DB::table('subscriptions')->insert([
                'customer_id' => $faker->randomElement($customers),
                'billing_cycle_id' => $faker->randomElement($billingCycles),
                'currency_id' => $faker->randomElement($currencies),
                'name' => $faker->word . ' Plan',
                'amount' => $faker->randomFloat(2, 10, 500),
                'start_date' => $start->format('Y-m-d'),
                'end_date' => $end?->format('Y-m-d'),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
