<!DOCTYPE html>
<html lang="en">

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
    <div style="display: flex; place-content: center; margin-top: 0.5rem; margin-bottom: 0.5rem">
        Your Verification Code
    </div>
    <p style="font-size: 1.5rem; line-height: 2rem; text-align: center;" class=" text-2xl">
        <span style="border-width: 1px; padding: 0.25rem; background-color: rgb(241 245 249);">
            {{ $code }}
        </span>
    </p>
</body>

</html>
