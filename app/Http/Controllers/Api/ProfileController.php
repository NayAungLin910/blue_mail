<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Jobs\NewEmailVerificationSend;
use App\Models\Admin;
use App\Models\NewEmailVerify;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    /*
    Give the currently logined user data
    */
    public function getUserData($type, $id)
    {
        if ($type === 'admin') {
            $currentUser = Admin::where('id', $id)->withCount('stories')->first();
        } else {
            $currentUser = User::where('id', $id)->first();
        }

        return response()->json([
            "data" => $currentUser,
        ]);
    }

    /*
    Change the name of the current user
    */
    public function changeUserName(Request $request)
    {
        $locale = $request->hasHeader('Locale') ? $request->header('Locale') : config('app.locale');


        $request->validate([
            'name' => 'required|max:30|min:5|unique:users,name,' . $request->id,
            'id' => 'required',
            'type' => 'required'
        ], [
            'required' => __('auth.required', [], $locale),
            'max' => __('auth.max_30', [], $locale),
            'min' => __('auth.min_5', [], $locale),
            'unique' => __('auth.unique_name', [], $locale),
        ]);

        if ($request->type === 'admin') {
            $request->validate([
                'name' => 'unique:admins,name,' . $request->id,
            ], [
                'unique' => __('auth.unique_name', [], $locale),
            ]);
        } else {
            $request->validate([
                'name' => 'unique:users,name,' . $request->id,
            ], [
                'unique' => __('auth.unique_name', [], $locale),
            ]);
        }


        $currentUser = null;
        if ($request->type === 'admin') {
            $currentUser = Admin::where('id', $request->id)->withCount('stories')->first();
        } else {
            $currentUser = User::where('id', $request->id)->first();
        }

        if (!$currentUser) {
            return response()->json([
                "errors" => [
                    "errors" => [__('site.something_went_wrong', [], $locale)]
                ]
            ], 422);
        }

        $currentUser->name = $request->name;
        $currentUser->save();

        return response()->json([
            "data" => [
                "message" => __('site.name_change_success', [], $locale)
            ]
        ]);
    }

    /*
    Send email verification code of the new email
    */
    public function sendNewEmailVerifyCode(Request $request)
    {
        $locale = $request->hasHeader('Locale') ? $request->header('Locale') : config('app.locale');

        $request->validate([
            'email' => 'required|email',
            'id' => 'required',
            'type' => 'required'
        ], [
            'required' => __('auth.required', [], $locale),
            'email' => __('auth.email', [], $locale),
        ]);

        if ($request->type === 'admin') {
            $request->validate([
                'email' => 'required|email|unique:admins,email',
            ], [
                'unique' => __('auth.unique_email', [], $locale),
            ]);
        } else {
            $request->validate([
                'email' => 'required|email|unique:users,email',
            ], [
                'unique' => __('auth.unique_email', [], $locale),
            ]);
        }

        if ($request->type === 'admin') {
            $currentUser = Admin::where('id', $request->id)->first();
        } else {
            $currentUser = User::where('id', $request->id)->first();
        }

        if (!$currentUser) {
            return response()->json([
                "errors" => [
                    "errors" => [__('site.something_went_wrong', [], $locale)]
                ]
            ], 422);
        }

        if ($currentUser->newEmailVerify) {
            $currentUser->newEmailVerify()->delete();
        }

        $newVerifyEmail = new NewEmailVerify;
        $newVerifyEmail->new_email = $request->email;
        $code = rand(10000, 99999);
        $newVerifyEmail->code = $code;

        $currentUser->newEmailVerify()->save($newVerifyEmail);

        NewEmailVerificationSend::dispatch($currentUser, $code);

        return response()->json([
            "data" => [
                "message" => __('site.verify_email_sent', [], $locale)
            ]
        ]);
    }

    /*
    Verify the new email with the code
    */
    public function verifyNewEmail(Request $request)
    {
        $locale = $request->hasHeader('Locale') ? $request->header('Locale') : config('app.locale');

        $request->validate([
            'id' => 'required',
            'type' => 'required',
            'code' => 'required|min:5|max:5',
        ], [
            'required' => __('auth.required', [], $locale),
            'code.min' => __('auth.min_5', [], $locale),
            'code.max' => __('auth.max_5', [], $locale),
        ]);

        if ($request->type === 'admin') {
            $currentUser = Admin::where('id', $request->id)->first();
        } else {
            $currentUser = User::where('id', $request->id)->first();
        }

        if (!$currentUser || !$currentUser->newEmailVerify) {
            return response()->json([
                "errors" => [
                    "errors" => [__('site.something_went_wrong', [], $locale)]
                ]
            ], 422);
        }

        if ($request->code !== $currentUser->newEmailVerify->code) {
            return response()->json([
                "errors" => [
                    "code" => [__('site.code_wrong', [], $locale)],
                ]
            ], 422);
        }

        $newEmail = $currentUser->newEmailVerify->new_email;
        $currentUser->email = $newEmail;
        $currentUser->save();

        $currentUser->newEmailVerify->delete();

        return response()->json([
            "data" => [
                "message" => __('site.new_email_confirmed', [], $locale)
            ]
        ]);
    }

    /*
    Change the current user password
    */
    public function changePassword(Request $request)
    {
        $locale = $request->hasHeader('Locale') ? $request->header('Locale') : config('app.locale');

        $request->validate([
            'id' => 'required',
            'type' => 'required',
            'old_password' =>  'required',
            'password' =>  [
                'required',
                'string',
                'min:8',              // must be at least 8 characters in length
                'regex:/[a-z]/',      // must contain at least one lowercase letter
                'regex:/[A-Z]/',      // must contain at least one uppercase letter
                'regex:/[0-9]/',      // must contain at least one digit
                'regex:/[@$!%*#?&]/', // must contain a special character
                'confirmed',
            ],
            'password_confirmation' => 'required',
        ], [
            'required' => __('auth.required', [], $locale),
            'min' => __('auth.min_8', [], $locale),
            'regex' => __('auth.password_regex', [], $locale),
            'confirmed' => __('auth.password_confirmed', [], $locale),
            'password_confirmation' => __('auth.required', [], $locale),
        ]);

        if ($request->type === 'admin') {
            $currentUser = Admin::where('id', $request->id)->first();
        } else {
            $currentUser = User::where('id', $request->id)->first();
        }

        if (!$currentUser) {
            return response()->json([
                "errors" => [
                    "errors" => [__('site.something_went_wrong', [], $locale)]
                ]
            ], 422);
        }

        if(!Hash::check($request->old_password, $currentUser->password)) {
            return response()->json([
                "errors" => [
                    "old_password" => [__('auth.incorrect_password', [], $locale)]
                ]
            ], 422);
        }

        $currentUser->password = Hash::make($request->password);
        $currentUser->save();

        return response()->json([
            "data" => [
                "message" => __('site.password_change_success', [], $locale)
            ]
        ]);
    }
}
