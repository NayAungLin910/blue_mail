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
            src="{{ $message->embed(public_path() . '/default_images/Blue Mail Transparent.png') }}">
        <div>
            <span
                style="font-size: 1.25rem; line-height: 1.75rem; color: rgb(96 165 250); text-decoration-line: underline; text-decoration-color: #000;"
                class="">Blue</span><span
                style="font-size: 1.25rem; line-height: 1.75rem; text-decoration-line: underline; text-decoration-color: #60a5fa;">Mail
            </span>
        </div>
    </div>
    <p style="font-size: 1.5rem; line-height: 2rem; text-align: center;" class=" text-2xl">
        {{ $name }}
    </p>
    @foreach ($stories as $story)
        <p style="font-size: 1.25rem; line-height: 1.75rem; color:  rgb(56 189 248); text-align: center;">
            {{ $story->name }}
        </p>
        <div style="display: flex; place-content: center; padding: 0.25rem">
            <img style="width: 80%" src="{{ $message->embed(public_path() . '/storage' . $story->image) }}">
        </div>
        <div style="text-align: justify;">
            {!! $story->description !!}
        </div>
        <div style="margin-top: 0.1rem; margin-bottom: 1rem; font-size: 0.875rem; line-height: 1.25rem;">
            Author : {{ $story->admin->name }}, {{ $story->admin->email }}
        </div>
    @endforeach
</body>

</html>
