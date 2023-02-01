@extends('layout.master')
@section('title', 'Admin Account Login - Blue Mail')
@section('description', 'The admin account login page of Blue Mail.')
@section('keywords', 'Admin Account Login Blue Mail')
@section('content')
    <div class="grid grid-cols-1 p-3">
        <div
            class="rounded-3xl lg:w-[600px] w-full p-3 mt-3 mx-auto bg-slate-100 text-black dark:text-white dark:bg-slate-800 shadow-md">
            <h1 class="px-2 text-2xl text-center">{{ __('site.admin_login_form') }}</h1>
            <div class="px-2 py-4">
                <form action="{{ url('/admin/login') }}" method="POST">
                    @csrf
        
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

                    <div class="flex items-center gap-3 mt-4 mb-2">
                        <label for="remember-checkbox" class="inline-block">
                            {{ __('site.remember_me') }}
                        </label>
                        <input type="checkbox" class="w-5 h-5" name="remember" id="remember-checkbox">
                    </div>
                    <button class="sky-button-rounded my-2" type="submit">
                        <div class="flex items-center">
                            <ion-icon class="pr-2 text-xl" name="checkmark-outline"></ion-icon>
                            {{ __('site.login') }}
                        </div>
                    </button>
                </form>
            </div>
        </div>
    </div>
@endsection
