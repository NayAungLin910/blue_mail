<?php

namespace App\Http\Requests\Api\MailStory;

use App\Models\Admin;
use Illuminate\Foundation\Http\FormRequest;

class CreateMailStoryRequest extends FormRequest
{
    public $locale = "";

    protected function prepareForValidation()
    {
        $this->locale = $this->hasHeader('Locale') ? $this->header('Locale') : config('app.locale');
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
            "storiesSlugs" => "required",
            "name" => "required",
            "mm_name" => "required",
            "admin_id" => "required",
        ];
    }

    public function messages()
    {
        return [
            "required" => __('auth.required', [], $this->locale),
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
            if (!Admin::find($this->admin_id)) {
                // if no admin is found
                $validator->errors()->add('errors', [__('site.something_went_wrong', [], $this->locale)]);
            }
        });
    }
}
