<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Story;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class StorySeeder extends Seeder
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

        $story = Story::create([
            'name' => "Business is Booming",
            'mm_name' => "စီးပွားရေးကောင်းနေပြီ",
            'slug' => Str::slug(uniqid() . "Business is Booming"),
            'description' => '<p>' . "The business is going well again! Well, that seems to be a relief!" . '</p>',
            'mm_description' => '<p>' . 'ဥပမာမြန်မာစာကားလုံး' . "စီးပွားရေးကောင်းလို့တော်ပါသေးတယ်။" . '</p>',
            'image' => "/images/404.jpg",
            'admin_id' => random_int(1, 5),
        ]);
        $story->categories()->sync([1]);

        $story = Story::create([
            'name' => "Business is Down!",
            'mm_name' => "စီးပွားရေးမကောင်းပါ",
            'slug' => Str::slug(uniqid() . "Business is Down"),
            'description' => '<p>' . "Well, the business is down again bois! We am doomed!" . '</p>',
            'mm_description' => '<p>' . 'ဥပမာမြန်မာစာကားလုံး' . "စီးပွားရေးမကောင်းလို့ခက်ပါသေးတယ်။" . '</p>',
            'image' => "/images/404.jpg",
            'admin_id' => random_int(1, 5),
        ]);
        $story->categories()->sync([1]);

        $story = Story::create([
            'name' => "Sports are Amazing!",
            'mm_name' => "အားကစားသည်ကောင်းသည်။",
            'slug' => Str::slug(uniqid() . "Sports are Amazing!"),
            'description' => '<p>' . "Just do more and more sports bro!" . '</p>',
            'mm_description' => '<p>' . 'ဥပမာမြန်မာစာကားလုံး' . "အားကစားများများလုပ်ပါ" . '</p>',
            'image' => "/images/404.jpg",
            'admin_id' => random_int(1, 5),
        ]);
        $story->categories()->sync([2]);

        $story = Story::create([
            'name' => "Sports are Not that Good!",
            'mm_name' => "အားကစားသည်မကောင်းပါ",
            'slug' => Str::slug(uniqid() . "Sports are Not that Good!"),
            'description' => '<p>' . "Do less sports bro. Just go easy!" . '</p>',
            'mm_description' => '<p>' . 'ဥပမာမြန်မာစာကားလုံး' . "အားကစားနည်းနည်းပဲလုပ်ပါ။" . '</p>',
            'image' => "/images/404.jpg",
            'admin_id' => random_int(1, 5),
        ]);
        $story->categories()->sync([2]);

        Story::factory()
            ->count(15)
            ->has(Category::factory()->count(2))
            ->create();
    }
}
