<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Story;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /*
    Give star or cancel the star of the story the user wants to
    */
    public function starTheStory(Request $request)
    {
        $locale = $request->hasHeader('Locale') ? $request->header('Locale') : config('app.locale');

        $request->validate([
            'slug' => 'required',
            'user_id' => 'required',
            'user_type' => 'required',
        ], [
            "required", __('auth.required', [], $locale)
        ]);

        $story = Story::where('slug', $request->slug)->first();
        if (!$story) {
            return response()->json([
                "errors" => [
                    "errors" => [__('site.something_went_wrong', [], $locale)]
                ]
            ], 422);
        }

        $userExists = false;
        $adminExists = false;

        if ($request->user_type === 'user') {
            if ($story->favUsers->contains($request->user_id)) {
                $userExists = true;
                $story->favUsers()->detach($request->user_id);
            } else {
                $story->favUsers()->attach($request->user_id);
            }
        } else {
            if ($story->favAdmins->contains($request->user_id)) {
                $adminExists = true;
                $story->favAdmins()->detach($request->user_id);
            } else {
                $story->favAdmins()->attach($request->user_id);
            }
        }

        $star = $userExists || $adminExists ? false : true;

        return response()->json([
            'data' => $star,
        ]);
    }

    /*
    Check if the story should have a star or not
    */
    public function checkStar(Request $request)
    {
        $locale = $request->hasHeader('Locale') ? $request->header('Locale') : config('app.locale');

        $request->validate([
            'slug' => 'required',
            'user_id' => 'required',
            'user_type' => 'required',
        ], [
            "required", __('auth.required', [], $locale)
        ]);

        $story = Story::where('slug', $request->slug)->first();
        if (!$story) {
            return response()->json([
                "errors" => [
                    "errors" => [__('site.something_went_wrong', [], $locale)]
                ]
            ], 422);
        }

        $userExists = false;
        $adminExists = false;

        if ($request->user_type === 'user') {
            $userExists = $story->favUsers->contains($request->user_id);
        } else {
            $adminExists = $story->favAdmins->contains($request->user_id);
        }

        $star = $userExists || $adminExists ? true : false;

        return response()->json([
            'data' => $star,
        ]);
    }
}
