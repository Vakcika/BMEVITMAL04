<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $amount = $this->faker->randomFloat(2, 10, 1000);
        $rate = $this->faker->randomFloat(4, 0.8, 1.2);

        return [
            'id' => (string) Str::uuid(),
            'customer_id' => Customer::inRandomOrder()->first()?->id ?? 1,
            'currency_id' => Currency::inRandomOrder()->first()?->id ?? 1,
            'created_by' => User::inRandomOrder()->first()?->id ?? 1,
            'subscription_id' => Subscription::inRandomOrder()->first()?->id,
            'transaction_type' => $this->faker->randomElement(['income', 'expense']),
            'amount' => $amount,
            'amount_in_base' => round($amount * $rate, 2),
            'transaction_date' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'due_date' => $this->faker->optional()->date(),
            'payment_date' => $this->faker->optional()->date(),
            'notes' => $this->faker->sentence,
        ];
    }
}
