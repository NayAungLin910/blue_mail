<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\MailStory\CreateMailStoryRequest;
use App\Jobs\MailStorySendingToUsers;
use App\Models\MailStory;
use App\Models\Story;
use App\Services\MailStoryFilterService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class MailStoryController extends Controller
{
    /*
    Create a MailStory and send it to all the users
    */
    public function createAndSendMailStory(CreateMailStoryRequest $request)
    {
        /*
        Note that the "CreateStoryRequest" Request class has already 
        handled some validations for the mail story create request.
        */

        $stories_slugs = json_decode($request->storiesSlugs); // if validated, get the stories data

        $stories = Story::whereIn('slug', $stories_slugs)->with('admin')->get();

        $stories_ids = [];
        foreach ($stories as $story) {
            array_push($stories_ids, $story->id); // push the ids of the stories to the stories ids array
        }

        // create a mail story
        $mailStory = MailStory::create([
            "name" => $request->name,
            "slug" => Str::slug(uniqid() . $request->name),
            "mm_name" => $request->mm_name,
            "admin_id" => $request->admin_id,
        ]);

        if (!$mailStory) {
            // if the mail story creation failed
            return response()->json([
                "errors" => [
                    "errors" => [__('site.something_went_wrong', [], $request->locale)]
                ]
            ], 422);
        }

        $mailStory->stories()->sync($stories_ids); // sync the related stories id

        MailStorySendingToUsers::dispatch($stories, $mailStory->name, $mailStory->mm_name); // dispatch the job to send the mail

        // return a success message
        return response()->json([
            "data" => __('site.mail_process_success', [], $request->locale)
        ]);
    }

    /*
    Get the mail-stories data
    */
    public function getMailStoryData(Request $request)
    {
        // filter the mail-stories paginated data with the custom service
        $mailStories = MailStoryFilterService::mailStoryFilter($request);

        // return the paginated mail-stories data
        return response()->json([
            "data" => $mailStories,
        ]);
    }
}
