<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

use App\Models\Customer;
use App\Models\User;
use App\Models\Currency;
use App\Models\Subscription;
use App\Models\TransactionType;

use Carbon\Carbon;
use Faker\Factory as Faker;

class TransactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        $customers = Customer::pluck('id')->toArray();
        $currencies = Currency::pluck('id')->toArray();
        $subscriptions = Subscription::pluck('id')->toArray();
        $users = User::pluck('id')->toArray();

        foreach (range(1, 50) as $i) {
            $amount = $faker->randomFloat(2, 10, 1000);
            $rate = $faker->randomFloat(4, 0.8, 1.2);
            DB::table('transactions')->insert([
                'id' => (string) Str::uuid(),
                'customer_id' => $faker->randomElement($customers),
                'currency_id' => $faker->randomElement($currencies),
                'created_by_id' => $faker->randomElement($users),
                'subscription_id' => $faker->optional()->randomElement($subscriptions),
                'transaction_type_id' => TransactionType::inRandomOrder()->first()?->id ?? 1,
                'amount' => $amount,
                'amount_in_base' => round($amount * $rate, 2),
                'transaction_date' => Carbon::now()->subDays(rand(0, 365)),
                'due_date' => $faker->optional()->date(),
                'payment_date' => $faker->optional()->date(),
                'note' => $faker->sentence,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
