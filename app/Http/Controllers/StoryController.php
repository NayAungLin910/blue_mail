<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Story;
use Illuminate\Http\Request;

class StoryController extends Controller
{
    public function viewStory($slug)
    {
        $story = Story::where('slug', $slug)->with('categories', 'admin')->first();

        if (!$story) {
            // if the story does not exists
            return redirect()->back()->with('error', __('site.something_went_wrong'));
        }

        // if found, return the related view 
        return view('stories.stories-view', compact('story'));
    }

    public function viewStories(Request $request)
    {
        $initialCategory = [];
        $search = "";
        if ($request->search) {
            $search = $request->search;
        }
        if ($request->category) {
            $category = Category::where('slug', $request->category)->first();
            if ($category) {
                array_push($initialCategory, [
                    'value' => $category->id,
                    'label' => $category->name,
                ]);
            }
        }
        return view('stories.stories', compact('initialCategory', 'search'));
    }
}
