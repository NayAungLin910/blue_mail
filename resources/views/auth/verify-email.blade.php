@extends('layout.master')
@section('title', 'Verify Email - Blue Mail')
@section('description', 'Please make sure to verify your email address at your inbox by clicking the button in the mail
    sent by Blue Mail.')
@section('keywords', 'Verify Email Blue Mail')
@section('content')
    <div class="grid grid-cols-1 p-2">
        <div
            class="rounded-3xl lg:w-[600px] w-full p-6 mt-3 mx-auto bg-slate-100 text-black dark:text-white dark:bg-slate-800 shadow-md">
            <p class="py-2">
                {{ __('site.email_verification_notice') }}
            </p>
            <p class="py-2 mb-5">
                {{ __('site.email_verification_resend') }}
            </p>
            <form action="{{ url('/email/verification-notification') }}" class="text-center" method="POST">
                @csrf
                <button type="submit" class="sky-button-rounded">
                    {{ __('site.resend_email') }}
                </button>
            </form>
        </div>
    </div>
@endsection
