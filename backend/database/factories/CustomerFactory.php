<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Customer>
 */
class CustomerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => $this->faker->numberBetween(1, 4),
            'status_id' => CustomerStatus::inRandomOrder()->first()?->id ?? 1,
            'company_name' => $this->faker->company,
            'name' => $this->faker->name,
            'phone_number' => $this->faker->phoneNumber,
            'email' => $this->faker->unique()->safeEmail,
            'address' => $this->faker->address,
            'tax_number' => $this->faker->ean8,
            'website' => $this->faker->url,
            'description' => $this->faker->sentence,
        ];
    }
}
