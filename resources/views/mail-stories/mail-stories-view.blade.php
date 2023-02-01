@extends('layout.master')
@section('title', 'Mail Stories View - Blue Mail')
@section('description', 'The mail stories view page of the Blue Mail.')
@section('keywords', 'Mail Stories View Blue Mail')
@section('content')
    <div id="root"></div>
    @vite('resources/js/mailStoriesView.jsx')
@endsection
@section('script')
    <script>
        window.locale_mail_stories = "{{ __('site.mail_stories') }}"
        window.locale_filter = "{{ __('site.filter') }}"
        window.locale_name = "{{ __('site.name') }}"
        window.locale_mm_name = "{{ __('site.mm_name') }}"
        window.locale_stories_count = "{{ __('site.stories_count') }}"
        window.locale_created_at = "{{ __('site.created_at') }}"
        window.locale_clear_filter = "{{ __('site.clear_filter') }}"
        window.locale_sort_by = "{{ __('site.sort_by') }}"
        window.locale_start_date = "{{ __('site.start_date') }}"
        window.locale_end_date = "{{ __('site.end_date') }}"
        window.locale_latest = "{{ __('site.latest') }}"
        window.locale_oldest = "{{ __('site.oldest') }}"
        window.locale_no_records = "{{ __('site.no_records') }}"
    </script>
@endsection
