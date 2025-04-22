<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\CustomerStatus;
use Carbon\Carbon;
use Faker\Factory as Faker;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        $userIds = User::pluck('id')->toArray();
        $statusIds = CustomerStatus::pluck('id')->toArray();

        foreach (range(1, 30) as $i) {
            DB::table('customers')->insert([
                'user_id' => $faker->randomElement($userIds),
                'status_id' => $faker->randomElement($statusIds),
                'company_name' => $faker->company,
                'name' => $faker->name,
                'phone_number' => $faker->phoneNumber,
                'email' => $faker->unique()->safeEmail,
                'address' => $faker->address,
                'tax_number' => $faker->ean8,
                'website' => $faker->url,
                'description' => $faker->sentence,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }
    }
}
