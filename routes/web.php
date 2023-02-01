<?php

use App\Http\Controllers\HomePageController;
use App\Jobs\SendVerificationMail;
use App\Models\Story;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// views for both not logined and logined users
Route::view('/', 'welcome')->name('home'); // homepage

// locale changing route
Route::get('/locale/{locale}', [\App\Http\Controllers\LocaleController::class, "changeLocale"]);

// sotries routes
Route::prefix('stories')->group(function () {
    // view story
    Route::get('/view/{slug}', [\App\Http\Controllers\StoryController::class, "viewStory"]);
    Route::get('/search', [\App\Http\Controllers\StoryController::class, "viewStories"]);
});

// guest routes
Route::middleware(['guest:web,admin'])->group(function () {
    // user register routes
    Route::get('/subscriber/register', [\App\Http\Controllers\Auth\UserAuthController::class, "register"]);
    Route::post('/subscriber/register', [\App\Http\Controllers\Auth\UserAuthController::class, "postRegister"]);

    // admin register routes
    Route::get('/admin/register', [\App\Http\Controllers\Auth\AdminAuthController::class, "register"]);
    Route::post('/admin/register', [\App\Http\Controllers\Auth\AdminAuthController::class, "postRegister"]);

    // user login routes
    Route::get('/subscriber/login', [\App\Http\Controllers\Auth\UserAuthController::class, "login"])->name('login');;
    Route::post('/subscriber/login', [\App\Http\Controllers\Auth\UserAuthController::class, "postLogin"]);

    // admin login routes
    Route::get('/admin/login', [\App\Http\Controllers\Auth\AdminAuthController::class, "login"]);
    Route::post('/admin/login', [\App\Http\Controllers\Auth\AdminAuthController::class, "postLogin"]);
});

// admin routes
Route::middleware(['auth:admin', 'verified'])->prefix('admin')->group(function () {
    // category
    Route::get('/categories', [\App\Http\Controllers\Admin\CategoryController::class, "getCategory"]);
    
    // story
    Route::get('/stories/view', [\App\Http\Controllers\Admin\StoryController::class, "getStory"]);
    Route::get('/stories/create', [\App\Http\Controllers\Admin\StoryController::class, "createStory"]);
    Route::get('/stories/edit/{slug}', [\App\Http\Controllers\Admin\StoryController::class, "editStory"]);

    // mail story
    Route::get('/mail-stories/create', [\App\Http\Controllers\Admin\MailStoryController::class, "createMailStory"]);
    Route::get('/mail-stories', [\App\Http\Controllers\Admin\MailStoryController::class, "viewMailStories"]);
    Route::get('/mail-stories/{slug}', [\App\Http\Controllers\Admin\MailStoryController::class, "viewSpecificMailStory"]);
});

// routes for logined both admin user
Route::middleware(['auth:web,admin'])->group(function () {
    Route::view('/profile', 'auth.profile'); // profile
    Route::post('/logout', [\App\Http\Controllers\Auth\AuthController::class, "logout"]); // logout
});

// email verification for both admins and users

Route::get('/email/verify', function () {
    return view('auth.verify-email');
})->middleware('auth:web,admin')->name('verification.notice');

Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();

    return redirect('/');
})->middleware(['auth:web,admin', 'signed'])->name('verification.verify');

Route::post('/email/verification-notification', function (\Illuminate\Http\Request $request) {
    $request->user()->sendEmailVerificationNotification();

    return back()->with('success', __('notification.email_verification_resend'));
})->middleware(['auth:web,admin', 'throttle:6,1'])->name('verification.send');
