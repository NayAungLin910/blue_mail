<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Category::create([
            "name" => 'Business',
            'mm_name' => 'စီးပွားရေး',
            'slug' => Str::slug(uniqid() . 'Business'),
        ]);
        Category::create([
            "name" => 'Sports',
            'mm_name' => 'အားကစား',
            'slug' => Str::slug(uniqid() . 'Sports'),
        ]);
        Category::factory()->count(10)->create();
    }
}
