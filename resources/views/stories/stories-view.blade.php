@extends('layout.master')
@section('title', "$story->name - Blue Mail")
@section('description', "$story->name - Blue Mail")
@section('keywords', "$story->name - Blue Mail")
@section('content')
    <div class="mt-4 px-2 text-justify">
        <div class="flex place-content-center mb-1">
            <img class="rounded-xl w-full h-full lg:w-1/2"
                src="{{ $story->image ? "/storage$story->image" : '/default_images/404.jpg' }}" alt="{{ $story->name }}">
        </div>
        <div class="flex items-center place-content-center gap-1">
            <h1 class="text-xl text-center">
                {{ App::isLocale('en') ? $story->name : $story->mm_name }}
            </h1>
            @if (Auth::check() || Auth::guard('admin')->check())
                <div id="root"></div>
                @vite('resources/js/storiesFavourite.jsx')
            @endif
        </div>
        <div class="my-4">
            @if (App::isLocale('en'))
                {!! $story->description !!}
            @else
                {!! $story->mm_description !!}
            @endif
        </div>
        <div class="my-4">
            <div class="flex flex-wrap items-center gap-2">
                <span>
                    {{ __('site.categories') }} :
                </span>
                @foreach ($story->categories as $category)
                    <a href="{{ url('/stories/search?category=' . $category->slug) }}" class="sky-button text-sm py-1 px-1">
                        {{ App::isLocale('en') ? $category->name : $category->mm_name }}
                    </a>
                @endforeach
            </div>
        </div>
        <div class="mt-2 mb-4 text-sm">
            <p>{{ __('site.author') }} : {{ $story->admin->name }}, {{ $story->admin->email }}</p>
        </div>
    </div>
@endsection
@section('script')
    <script>
        window.story_slug = "{{ $story->slug }}"
        window.locale_take_star = "{{ __('site.take_star') }}"
        window.locale_give_star = "{{ __('site.give_star') }}"
    </script>
@endsection
