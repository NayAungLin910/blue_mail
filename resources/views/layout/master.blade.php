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

<body class="dark:bg-slate-700 dark:text-white bg-slate-50 duration-500">
    <!-- navbar -->
    <nav
        class="px-5 py-3 dark:bg-slate-700 dark:text-white bg-slate-50 shadow dark: lg:flex lg:items-center lg:justify-between lg:w-100">
        <div class="flex align-middle justify-between">
            <div class="flex justify-evenly">
                @if (Auth::guard('admin')->check() && !request()->is('email/verify*'))
                    <span class="cursor-pointer lg:hidden text-3xl mt-1 mr-4" onclick="openSidebar(this)">
                        <ion-icon name="menu" id="sidebar-toggle-icon" class="px-2"></ion-icon>
                    </span>
                @endif
                <a href="{{ url('/') }}" class="text-2xl cursor-pointer">
                    <img src="{{ url('/default_images/Blue Mail Transparent.png') }}" class="w-10 h-10 inline mb-1"
                        alt="Blue Mail Navbar Logo">
                    <span class="text-blue-400 underline decoration-black dark:decoration-white">Blue</span><span
                        class="underline decoration-blue-400">Mail</span>
                </a>
            </div>

            <div class="mt-1 mb-0 lg:hidden block">
                <span class="text-3xl cursor-pointer">
                    <ion-icon name="menu" onclick="menuToggle(this)"></ion-icon>
                </span>
            </div>
        </div>
        <ul id="nav-options"
            class="lg:flex lg:items-center text-center gap-3 lg:z-auto z-50 lg:static absolute dark:bg-slate-700 dark:text-white bg-slate-600 lg:bg-slate-50 text-white lg:text-black lg:py-0 py-3 pl-3 lg:pl-0 lg:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-300 w-full lg:w-auto left-0">

            @if (!request()->is('email/verify*'))
                <li class="mx-2 my-3 lg:my-0">
                    <a href="{{ url('/') }}"
                        class="text-lg {{ request()->is('/') ? 'text-cyan-400' : '' }} hover:text-cyan-500 duration-200">
                        <div class="flex items-center place-content-center">
                            <ion-icon class="mr-1" name="home-outline"></ion-icon>
                            <span>
                                {{ __('site.home') }}
                            </span>
                        </div>
                    </a>
                </li>
                <li class="mx-2 my-3 lg:my-0 group/categories">
                    <span class="text-lg hover:text-cyan-500 duration-200">
                        <div class="flex items-center place-content-center">
                            <ion-icon class="mr-1" name="pricetag-outline"></ion-icon>
                            <span>
                                {{ __('site.categories') }}
                            </span>
                        </div>
                    </span>
                    <div
                        class="hidden group-hover/categories:block lg:absolute whitespace-nowrap  bg-white text-black mt-1 lg:mt-0 shadow z-10 px-1 py-2 lg:w-auto rounded-md">
                        <ul class="">
                            <li class="py-1 px-2 rounded-md">
                                <div class="flex items-center place-content-center">
                                    <div id="category-nav-root"></div>
                                    @vite('resources/js/navCategorySearch.jsx')
                                </div>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="mx-2 my-3 lg:my-0 group/stories">
                    <span class="text-lg hover:text-cyan-500 duration-200">
                        <div class="flex items-center place-content-center">
                            <ion-icon class="mr-1" name="search-outline"></ion-icon>
                            <span>
                                {{ __('site.search') }}
                            </span>
                        </div>
                    </span>
                    <div
                        class="hidden group-hover/stories:block lg:absolute whitespace-nowrap bg-white text-black mt-1 lg:mt-0 shadow z-10 px-1 py-2 lg:w-auto rounded-md">
                        <ul>
                            <li class="py-1 px-2 rounded-md">
                                <div class="flex items-center place-content-center">
                                    <div>
                                        <form action="{{ url('/stories/search') }}" method="GET">
                                            <div class="flex items-center gap-1">
                                                <input type="text" name="search" class="input-content">
                                                <button type="submit">
                                                    <span class="text-sky-400 text-lg">
                                                        <ion-icon name="search-outline"></ion-icon>
                                                    </span>
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </li>
            @endif

            @if (!Auth::guard('admin')->check() && !Auth::check())
                <li class="mx-2 my-3 lg:my-0">
                    <a href="{{ url('/subscriber/login') }}"
                        class="text-lg  hover:text-cyan-500 {{ request()->is('subscriber/login') ? 'text-cyan-400' : '' }} duration-200">
                        <div class="flex items-center place-content-center">
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
                        <div class="flex items-center place-content-center">
                            <ion-icon class="mr-1" name="pencil-outline"></ion-icon>
                            <span>
                                {{ __('site.register') }}
                            </span>
                        </div>
                    </a>
                </li>
            @endif

            @if (
                (Auth::guard('admin')->check() && !request()->is('email/verify*')) ||
                    (Auth::check() && !request()->is('email/verify*')))
                <li class="mx-2 my-3 lg:my-0">
                    <button type="button" onclick="dropdownToggle('profile')" id="dropdown-profile" class="sky-button">
                        <div class="flex justify-between content-center">
                            <span class="pl-1 pr-3"
                                id="dropdown-current-profile">{{ Auth::guard('admin')->check()? auth()->guard('admin')->user()->name: auth()->user()->name }}</span>
                            <span class="rotate-180 duration-300" id="dropdown-arrow-profile">
                                <ion-icon name="chevron-up-outline"></ion-icon>
                            </span>
                        </div>
                    </button>
                    <div id="dropdown-content-profile"
                        class="hidden whitespace-nowrap lg:absolute bg-white text-black mt-1 lg:mt-0 shadow z-10 px-1 py-2 lg:w-auto rounded-md">
                        <ul>
                            <li
                                class="py-1 px-2 hover:bg-gray-100 {{ request()->is('profile*') ? 'bg-gray-200' : '' }} lg:hover:bg-gray-200 hover:text-cyan-400 lg:hover:text-black rounded-md">
                                <a href="{{ url('/profile') }}">
                                    <div class="flex items-center place-content-center gap-1">
                                        <ion-icon name="person-circle-outline"></ion-icon>
                                        {{ __('site.profile') }}
                                    </div>
                                </a>
                            </li>
                            <li class="py-1 px-2 hover:bg-gray-100 lg:hover:bg-gray-200 hover:text-cyan-400 lg:hover:text-black rounded-md"
                                id="profile_logout">
                                <div class="flex gap-1 items-center place-content-center">
                                    <ion-icon name="log-out-outline" class="text-lg"></ion-icon>
                                    <div>
                                        <form class="appearance-none" action="{{ url('/logout') }}" method="POST">
                                            @csrf
                                            <button type="submit" class="pr-3">{{ __('site.logout') }}</button>
                                        </form>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
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
                    class="hidden whitespace-nowrap lg:absolute bg-white text-black mt-1 lg:mt-0 shadow z-10 px-1 py-2 lg:w-auto rounded-md">
                    <ul class="">
                        <li class="py-1 px-2 hover:bg-gray-100 lg:hover:bg-gray-200 hover:text-cyan-400 lg:hover:text-black rounded-md"
                            id="theme_light" onclick="dropdownChooseTheme('theme', this)">
                            <div class="flex items-center">
                                <a href="#" class="pr-3">{{ __('site.theme_light') }}</a>
                                <ion-icon name="sunny-outline"></ion-icon>
                            </div>
                        </li>
                        <li id="theme_dark"
                            class="py-1 px-2 hover:bg-gray-100 lg:hover:bg-gray-200 hover:text-cyan-400 lg:hover:text-black rounded-md"
                            onclick="dropdownChooseTheme('theme', this)">
                            <div class="flex items-center">
                                <a href="#" class="pr-3">{{ __('site.theme_dark') }}</a>
                                <ion-icon name="moon-outline"></ion-icon>
                            </div>
                        </li>
                        <li id="theme_system"
                            class="py-1 px-2 hover:bg-gray-100 lg:hover:bg-gray-200 hover:text-cyan-400 lg:hover:text-black rounded-md"
                            onclick="dropdownChooseTheme('theme', this)">
                            <div class="flex items-center">
                                <a href="#" class="pr-3">{{ __('site.theme_system') }}</a>
                                <ion-icon name="settings-outline"></ion-icon>
                            </div>
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

    @if (Auth::guard('admin')->check() && !request()->is('email/verify*'))
        <!-- side-bar -->
        <div
            class="dark:bg-slate-700 absolute dark:text-white z-50 opacity-95 lg:opacity-100 sidebar top-[4.2rem] bottom-0 lg:left-0 left-[-250px] p-2 w-[250px] overflow-y-auto text-center bg-slate-50 text-black">

            <div class="text-lg">
                <div
                    class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer dark:hover:bg-gray-500 hover:bg-gray-200 {{ request()->is('admin/categories') ? 'text-cyan-500 bg-gray-100 dark:bg-slate-700' : '' }} duration-200">
                    <ion-icon name="pricetag-outline"></ion-icon>
                    <a href="{{ url('/admin/categories') }}" class="ml-4">{{ __('site.categories') }}</a>
                </div>
                <div>
                    <div class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer dark:hover:bg-gray-500 hover:bg-gray-200 {{ request()->is('admin/stories*') ? 'text-cyan-500 bg-gray-100 dark:bg-slate-700' : '' }}"
                        onclick="dropdown(this, 'social', '{{ request()->is('admin/stories*') ? 'yes' : 'no' }}')">
                        <ion-icon name="book-outline"></ion-icon>
                        <div class="flex justify-between w-full items-center">
                            <span class="ml-4">
                                {{ __('site.stories') }}
                            </span>
                            <span class="{{ request()->is('admin/stories*') ? '' : 'rotate-180' }} duration-300"
                                id="arrow-social">
                                <ion-icon name="chevron-up-outline"></ion-icon>
                            </span>
                        </div>
                    </div>
                    <div class="text-left text-sm font-thin mt-2 w-4/5 mx-auto {{ request()->is('admin/stories*') ? 'block' : 'hidden' }}"
                        id="sub-social">
                        <h1
                            class="cursor-pointer p-2 dark:hover:bg-gray-500 hover:bg-gray-200 duration-300 rounded-md mt-1 {{ request()->is('admin/stories/create') ? 'text-cyan-500 bg-gray-100 dark:bg-slate-700' : '' }}">
                            <div class="flex items-center">
                                <a href="{{ url('/admin/stories/create') }}">
                                    <div class="flex items-center gap-2">
                                        <ion-icon name="add-circle-outline" class="mr-1 text-lg"></ion-icon>
                                        {{ __('site.create') }}
                                    </div>
                                </a>
                            </div>
                        </h1>
                        <h1
                            class="cursor-pointer p-2 dark:hover:bg-gray-500 hover:bg-gray-200 duration-300 rounded-md mt-1 {{ request()->is('admin/stories/view') ? 'text-cyan-500 bg-gray-100 dark:bg-slate-700' : '' }}">
                            <div class="flex items-center">
                                <a href="{{ url('/admin/stories/view') }}">
                                    <div class="flex items-center gap-2">
                                        <ion-icon name="eye-outline" class="mr-1 text-lg"></ion-icon>
                                        {{ __('site.view') }}
                                    </div>
                                </a>
                            </div>
                        </h1>
                    </div>
                </div>
            </div>
            <div class="text-lg">
                <div>
                    <div class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer dark:hover:bg-gray-500 hover:bg-gray-200 {{ request()->is('admin/mail-stories*') ? 'text-cyan-500 bg-gray-100 dark:bg-slate-700' : '' }}"
                        onclick="dropdown(this, 'mail-story', '{{ request()->is('admin/mail-stories*') ? 'yes' : 'no' }}')">
                        <ion-icon name="book-outline"></ion-icon>
                        <div class="flex justify-between w-full items-center">
                            <span class="ml-4">
                                {{ __('site.mail_stories') }}
                            </span>
                            <span class="{{ request()->is('admin/mail-stories*') ? '' : 'rotate-180' }} duration-300"
                                id="arrow-mail-story">
                                <ion-icon name="chevron-up-outline"></ion-icon>
                            </span>
                        </div>
                    </div>
                    <div class="text-left text-sm font-thin mt-2 w-4/5 mx-auto {{ request()->is('admin/mail-stories*') ? 'block' : 'hidden' }}"
                        id="sub-mail-story">
                        <h1
                            class="cursor-pointer p-2 dark:hover:bg-gray-500 hover:bg-gray-200 duration-300 rounded-md mt-1 {{ request()->is('admin/mail-stories/create') ? 'text-cyan-500 bg-gray-100 dark:bg-slate-700' : '' }}">
                            <div class="flex items-center">
                                <a href="{{ url('/admin/mail-stories/create') }}">
                                    <div class="flex items-center gap-2">
                                        <ion-icon name="add-circle-outline" class="mr-1 text-lg"></ion-icon>
                                        {{ __('site.create') }}
                                    </div>
                                </a>
                            </div>
                        </h1>
                        <h1
                            class="cursor-pointer p-2 dark:hover:bg-gray-500 hover:bg-gray-200 duration-300 rounded-md mt-1 {{ request()->is('admin/mail-stories') ? 'text-cyan-500 bg-gray-100 dark:bg-slate-700' : '' }}">
                            <div class="flex items-center">
                                <a href="{{ url('/admin/mail-stories') }}">
                                    <div class="flex items-center gap-2">
                                        <ion-icon name="eye-outline" class="mr-1 text-lg"></ion-icon>
                                        {{ __('site.view') }}
                                    </div>
                                </a>
                            </div>
                        </h1>
                    </div>
                </div>
                <hr class="bg-slate-400 h-[0.15rem] w-full rounded my-2">

            </div>
        </div>
    @endif

    <!-- main -->
    <main>
        <div
            class="{{ Auth::guard('admin')->check() && !request()->is('email/verify*') ? 'lg:relative lg:left-[255px] lg:w-[80vw] z-0' : '' }}">
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

    <!-- user info -->
    <script>
        window.locale = "{{ app()->getLocale() }}"
        window.locale_no_records = "{{ __('site.no_records') }}"
    </script>
    @if (Auth::guard('admin')->check())
        <script>
            window.type = "admin";
            window.auth = @json(Auth::guard('admin')->user())
        </script>
    @endif
    @if (Auth::guard('web')->check())
        <script>
            window.type = "user";
            window.auth = @json(Auth::guard('web')->user())
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
                        `<div class="flex items-center"><span class="pr-3">{{ __('site.theme_system') }}</span><ion-icon name="settings-outline"></ion-icon></div>`
                }
                if (systemThemeLight) {
                    if (document.documentElement.classList.contains("dark")) {
                        document.documentElement.classList.remove("dark");
                    }
                    const d_nav_current = document.querySelector(`#dropdown-current-theme`);
                    d_nav_current.innerHTML =
                        `<div class="flex items-center"><span class="pr-3">{{ __('site.theme_system') }}</span><ion-icon name="settings-outline"></ion-icon></div>`
                }
            }
            if (userTheme === "dark") {
                if (!document.documentElement.classList.contains("dark")) {
                    document.documentElement.classList.add("dark");
                }
                const d_nav_current = document.querySelector(`#dropdown-current-theme`);
                d_nav_current.innerHTML =
                    `<div class="flex items-center"><span class="pr-3">{{ __('site.theme_dark') }}</span><ion-icon name="moon-outline"></ion-icon></div>`
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
            const option_text = e.children[0].children[0].text;
            const option_icon_name = e.children[0].children[1].name;

            if (e.id === 'theme_light') {
                if (document.documentElement.classList.contains("dark")) {
                    document.documentElement.classList.remove("dark");
                }

                localStorage.setItem("theme", "light");

                d_current.innerHTML =
                    `<div class="flex items-center"><span class="pr-3">{{ __('site.theme_light') }}</span><ion-icon name="${option_icon_name}"></ion-icon></div>`;
            }

            if (e.id === 'theme_dark') {

                if (!document.documentElement.classList.contains("dark")) {
                    document.documentElement.classList.add("dark");
                }

                localStorage.setItem("theme", "dark");

                d_current.innerHTML =
                    `<div class="flex items-center"><span class="pr-3">{{ __('site.theme_dark') }}</span><ion-icon name="${option_icon_name}"></ion-icon></div>`;
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
                    `<div class="flex items-center"><span class="pr-3">{{ __('site.theme_system') }}</span><ion-icon name="${option_icon_name}"></ion-icon></div>`;
            }
        }

        // top navbar menu toggle for mobile screens
        function menuToggle(e) {
            let list = document.querySelector('#nav-options');

            e.name === 'menu' ?
                (e.name = "close", list.classList.add('top-[70px]'), list.classList.add('opacity-95')) :
                (e.name = "menu", list.classList.remove('top-[70px]'), list.classList.remove('opacity-95'));
        }

        // sidebar dropdown toggle
        function dropdown(e, id, active) {
            const sub = document.querySelector(`#sub-${id}`);
            const arrow = document.querySelector(`#arrow-${id}`);
            sub.classList.toggle('hidden');

            if (active == "yes") {
                arrow.classList.toggle('rotate-180');
            } else {
                arrow.classList.toggle('rotate-0')
            }
        }

        // sidebar toggle for mobile screens
        function openSidebar(e) {
            const sidebar = document.querySelector('.sidebar');
            const icon = document.querySelector('#sidebar-toggle-icon');

            icon.name === 'menu' ?
                icon.name = 'close' :
                icon.name = 'menu';

            sidebar.classList.toggle('left-[-250px]');
        }

        // dropdown show/hide toggle
        function dropdownToggle(id) {
            const d_content = document.querySelector(`#dropdown-content-${id}`);
            const d_arrow = document.querySelector(`#dropdown-arrow-${id}`);


            d_arrow.classList.toggle('rotate-0');
            d_content.classList.toggle('hidden');
        }
    </script>
    <script>
        const global = globalThis;
    </script>

    @yield('script')
</body>

</html>
