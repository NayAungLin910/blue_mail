<?php

namespace App\Http\Requests\Api\Category;

use Illuminate\Foundation\Http\FormRequest;

class CreateCategoryRequest extends FormRequest
{
    public $locale = "";

    protected function prepareForValidation()
    {
        $this->locale = $this->hasHeader('Locale') ? $this->header('Locale') : config('app.this->locale');
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
            'name' => 'required|max:20|min:5|unique:categories,name',
            'mm_name' => 'required|unique:categories,mm_name',
        ];
    }

    public function messages()
    {
        return [
            'required' => __('auth.required', [], $this->locale),
            'max' => __('auth.max_20', [], $this->locale),
            'min' => __('auth.min_5', [], $this->locale),
            'name.unique' => __('auth.unique_category_english', [], $this->locale),
            'mm_name.unique' => __('auth.unique_category_mm', [], $this->locale),
        ];
    }
}
