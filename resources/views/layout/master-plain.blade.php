<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>@yield('title', 'Blue Mail')</title>
    <meta name="description" content="@yield('description', 'Blue Mail, Delivering News Right Through Your Inbox!')">
    <meta name="keywords" content="@yield('keywords'), 'Blue Mail News Website'">
    <meta name="author" content="@yield('author', 'Mg Nay Aung Lin')">
    <link rel="icon" href="{{ url('/default_images/Blue Mail Transparent.png') }}">

    <!-- TailwindCSS and Vite React -->
    @viteReactRefresh
    @vite('resources/js/app.js')

    <!-- external css -->
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap" rel="stylesheet">

    <!-- custom css -->
    @yield('css')
</head>

<body class="dark:bg-slate-700 dark:text-white">

    <!-- nav bar -->
    <nav
        class="px-5 py-3 dark:bg-slate-700 dark:text-white bg-white shadow dark: lg:flex lg:items-center lg:justify-between lg:w-100">
        <div class="flex justify-evenly">
            <span class="text-2xl">
                <img src="{{ url('/default_images/Blue Mail Transparent.png') }}" class="w-10 h-10 inline mb-1"
                    alt="Blue Mail Navbar Logo">
                <span class="text-blue-400 underline decoration-black dark:decoration-white">Blue</span><span
                    class="underline decoration-blue-400">Mail</span>
            </span>
        </div>
        <ul id="nav-options"
            class="lg:flex lg:items-center text-center gap-3 lg:z-auto lg:static absolute dark:bg-slate-700 dark:text-white bg-sky-500 lg:bg-white text-white lg:text-black lg:py-0 py-3 pl-3 lg:pl-0 lg:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-300 w-full lg:w-auto left-0">
            <li class="mx-2 my-3 lg:my-0">
                <a href="{{ url('/') }}"
                    class="text-lg {{ request()->is('home') ? 'text-cyan-400' : '' }} hover:text-cyan-500 duration-200">
                    <div class="flex items-center">
                        <ion-icon class="mr-1" name="home-outline"></ion-icon>
                        <span>
                            {{ __('site.home') }}
                        </span>
                    </div>
                </a>
            </li>

            @if (!Auth::guard('admin')->check() && !Auth::check())
                <li class="mx-2 my-3 lg:my-0">
                    <a href="{{ url('/subscriber/login') }}"
                        class="text-lg  hover:text-cyan-500 {{ request()->is('subscriber/login') ? 'text-cyan-400' : '' }} duration-200">
                        <div class="flex items-center">
                            <ion-icon class="mr-1" name="checkmark-outline"></ion-icon>
                            <span>
                                {{ __('site.login') }}
                            </span>
                        </div>
                    </a>
                </li>
                <li class="mx-2 my-3 lg:my-0">
                    <a href="{{ url('/subscriber/register') }}"
                        class="text-lg hover:text-cyan-500 {{ request()->is('subscriber/register') ? 'text-cyan-400' : '' }} duration-200">
                        <div class="flex items-center">
                            <ion-icon class="mr-1" name="pencil-outline"></ion-icon>
                            <span>
                                {{ __('site.register') }}
                            </span>
                        </div>
                    </a>
                </li>
            @endif

            <li class="mx-2 my-3 lg:my-0">
                <button type="button" onclick="dropdownToggle('theme')" id="dropdown-theme" class="sky-button">
                    <div class="flex justify-between content-center">
                        <span class="pl-1 pr-3" id="dropdown-current-theme">Theme</span>
                        <span class="rotate-180 duration-300" id="dropdown-arrow-theme">
                            <ion-icon name="chevron-up-outline"></ion-icon>
                        </span>
                    </div>
                </button>
                <div id="dropdown-content-theme"
                    class="hidden whitespace-nowrap lg:absolute bg-white text-black mt-1 lg:mt-0 shadow z-10 px-1 py-2 lg:w-[110px] rounded-md">
                    <ul class="">
                        <li class="py-1 px-2 hover:bg-gray-100 lg:hover:bg-gray-200 hover:text-cyan-400 lg:hover:text-black rounded-md"
                            id="theme_light" onclick="dropdownChooseTheme('theme', this)">
                            <a href="#" class="pr-3">{{ __('site.theme_light') }}</a>
                            <ion-icon name="sunny-outline"></ion-icon>
                        </li>
                        <li id="theme_dark"
                            class="py-1 px-2 hover:bg-gray-100 lg:hover:bg-gray-200 hover:text-cyan-400 lg:hover:text-black rounded-md"
                            onclick="dropdownChooseTheme('theme', this)">
                            <a href="#" class="pr-3">{{ __('site.theme_dark') }}</a>
                            <ion-icon name="moon-outline"></ion-icon>
                        </li>
                        <li id="theme_system"
                            class="py-1 px-2 hover:bg-gray-100 lg:hover:bg-gray-200 hover:text-cyan-400 lg:hover:text-black rounded-md"
                            onclick="dropdownChooseTheme('theme', this)">
                            <a href="#" class="pr-3">{{ __('site.theme_system') }}</a>
                            <ion-icon name="settings-outline"></ion-icon>
                        </li>
                    </ul>
                </div>
            </li>
            <li class="mx-2 my-3 lg:my-0">
                <button type="button" onclick="dropdownToggle('lang')" id="dropdown-lang" class="sky-button">
                    <div class="flex justify-between content-center">
                        <span class="pl-1 pr-3" id="dropdown-current-lang">{{ app()->getLocale() }}</span>
                        <span class="rotate-180 duration-300" id="dropdown-arrow-lang">
                            <ion-icon name="chevron-up-outline"></ion-icon>
                        </span>
                    </div>
                </button>
                <div id="dropdown-content-lang"
                    class="hidden lg:absolute bg-white text-black mt-1 lg:mt-0 shadow z-10 px-1 py-2 lg:w-[95px] rounded-md">
                    <ul class="">
                        <li
                            class="py-1 px-2 hover:bg-gray-100 lg:hover:bg-gray-200 hover:text-cyan-400 lg:hover:text-black rounded-md">
                            <a href="{{ url('/locale/mm') }}">mm</a>
                        </li>
                        <li
                            class="py-1 px-2 hover:bg-gray-100 lg:hover:bg-gray-200 hover:text-cyan-400 lg:hover:text-black rounded-md">
                            <a href="{{ url('/locale/en') }}">en</a>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
    </nav>

    <!-- main -->
    <main>
        <div>
            @yield('content')
        </div>
    </main>

    <!-- external scripts -->
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
    <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>

    <!-- custom scripts -->
    <!-- Session flashing -->
    @if (session()->has('error'))
        <script>
            Toastify({
                text: "{{ session('error') }}",
                duration: 3000,
                destination: "", // can put link 
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dimdissing of toast on hover
                // className: ['bg-danger'],
                style: {
                    background: "linear-gradient(to right, #D23333, #BE3737)",
                },
                onClick: function() {} // Callback after click
            }).showToast();
        </script>
    @endif
    @if (session()->has('info'))
        <script>
            Toastify({
                text: "{{ session('info') }}",
                duration: 3000,
                destination: "", // can put link 
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dimdissing of toast on hover
                style: {
                    background: "linear-gradient(to right, #31C3B4, #2DAFA2)",
                },
                onClick: function() {} // Callback after click
            }).showToast();
        </script>
    @endif
    @if (session()->has('success'))
        <script>
            Toastify({
                text: "{{ session('success') }}",
                duration: 3000,
                destination: "", // can put link 
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dimdissing of toast on hover
                style: {
                    background: "linear-gradient(to right, #76CA86, #35CD52)",
                },
                onClick: function() {} // Callback after click
            }).showToast();
        </script>
    @endif

    <script>
        // theme configuration
        const userTheme = localStorage.getItem("theme");
        const systemThemeDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const systemThemeLight = window.matchMedia('(prefers-color-scheme: light)').matches;
        const themeCheck = () => {
            if (!userTheme) {
                if (systemThemeDark) {
                    if (!document.documentElement.classList.contains("dark")) {
                        document.documentElement.classList.add("dark");
                    }
                    const d_nav_current = document.querySelector(`#dropdown-current-theme`);
                    d_nav_current.innerHTML =
                        `<span class="pr-3">{{ __('site.theme_system') }}</span><ion-icon name="settings-outline"></ion-icon>`
                }
                if (systemThemeLight) {
                    if (document.documentElement.classList.contains("dark")) {
                        document.documentElement.classList.remove("dark");
                    }
                    const d_nav_current = document.querySelector(`#dropdown-current-theme`);
                    d_nav_current.innerHTML =
                        `<span class="pr-3">{{ __('site.theme_system') }}</span><ion-icon name="settings-outline"></ion-icon>`
                }
            }
            if (userTheme === "dark") {
                if (!document.documentElement.classList.contains("dark")) {
                    document.documentElement.classList.add("dark");
                }
                const d_nav_current = document.querySelector(`#dropdown-current-theme`);
                d_nav_current.innerHTML =
                    `<span class="pr-3">{{ __('site.theme_dark') }}</span><ion-icon name="moon-outline"></ion-icon>`
            }
            if (userTheme === "light") {
                const d_nav_current = document.querySelector(`#dropdown-current-theme`);
                d_nav_current.innerHTML =
                    `<span class="pr-3">{{ __('site.theme_light') }}</span><ion-icon name="sunny-outline"></ion-icon>`
            }

        }

        themeCheck();

        // dropdown option choose
        function dropdownChooseTheme(id, e) {
            const d_current = document.querySelector(`#dropdown-current-${id}`);
            const option_text = e.children[0].text;
            const option_icon_name = e.children[1].name;

            if (e.id === 'theme_light') {
                if (document.documentElement.classList.contains("dark")) {
                    document.documentElement.classList.remove("dark");
                }

                localStorage.setItem("theme", "light");

                d_current.innerHTML =
                    `<span class="pr-3">{{ __('site.theme_light') }}</span><ion-icon name="${option_icon_name}"></ion-icon>`;
            }

            if (e.id === 'theme_dark') {

                if (!document.documentElement.classList.contains("dark")) {
                    document.documentElement.classList.add("dark");
                }

                localStorage.setItem("theme", "dark");

                d_current.innerHTML =
                    `<span class="pr-3">{{ __('site.theme_dark') }}</span><ion-icon name="${option_icon_name}"></ion-icon>`;
            }

            if (e.id === 'theme_system') {
                if (systemThemeDark) {
                    if (!document.documentElement.classList.contains("dark")) {
                        document.documentElement.classList.add("dark");
                    }
                }
                if (systemThemeLight) {
                    if (document.documentElement.classList.contains("dark")) {
                        document.documentElement.classList.remove("dark");
                    }
                }

                localStorage.removeItem("theme");
                d_current.innerHTML =
                    `<span class="pr-3">{{ __('site.theme_system') }}</span><ion-icon name="${option_icon_name}"></ion-icon>`;
            }
        }

        // dropdown show/hide toggle
        function dropdownToggle(id) {
            const d_content = document.querySelector(`#dropdown-content-${id}`);
            const d_arrow = document.querySelector(`#dropdown-arrow-${id}`);


            d_arrow.classList.toggle('rotate-0');
            d_content.classList.toggle('hidden');
        }
    </script>

    @yield('script')
</body>

</html>
