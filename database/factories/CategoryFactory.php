<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $fakeName = fake()->name();
        return [
            'name' => $fakeName,
            'mm_name' => "ဥပမာမြန်မာနာမ်မည်" . uniqid(),
            'slug' => Str::slug(uniqid() . $fakeName),
        ];
    }
}
