<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Story>
 */
class StoryFactory extends Factory
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
            'mm_name' => 'ဥပမာမြန်မာစာကားလုံး' . uniqid(),
            'slug' => Str::slug(uniqid() . $fakeName),
            'description' => '<p>' . fake()->paragraph(7) . '</p>',
            'mm_description' => '<p>' . 'ဥပမာမြန်မာစာကားလုံး' . uniqid() . fake()->paragraph(5) . '</p>',
            'image' => "/images/404.jpg",
            'admin_id' => random_int(1, 5),
        ];
    }
}
