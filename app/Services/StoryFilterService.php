<?php

namespace App\Services;

use App\Models\Story;
use Carbon\Carbon;
use Illuminate\Http\Request;

class StoryFilterService
{
    /*
    For filtering the stories data and returning the paginated
    sotries result.
    */
    public static function storyFilter(Request $request)
    {
        $stories = Story::query();

        if ($request->search) {
            // if the user search by english name
            $search = $request->search;
            $stories->where('name', 'like', "%$search%");
        }

        if ($request->mm_search) {
            // if the user search by myanmar name
            $mmSearch = $request->mm_search;
            $stories->where('mm_name', 'like', "%$mmSearch%");
        }

        if ($request->start_date && $request->end_date) {
            // if both startdate and enddate has been detected
            $starDate = Carbon::parse($request->start_date);
            $endDate = Carbon::parse($request->end_date);
            $stories->whereBetween('created_at', [$starDate, $endDate]);
        }

        if ($request->categories) {
            $categories = json_decode($request->categories);
            if ($categories) {
                // if there are categories user selected

                $category_ids = [];
                foreach ($categories as $c) {
                    array_push($category_ids, $c->value);
                }

                $stories->whereHas('categories', function ($query) use ($category_ids) {
                    $query->whereIn('categories.id', $category_ids);
                });
            }
        }

        $sortby = "latest";
        if ($request->sortby) {
            $sortby = $request->sortby; // if the user changes the sort by
        }
        if ($sortby == "latest") {
            $stories->orderBy('created_at', 'DESC');
        } else {
            // if the user chanages the stort by 
            $stories->orderBy('created_at', 'ASC');
        }


        $stories = $stories
            ->select('id', 'name', 'mm_name', 'slug', 'image', 'featured', 'created_at')
            ->with('categories:id,name,mm_name,slug')
            ->paginate(9);

        return $stories;
    }
}
