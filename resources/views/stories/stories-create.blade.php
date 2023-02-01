@extends('layout.master')
@section('title', 'Stories Create - Blue Mail')
@section('description', 'The story creation page of the Blue Mail.')
@section('keywords', 'Stories Create Blue Mail')
@section('content')
    <div id="root"></div>
    @vite('resources/js/storiesCreate.jsx')
@endsection
@section('script')
    <script>
        window.story_create = "{{ __('site.story_create') }}"
        window.name = "{{ __('site.name') }}"
        window.mm_name = "{{ __('site.mm_name') }}"
        window.categories = "{{ __('site.categories') }}"
        window.description = "{{ __('site.description') }}"
        window.mm_description = "{{ __('site.mm_description') }}"
        window.create = "{{ __('site.create') }}"
        window.image = "{{ __('site.image') }}"
    </script>
@endsection
