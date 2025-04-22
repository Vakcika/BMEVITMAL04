<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Subscription>
 */
class SubscriptionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $start = $this->faker->dateTimeBetween('-6 months', 'now');
        $end = $this->faker->optional()->dateTimeBetween($start, '+6 months');

        return [
            'customer_id' => Customer::inRandomOrder()->first()?->id ?? 1,
            'billing_cycle' => BillingCycle::inRandomOrder()->first()?->id ?? 1,
            'currency_id' => Currency::inRandomOrder()->first()?->id ?? 1,
            'name' => $this->faker->word . ' Plan',
            'amount' => $this->faker->randomFloat(2, 10, 500),
            'start_date' => $start->format('Y-m-d'),
            'end_date' => $end?->format('Y-m-d'),
        ];
    }
}
