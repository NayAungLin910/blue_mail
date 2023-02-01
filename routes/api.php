<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// profile api routes
Route::prefix('profile')->group(function () {
    Route::get('/get-user-data/{type}/{id}', [\App\Http\Controllers\Api\ProfileController::class, "getUserData"]);
    Route::post('/change-user-name', [\App\Http\Controllers\Api\ProfileController::class, "changeUserName"]);
    Route::post('/send-new-email-verify-code', [\App\Http\Controllers\Api\ProfileController::class, "sendNewEmailVerifyCode"]);
    Route::post('/verify-new-email', [\App\Http\Controllers\Api\ProfileController::class, "verifyNewEmail"]);
    Route::post('/change-password', [\App\Http\Controllers\Api\ProfileController::class, "changePassword"]);
});


// categories api
Route::prefix('categories')->group(function () {
    Route::post('/create', [\App\Http\Controllers\Api\CategoryController::class, "createCategory"]);
    Route::get('/get/data', [\App\Http\Controllers\Api\CategoryController::class, "getData"]);
    Route::post('/edit', [\App\Http\Controllers\Api\CategoryController::class, "editCategory"]);
    Route::post('/delete', [\App\Http\Controllers\Api\CategoryController::class, "deleteCategory"]);
    Route::get('/get/select/data', [\App\Http\Controllers\Api\CategoryController::class, "getSelectData"])->middleware(['throttle:category-nav-search']);
});

// stories api
Route::prefix('stories')->group(function () {
    Route::post('/create', [\App\Http\Controllers\Api\StoryController::class, "createStory"]);
    Route::get('/get/data', [\App\Http\Controllers\Api\StoryController::class, "getStories"]);
    Route::post('/edit/get-data', [\App\Http\Controllers\Api\StoryController::class, "getEditStory"]);
    Route::post('/update', [\App\Http\Controllers\Api\StoryController::class, "updateStory"]);
    Route::post('/delete', [\App\Http\Controllers\Api\StoryController::class, "deleteStory"]);
    Route::post('/make-feature', [\App\Http\Controllers\Api\StoryController::class, "makeStoryFeatured"]);
});

// mail stories api
Route::prefix('mail-stories')->group(function () {
    Route::post('/create', [\App\Http\Controllers\Api\MailStoryController::class, "createAndSendMailStory"]);
    Route::get('/get/data', [\App\Http\Controllers\Api\MailStoryController::class, "getMailStoryData"]);
});

// home page api
Route::prefix('home')->group(function () {
    Route::get('/get/data', [\App\Http\Controllers\Api\HomeController::class, "getData"]);
});

// users related api routes 
Route::prefix('users')->group(function () {
    Route::post('/star-the-story', [\App\Http\Controllers\Api\UserController::class, "starTheStory"]);
    Route::post('/check-star', [\App\Http\Controllers\Api\UserController::class, "checkStar"]);
});
