@extends('layout.master')
@section('title', 'Home Page - Blue Mail')
@section('description', 'The Blue Mail Homepage.')
@section('keywords', 'Home Page Blue Mail')
@section('content')
    <div id="root"></div>
    @vite('resources/js/welcome.jsx')
@endsection
@section('script')
    <script>
        window.locale_latest_news = "{{ __('site.latest_news') }}"
        window.locale_business_news = "{{ __('site.business_news') }}"
        window.locale_sports_news = "{{ __('site.sports_news') }}"
        window.locale_no_story = "{{ __('site.no_story') }}"
    </script>
@endsection