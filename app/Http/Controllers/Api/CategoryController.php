<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Category\CreateCategoryRequest;
use App\Http\Requests\Api\Category\EditCategoryRequest;
use App\Models\Category;
use App\Services\CategoryFilterService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    public function createCategory(CreateCategoryRequest $request)
    {
        /*
        Note that the "CreateCategoryRequest" Request class has already 
        handled some validations for the category create request.
        */

        // After passing the validation, create a category
        $category = Category::create([
            'name' => $request->name,
            'mm_name' => $request->mm_name,
            'slug' => Str::slug(uniqid() . $request->name),
        ]);

        if (!$category) {
            // if the category creation failed
            return response()->json([
                "errors" => [
                    "errors" => [__('site.something_went_wrong', [], $request->locale)]
                ]
            ], 422);
        }

        // after successful category creation, return a message
        return response()->json([
            "data" => __('site.category_create_success', [], $request->locale),
        ]);
    }

    public function editCategory(EditCategoryRequest $request)
    {
        /*
        Note that the "EditCategoryRequest" Request class has already handled 
        some validation for the category edit request.
        */

        // After passsing the validation update the category information
        $request->category->name = $request->name;
        $request->category->mm_name = $request->mm_name;
        $request->category->slug = Str::slug(uniqid() . $request->name);
        $request->category->save();

        // after successfully updaing the category, send the message
        return response()->json([
            "data" => [
                "latest_slug" => $request->category->slug,
                "message" =>  __('site.update_process_success', [], $request->locale)
            ],
        ]);
    }

    public function deleteCategory(Request $request)
    {
        $locale = $request->hasHeader('Locale') ? $request->header('Locale') : config('app.locale');

        $request->validate([
            'slug' => 'required',
        ], [
            'required' => __('auth.required', [], $locale),
        ]);

        // After passing the validation, search the category
        $category = Category::where('slug', $request->slug)->first();

        if (!$category) {
            // if no category is found return the error message
            return response()->json([
                "errors" => [
                    "errors" =>  [__('site.something_went_wrong', [], $locale)]
                ]
            ], 422);
        }

        $category->delete();// if the category exists, delete it

        // return the deleted success message 
        return response()->json([
            "data" => __('site.delete_process_success', [], $locale),
        ]);
    }

    public function getData(Request $request)
    {
        // filter the categories using the custom category filter service
        $categories = CategoryFilterService::categoryFilter($request);

        // return the paginated categories data
        return response()->json([
            "data" => $categories,
        ]);
    }

    public function getSelectData()
    {
        $categories = Category::all();

        $selectData = [];

        // loop the categories collection and format the data
        foreach ($categories as $category) {
            array_push($selectData, [
                'value' => $category->id,
                'label' => $category->name,
            ]);
        }

        // return the formatted categories data for react multi select component
        return response()->json([
            "data" => $selectData
        ]);
    }
}
