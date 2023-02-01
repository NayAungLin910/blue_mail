<?php

namespace Tests\Feature;

use App\Models\Category;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\CreatesApplication;
use Tests\TestCase;

class CategoryApiTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_category_create()
    {
        $response = $this->postJson(
            '/api/categories/create',
            [
                'name' => 'Categorytest995',
                'mm_name' => 'အမျိုးအစားtest995',
            ]
        );

        $response->assertStatus(200)->assertJson(
            fn (AssertableJson $json) =>
            $json->has('data')
        );
    }

    public function test_category_get_data()
    {
        $response = $this->getJson('/api/categories/get/data');

        $response->assertStatus(200)->assertJson(
            fn (AssertableJson $json) =>
            $json->has('data')
                ->whereType('data', 'array')
                ->etc()
        );
    }

    public function test_category_edit()
    {
        $category = Category::where('name', 'Categorytest995')->where('mm_name', 'အမျိုးအစားtest995')->first();

        if (!$category) {
            $this->fail('The category was not found!');
        }

        $response = $this->postJson(
            '/api/categories/edit',
            [
                'name' => 'NewCategorytest995',
                'mm_name' => 'အမျိုးအစားtest995',
                'slug' => $category->slug,
            ]
        );

        $response->assertStatus(200)->assertJson(
            fn (AssertableJson $json) =>
            $json->has('data')
                ->whereType('data', 'array')
                ->etc()
        );
    }

    public function test_category_delete()
    {
        $category = Category::where('name', 'NewCategorytest995')->where('mm_name', 'အမျိုးအစားtest995')->first();

        if (!$category) {
            $this->fail('The category was not found!');
        }

        $response = $this->postJson('/api/categories/delete', ['slug' => $category->slug]);

        $response->assertStatus(200)->assertJson(
            fn (AssertableJson $json) =>
            $json->has('data')
        );
    }
}
