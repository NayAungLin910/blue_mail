<?php

namespace App\Http\Requests\Api\Story;

use App\Models\Admin;
use App\Models\Story;
use Illuminate\Foundation\Http\FormRequest;

class UpdateStoryRequest extends FormRequest
{
    public $locale;
    public $story;

    protected function prepareForValidation()
    {
        $this->locale = $this->hasHeader('Locale') ? $this->header('Locale') : config('app.locale');
        $this->story = Story::where('slug', $this->slug)->first();
    }
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            "name" => "required|min:5|max:30|unique:stories,name," . $this->story->id,
            "mm_name" => "required",
            "slug" => "required",
            "description" => "required|min:12",
            "mm_description" => "required|min:12",
            "categories" => "required",
            "image" => "nullable|image",
            "admin_id" => "required",
        ];
    }

    public function messages()
    {
        return [
            "required" => __('auth.required', [], $this->locale),
            "min" => __('auth.not_enough_words', [], $this->locale),
            "max" => __('auth.max_30', [], $this->locale),
            "unique" => __('auth.unique_name', [], $this->locale),
            "image" => __('auth.image', [], $this->locale),
        ];
    }

    /**
     * Configure the validator instance.
     *
     * @param  \Illuminate\Validation\Validator  $validator
     * @return void
     */
    public function withValidator($validator)
    {
        $validator->after(function ($validator) {

            if ($this->categories === "[]") {
                // if the user has not selected any category for the story
                $validator->errors()->add('categories', [__('auth.required', [], $this->locale)]);
            }

            if (!Admin::find($this->admin_id)) {
                // if no admin is found
                $validator->errors()->add('errors', [__('site.something_went_wrong', [], $this->locale)]);
            }

            if (!$this->story) {
                // if there is no story found
                $validator->errors()->add('errors', [__('site.something_went_wrong', [], $this->locale)]);
            }
        });
    }
}
