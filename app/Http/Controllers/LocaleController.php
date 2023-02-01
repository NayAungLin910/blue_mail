<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Whoops\Run;

class LocaleController extends Controller
{
    public function changeLocale($locale)
    {
        if (!array_key_exists($locale, config('app.locales'))) {
            // if the language is not supported, return an alert message
            return redirect('/')->with('error', __('site.unavailable_language'));
        }

        session()->put('locale', $locale); // mm or en
        app()->setlocale($locale); // set the locale

        // return the success process alert
        return redirect()->back()->with('success', __('notification.language_change'));
    }
}
