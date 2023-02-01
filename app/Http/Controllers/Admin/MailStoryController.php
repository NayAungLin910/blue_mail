<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MailStory;
use Illuminate\Http\Request;

class MailStoryController extends Controller
{
    /*
    create and send the mail stories to the user
    */
    public function createMailStory()
    {
        return view('mail-stories.mail-stories-create');
    }

    /*
    view the created mail-stories
    */
    public function viewMailStories()
    {
        return view('mail-stories.mail-stories-view');
    }

    /*
    view a specific mail-story
    */
    public function viewSpecificMailStory($slug)
    {
        $mailStory = MailStory::where('slug', $slug)->with('stories')->first();

        return view('mail-stories.mail-stories', compact('mailStory'));
    }
}
