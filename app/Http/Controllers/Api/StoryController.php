<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Story\CreateStoryRequest;
use App\Http\Requests\Api\Story\UpdateStoryRequest;
use App\Models\Category;
use App\Models\Story;
use App\Services\UploadImageService;
use App\Services\MultiInputDestructureService;
use App\Services\StoryFilterService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class StoryController extends Controller
{
    public function createStory(CreateStoryRequest $request)
    {
        /*
        Note that the "CreateStoryRequest" Request class has already 
        handled some validations for the user request.
        */

        // upload the image to the public disk
        $image_path =  UploadImageService::uploadImage($request->file('image'));

        // create a story
        $story = Story::create([
            "name" => $request->name,
            "mm_name" => $request->mm_name,
            "slug" => Str::slug(uniqid() . $request->name),
            "image" => $image_path,
            "description" => $request->description,
            "mm_description" => $request->mm_description,
            "admin_id" => $request->admin_id,
        ]);

        if (!$story) {
            // if the creation failed
            return response()->json([
                "errors" => [
                    "errors" => [__('site.something_went_wrong', [], $request->locale)]
                ]
            ], 422);
        }

        // get the category id array from the request by destructuring
        $category_ids = MultiInputDestructureService::destructureCategories($request->categories);

        // sync the category ids related to the story to the pivot table
        $story->categories()->sync($category_ids);

        // after the successful story creation, return the message
        return response()->json([
            "data" =>  [
                "message" => __('site.create_process_success', [], $request->locale),
            ]
        ]);
    }

    public function updateStory(UpdateStoryRequest $request)
    {
        /*
        Note that the "UpdateStoryRequest" Request class has already 
        handled some validations for the user request.
        */

        if ($request->image) {
            // if new image is selected delete the old image
            if (Storage::disk('public')->exists($request->story->image)) {
                Storage::disk('public')->delete($request->story->image);
            }
            // upload a new image
            $request->story->image = UploadImageService::uploadImage($request->file('image'));
        }

        // get the category id array from the request by destructuring
        $category_ids = MultiInputDestructureService::destructureCategories($request->categories);

        // sync the category ids related to the story to the pivot table
        $request->story->categories()->sync($category_ids);

        // update the latest data
        $request->story->name = $request->name;
        $request->story->mm_name = $request->mm_name;
        $request->story->description = $request->description;
        $request->story->mm_description = $request->mm_description;
        $request->story->save();

        // after the successful story creation, return the message
        return response()->json([
            "data" =>  [
                "message" => __('site.update_process_success', [], $request->locale),
            ]
        ]);
    }

    public function getStories(Request $request)
    {
        // filtering and getting the paginated stories data
        $stories =  StoryFilterService::storyFilter($request);

        // returning the paginated stories data
        return response()->json([
            "data" => $stories,
        ]);
    }

    public function getEditStory(Request $request)
    {
        $locale = $request->hasHeader('Locale') ? $request->header('Locale') : config('app.locale');

        if (!$request->slug) {
            // if slug is no slug found in request

            return response()->json([
                "errors" => [
                    "errors" => [__('site.something_went_wrong', [], $locale)]
                ]
            ], 422);
        }

        $story = Story::with('categories')->where('slug', $request->slug)->first();

        if (!$story) {
            // if there are no stories matching the slug

            return response()->json([
                "errors" => [
                    "errors" => [__('site.something_went_wrong', [], $locale)]
                ]
            ], 422);
        }

        $categories = Category::all();

        $selectData = [];

        // loop the categories collection and format the data
        foreach ($categories as $category) {
            array_push($selectData, [
                'value' => $category->id,
                'label' => $category->name,
            ]);
        }

        // if the story is found, return the data
        return response()->json([
            "data" => [
                "story" => $story,
                "categories" => $selectData,
            ],
        ]);
    }

    public function deleteStory(Request $request)
    {
        $locale = $request->hasHeader('Locale') ? $request->header('Locale') : config('app.locale');

        $request->validate([
            "slug" => "required"
        ], [
            "required", __('auth.required', [], $locale)
        ]);

        // After successful validation
        $story = Story::where('slug', $request->slug)->first();

        if (!$story) {
            // if story is not found send an error message
            return response()->json([
                "errors" => [
                    "errors" => [__('site.something_went_wrong', [], $locale)]
                ]
            ], 422);
        }

        if ($story->image) {
            // if story has an image
            if (Storage::disk('public')->exists($story->image)) {
                // if the image exists in the disk delete the image
                Storage::disk('public')->delete($story->image);
            }
        }

        $story->delete(); // delete the story

        // return the deleted success message 
        return response()->json([
            "data" => __('site.delete_process_success', [], $locale),
        ]);
    }

    public function makeStoryFeatured(Request $request)
    {
        $locale = $request->hasHeader('Locale') ? $request->header('Locale') : config('app.locale');

        $request->validate([
            "slug" => "required"
        ], [
            "required", __('auth.required', [], $locale)
        ]);

        // After successful validation
        $story = Story::where('slug', $request->slug)->first();
        if (!$story) {
            // if story is not found send an error message
            return response()->json([
                "errors" => [
                    "errors" => [__('site.something_went_wrong', [], $locale)]
                ]
            ], 422);
        }

        // unfeature the previously featured story
        $preFeatured =  Story::where('featured', 'yes')->first();
        if($preFeatured) {
            $preFeatured->featured = "no";
            $preFeatured->save();
        }

        // feature the selected story
        $story->featured = "yes";
        $story->save();

        // return the deleted success message 
        return response()->json([
            "data" => __('site.feature_process_success', [], $locale),
        ]);
    }
}
