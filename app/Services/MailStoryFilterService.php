<?php

namespace App\Services;

use App\Models\MailStory;
use Carbon\Carbon;
use Illuminate\Http\Request;

class MailStoryFilterService
{
    /*
    For the filtration of the mail-stories paginated data
    based on the get request queries 
    */

    public static function mailStoryFilter(Request $request)
    {
        $mailStories = MailStory::query();

        if ($request->search) {
            // search category by english name
            $search = $request->search;
            $mailStories->where('name', 'like', "%$search%");
        }

        if ($request->searchMm) {
            // search category by myanmar name
            $searchMm = $request->searchMm;
            $mailStories->where('mm_name', 'like', "%$searchMm%");
        }

        if ($request->startDate && $request->endDate) {
            // if both startdate and enddate has been detected
            $starDate = Carbon::parse($request->startDate);
            $endDate = Carbon::parse($request->endDate);
            $mailStories->whereBetween('created_at', [$starDate, $endDate]);
        }

        if ($request->sortBy == "latest") {
            $mailStories->orderBy('created_at', 'DESC');
        } else {
            // if the user chanages the story by 
            $mailStories->orderBy('created_at', 'ASC');
        }

        return $mailStories->withCount('stories')->with('admin:name,id')->paginate(15);
    }
}
