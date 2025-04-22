<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Log>
 */
class LogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'customer_id' => Customer::inRandomOrder()->first()?->id ?? 1,
            'user_id' => User::inRandomOrder()->first()?->id ?? 1,
            'type' => LogStatus::inRandomOrder()->first()?->id ?? 1,
            'follow_up_date' => $this->faker->optional()->dateTimeBetween('+1 day', '+1 month'),
            'description' => $this->faker->paragraph,
        ];
    }
}
