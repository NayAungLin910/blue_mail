@extends('layout.master')
@section('title', 'Stories - Blue Mail')
@section('description', 'The stories page of the Blue Mail.')
@section('keywords', 'Stories Blue Mail')
@section('content')
    <div id="root"></div>
    @vite('resources/js/stories.jsx')
@endsection
@section('script')
    <script>
        window.locale_stories =  "{{ __('site.stories') }}"
        window.locale_search = "{{ __('site.search') }}"
        window.locale_filter = "{{ __('site.filter') }}"
        window.locale_search_english_name = "{{ __('site.search_english_name') }}"
        window.locale_search_mm_name = "{{ __('site.search_mm_name') }}"
        window.locale_start_date = "{{ __('site.start_date') }}"
        window.locale_end_date = "{{ __('site.end_date') }}"
        window.locale_filter_categories = "{{ __('site.filter_categories') }}"
        window.locale_sort_by = "{{ __('site.sort_by') }}"
        window.locale_english_name = "{{ __('site.english_name') }}"
        window.locale_mm_name = "{{ __('site.mm_name') }}"
        window.locale_no_records = "{{ __('site.no_records') }}"
        window.locale_clear_filter = "{{ __('site.clear_filter') }}"
        window.locale_latest = "{{ __('site.latest') }}"
        window.locale_oldest = "{{ __('site.oldest') }}"
        window.locale_edit = "{{ __('site.edit') }}"
        window.locale_sure_delete = "{{ __('site.sure_delete') }}"
        window.locale_confirm = "{{ __('site.confirm') }}"
        window.locale_cancel = "{{ __('site.cancel') }}"
        window.locale_feature = "{{ __('site.feature') }}"
        window.locale_featured = "{{ __('site.featured') }}"
        window.initial_category = @json($initialCategory);
        window.initial_search = @json($search)
    </script>
@endsection
