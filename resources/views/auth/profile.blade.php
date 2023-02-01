@extends('layout.master')
@section('title', Auth::user()->name . "'s profile page - Blue Mail")
@section('description', 'The profile page of the user - ' . Auth::user()->name . ' - Blue Mail')
@section('keywords', Auth::user()->name .' Profile - Blue Mail')
@section('content')
    <div id="root-profile"></div>
    @vite('resources/js/profile.jsx')
@endsection
@section('script')
    <script>
        window.locale_name = "{{ __('site.name') }}"
        window.locale_email = "{{ __('site.email') }}"
        window.locale_change_password = "{{ __('site.change_password') }}"
        window.locale_stories_count = "{{ __('site.stories_count') }}"
        window.locale_new_email_verify_code = "{{ __('site.new_email_verify_code') }}"
        window.locale_new_password = "{{ __('site.new_password') }}"
        window.locale_old_password = "{{ __('site.old_password') }}"
        window.locale_confirm_password = "{{ __('site.password_confirm') }}"
        window.locale_close_change_password = "{{ __('site.close_change_password') }}"
        window.locale_save = "{{ __('site.save') }}"
    </script>
@endsection
