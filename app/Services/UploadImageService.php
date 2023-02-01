<?php

namespace App\Services;

class UploadImageService
{
    /*
    Upload the given file to the public disk
    */
    public static function uploadImage($image)
    {
        $image_name = uniqid() . $image->getClientOriginalName();
        $image_path = "/images/" . $image_name;
        $image->storeAs('images', $image_name, 'public'); // upload to the public disk under images folder

        return $image_path;
    }
}
