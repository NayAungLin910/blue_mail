<html>

<head>
    <!-- google fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap" rel="stylesheet">
</head>

<body style="font-family: sans-serif;">
    <div style="display: flex; align-items: center; place-content: center; gap: 0.25rem;">
        <img style="width: 2.5rem; height: 2.5rem; display: inline;"
            src="{{ url('/default_images/Blue Mail Transparent.png') }}">
        <div>
            <span
                style="font-size: 1.25rem; line-height: 1.75rem; color: rgb(96 165 250); text-decoration-line: underline; text-decoration-color: #000;"
                class="">Blue</span><span
                style="font-size: 1.25rem; line-height: 1.75rem; text-decoration-line: underline; text-decoration-color: #60a5fa;">Mail
            </span>
        </div>
    </div>
    <p style="font-size: 1.5rem; line-height: 2rem; text-align: center;" class=" text-2xl">
        {{ App::isLocale('en') ? $mailStory->name : $mailStory->mm_name }}
    </p>
    @foreach ($mailStory->stories as $story)
        <p style="font-size: 1.25rem; line-height: 1.75rem; color:  rgb(56 189 248); text-align: center;">
            {{ App::isLocale('en') ? $story->name : $story->mm_name }}
        </p>
        <div style="display: flex; place-content: center; padding: 0.25rem">
            <img style="width: 80%" src="{{ $story->image ? "/storage$story->image" : '/default_images/404.jpg' }}">
        </div>
        <div style="text-align: justify;">
            @if (App::isLocale('en'))
                {!! $story->description !!}
            @else
                {!! $story->mm_description !!}
            @endif
        </div>
        <div class="mt-2 mb-4 text-sm">
            <p>{{ __('site.author') }} : {{ $story->admin->name }}, {{ $story->admin->email }}</p>
        </div>
    @endforeach
</body>

</html>
