@extends('layout.master')
@section('title', 'Subscriber Account Register - Blue Mail')
@section('description', 'The subscriber account registration page of Blue Mail.')
@section('keywords', 'Subscriber Account Register Blue Mail')
@section('content')
    <div class="grid grid-cols-1 p-3">
        <p class="my-3 text-lg lg:w-[600px] w-full text-justify mx-auto">
            {{ __('site.register_intro') }}
        </p>
        <div
            class="rounded-3xl lg:w-[600px] w-full p-3 mt-3 mx-auto bg-slate-100 text-black dark:text-white dark:bg-slate-800 shadow-md">
            <h1 class="px-2 text-2xl text-center">{{ __('site.subscribe_register_form') }}</h1>
            <div class="px-2 py-4">
                <form action="{{ url('/subscriber/register') }}" method="POST">
                    @csrf
                    <p>{{ __('site.name') }}</p>
                    <input name="name" type="text" class="input-content">
                    @error('name')
                        <p class="my-1 text-red-500">{{ $errors->first('name') }}</p>
                    @enderror
                    <p>{{ __('site.email') }}</p>
                    <input name="email" type="email" class="input-content">
                    @error('email')
                        <p class="my-1 text-red-500">{{ $errors->first('email') }}</p>
                    @enderror
                    <p>{{ __('site.password') }}</p>
                    <input name="password" type="password" class="input-content">
                    @error('password')
                        <p class="my-1 text-red-500">{{ $errors->first('password') }}</p>
                    @enderror
                    <p>{{ __('site.password_confirm') }}</p>
                    <input name="password_confirmation" type="password" class="input-content">
                    @error('password_confirmation')
                        <p class="my-1 text-red-500">{{ $errors->first('password_confirmation') }}</p>
                    @enderror
                    <p>{{ __('site.prefered_language') }}</p>
                    <p class="my-2 text-sm bg-slate-50 dark:bg-slate-600 dark:text-white p-3 rounded-md">
                       {{ __('site.picked_language_des') }}
                    </p>
                    <select name="language"
                        class="text-black px-1 w-auto focus:outline-none block mt-2 border border-sky-400 shadow-md">
                        <option value="en">{{ __('site.english') }}</option>
                        <option value="mm">{{ __('site.myanmar') }}</option>
                    </select>
                    <div class="flex items-center gap-3 mt-4 mb-2">
                        <label for="remember-checkbox" class="inline-block">
                            {{ __('site.remember_me') }}
                        </label>
                        <input type="checkbox" class="w-5 h-5" name="remember" id="remember-checkbox">
                    </div>
                    <button class="sky-button-rounded my-2" type="submit">
                        <div class="flex items-center">
                            <ion-icon class="pr-2 text-xl" name="pencil-outline"></ion-icon>
                            {{ __('site.register') }}
                        </div>
                    </button>
                </form>
            </div>
        </div>
    </div>
@endsection
