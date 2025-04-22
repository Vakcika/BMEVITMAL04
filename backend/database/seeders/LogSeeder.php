<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        $customers = Customer::pluck('id');
        $users = User::pluck('id');
        $statuses = LogStatus::pluck('id');

        foreach (range(1, 50) as $i) {
            DB::table('logs')->insert([
                'customer_id' => $faker->randomElement($customers),
                'user_id' => $faker->randomElement($users),
                'type' => $faker->randomElement($statuses),
                'follow_up_date' => $faker->optional()->dateTimeBetween('+1 days', '+2 months'),
                'description' => $faker->sentence,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }
    }
}
