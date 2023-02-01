<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Story;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /*
    Give home page api data
    */
    public function getData(Request $request)
    {
        $locale = $request->hasHeader('Locale') ? $request->header('Locale') : config('app.locale');

        $featured = Story::where('featured', 'yes')->select('id', 'name', 'mm_name', 'slug', 'image', 'admin_id', 'featured')->first();

        $latest = Story::take(4)->select('id', 'name', 'mm_name', 'slug', 'image', 'admin_id', 'featured')->latest()->get();
        if (!$latest) {
            return response()->json([
                "errors" => [
                    "errors" => [__('site.something_went_wrong', [], $locale)]
                ]
            ], 422);
        }

        $sports = Story::take(4)
            ->select('id', 'name', 'mm_name', 'slug', 'image', 'admin_id', 'featured')
            ->whereHas(
                'categories',
                fn ($q) =>
                $q->where('categories.id', '2')
            )->latest()->get();

        if (!$sports) {
            return response()->json([
                "errors" => [
                    "errors" => [__('site.something_went_wrong', [], $locale)]
                ]
            ], 422);
        }

        $businesses = Story::take(4)
            ->select('id', 'name', 'mm_name', 'slug', 'image', 'admin_id', 'featured')
            ->whereHas(
                'categories',
                fn ($q) =>
                $q->where('categories.id', '1')
            )->latest()->get();

        if (!$businesses) {
            return response()->json([
                "errors" => [
                    "errors" => [__('site.something_went_wrong', [], $locale)]
                ]
            ], 422);
        }

        return response()->json([
            "data" => [
                "featured" => $featured,
                "latest" => $latest,
                "sports" => $sports,
                "businesses" => $businesses,
            ]
        ]);
    }
}
