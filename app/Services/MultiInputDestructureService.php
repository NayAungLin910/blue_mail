<?php

namespace App\Services;

class MultiInputDestructureService {

    /*
    For destructuring the multi input categories
    response from the user.
    */
    public static function destructureCategories($categories) 
    {
        $category_ids = [];

        $categories = json_decode($categories);

        foreach ($categories as $category) {
            array_push($category_ids, $category->value);
        }

        return $category_ids; // returns an array containing all the ids of the categories
    }
}