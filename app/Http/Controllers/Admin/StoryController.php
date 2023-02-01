<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Story;

class StoryController extends Controller
{
    public function getStory()
    {
        $initialCategory = [];
        $search = "";
        return view('stories.stories', compact('initialCategory', 'search'));
    }

    public function createStory()
    {
        return view('stories.stories-create');
    }

    public function editStory($slug)
    {
        $story = Story::where('slug', $slug)->first();
        return view('stories.stories-edit', compact('story'));
    }
}
