@extends('layout.master')
@section('title', 'Mail Stories Create - Blue Mail')
@section('description', 'The mail story creation and sending page of the Blue Mail.')
@section('keywords', 'Mail Stories Create Blue Mail')
@section('content')
    <div id="root"></div>
    @vite('resources/js/mailStoriesCreate.jsx')
@endsection
@section('script')
    <script>
        window.locale_name = "{{ __('site.name') }}"
        window.locale_send = "{{ __('site.send') }}"
        window.locale_chosen_stories = "{{ __('site.chosen_stories') }}"
        window.locale_deselect = "{{ __('site.deselect') }}"
        window.locale_select = "{{ __('site.select') }}"
        window.locale_mail_story_create = "{{ __('site.mail_story_create') }}"
        window.locale_mail_stories = "{{ __('site.mail_stories') }}"
        window.locale_stories = "{{ __('site.stories') }}"
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
        window.locale_sure_send = "{{ __('site.sure_send') }}"
        window.locale_confirm = "{{ __('site.confirm') }}"
        window.locale_cancel = "{{ __('site.cancel') }}"
    </script>
@endsection
