@extends('layout.master')
@section('title', "Edit the article '$story->name' - Blue Mail")
@section('description', "Edit the article '$story->name' - Blue Mail")
@section('keywords', "Edit $story->name - Blue Mail")
@section('content')
    <div id="root"></div>
    @vite('resources/js/storiesEdit.jsx')
@endsection
@section('script')
    <script>
        window.story_slug = "{{ $story->slug }}"
        window.locale_name = "{{ __('site.name') }}"
        window.locale_mm_name = "{{ __('site.mm_name') }}"
        window.locale_categories = "{{ __('site.categories') }}"
        window.locale_new = "{{ __('site.new') }}"
        window.locale_image = "{{ __('site.image') }}"
        window.locale_description = "{{ __('site.description') }}"
        window.locale_mm_description = "{{ __('site.mm_description') }}"
        window.locale_save = "{{ __('site.save') }}"
    </script>
@endsection
