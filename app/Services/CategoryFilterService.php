<?php

namespace App\Services;

use App\Models\Category;
use Carbon\Carbon;
use Illuminate\Http\Request;

class CategoryFilterService
{
    /*
    For filtering the paginated categories data based on
    the get method query result
    */
    public static function categoryFilter(Request $request)
    {
        $categories = Category::query();
        $pageCount = "10";

        if ($request->pageCount) {
            $pageCount = $request->pageCount; // the number of total pagination data
        }

        if ($request->search) {
            // search category by english name
            $search = $request->search;
            $categories = $categories->where('name', 'like', "%$search%");
        }

        if ($request->searchMm) {
            // search category by myanmar name
            $searchMm = $request->searchMm;
            $categories = $categories->where('mm_name', 'like', "%$searchMm%");
        }

        $sortBy = "latest";
        if ($request->sortBy) {
            $sortBy = $request->sortBy; // if the user changes the sort by
        }

        if ($request->startDate && $request->endDate) {
            // if both startdate and enddate has been detected
            $starDate = Carbon::parse($request->startDate);
            $endDate = Carbon::parse($request->endDate);
            $categories = $categories->whereBetween('created_at', [$starDate, $endDate]);
        }

        if ($sortBy == "latest") {
            $categories = $categories->orderBy('created_at', 'DESC');
        } else {
            // if the user chanages the story by 
            $categories = $categories->orderBy('created_at', 'ASC');
        }

        return $categories->withCount('stories')->paginate($pageCount);
    }
}
