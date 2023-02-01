<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Jobs\SendVerificationMail;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class UserAuthController extends Controller
{
    public function register()
    {
        return view('auth.user.register');
    }

    public function postRegister(Request $request)
    {
        $request->validate([
            'name' => 'required|max:30|min:5',
            'email' => 'required|email|unique:users,email',
            'password' =>  [
                'required',
                'string',
                'min:8',             // must be at least 8 characters in length
                'regex:/[a-z]/',      // must contain at least one lowercase letter
                'regex:/[A-Z]/',      // must contain at least one uppercase letter
                'regex:/[0-9]/',      // must contain at least one digit
                'regex:/[@$!%*#?&]/', // must contain a special character
                'confirmed',
            ],
            'password_confirmation' => 'required',
        ], [
            'name.required' => __('auth.required'),
            'name.max' => __('auth.max_30'),
            'name.min' => __('auth.min_5'),
            'email.required' => __('auth.required'),
            'email.email' => __('auth.email'),
            'email.unique' => __('auth.unique_email'),
            'password.required' => __('auth.required'),
            'password.min' => __('auth.min_8'),
            'password.regex' => __('auth.password_regex'),
            'password.confirmed' => __('auth.password_confirmed'),
            'password_confirmation' => __('auth.required'),
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'language' => $request->language,
        ]);

        $remember = $request->remember ? true : false;

        Auth::login($user, $remember);

        event(new Registered($user));

        return redirect('/email/verify')->with('success', __('notification.email_verification'));
    }

    public function login()
    {
        return view('auth.user.login');
    }

    public function postLogin(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'password' =>  [
                'required',
                'string',
                'min:8',              // must be at least 8 characters in length
                'regex:/[a-z]/',      // must contain at least one lowercase letter
                'regex:/[A-Z]/',      // must contain at least one uppercase letter
                'regex:/[0-9]/',      // must contain at least one digit
                'regex:/[@$!%*#?&]/', // must contain a special character
            ],
        ], [
            'email.required' => __('auth.required'),
            'email.email' => __('auth.email'),
            'email.exists' => __('auth.exits'),
            'password.required' => __('auth.required'),
            'password.min' => __('auth.min_8'),
            'password.regex' => __('auth.password_regex'),
        ]);

        $remember = $request->remember ? true : false;
        $cre = ['email' => $request->email, 'password' => $request->password];

        if (!Auth::attempt($cre, $remember)) {
            return redirect()->back()->withErrors(['password' => __('auth.fail_attempt')]);
        }

        Auth::attempt($cre, $remember);

        return redirect('/')->with('success', __('auth.success_attempt'));
    }
}
