@extends('layout.master')
@section('title', 'Categories - Blue Mail')
@section('description', 'The categories page of the Blue Mail.')
@section('keywords', 'Categories Blue Mail Category')
@section('content')
    <div id="root"></div>
    @vite('resources/js/categories.jsx')
@endsection
@section('script')
    <script>
        window.locale_categories = "{{ __('site.categories') }}"
        window.locale_category = "{{ __('site.category') }}"
        window.locale_new = "{{ __('site.new') }}"
        window.locale_name = "{{ __('site.name') }}"
        window.locale_mm_name = "{{ __('site.mm_name') }}"
        window.locale_created_at = "{{ __('site.created_at') }}"
        window.locale_category_english_name_placeholder = "{{ __('site.category_english_name_placeholder') }}"
        window.locale_category_mm_name_placeholder = "{{ __('site.category_mm_name_place_holder') }}"
        window.locale_search_category = "{{ __('site.search_category') }}"
        window.locale_page_number = "{{ __('site.page_number') }}"
        window.locale_search_category_mm = "{{ __('site.search_category_mm') }}"
        window.locale_sort_by = "{{ __('site.sort_by') }}"
        window.locale_latest = "{{ __('site.latest') }}"
        window.locale_oldest = "{{ __('site.oldest') }}"
        window.locale_edit = "{{ __('site.edit') }}"
        window.locale_save = "{{ __('site.save') }}"
        window.locale_cancel = "{{ __('site.cancel') }}"
        window.locale_category_empty = "{{ __('site.category_empty') }}"
        window.locale_clear_filter = "{{ __('site.clear_filter') }}"
        window.locale_confirm = "{{ __('site.confirm') }}"
        window.locale_sure_delete = "{{ __('site.sure_delete') }} "
        window.filter = "{{ __('site.filter') }}"
        window.locale_sort_by = "{{ __('site.sort_by') }}"
        window.locale_stories_count = "{{ __('site.stories_count') }}"
        window.locale_start_date = "{{ __('site.start_date') }}"
        window.locale_end_date = "{{ __('site.end_date') }}"
    </script>
@endsection
