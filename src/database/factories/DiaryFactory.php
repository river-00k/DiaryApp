<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class DiaryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'user_id' => $this->faker->numberBetween($min=1, $max=3),
            'date' => $this->faker->date($format='Y-m-d'),
            'evaluation' => $this->faker->numberBetween($min=1, $max=5),
            'text' => $this->faker->realText(),

        ];
    }
}
