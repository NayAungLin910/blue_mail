<?php

namespace App\Http\Requests\Api\Category;

use App\Models\Category;
use Illuminate\Foundation\Http\FormRequest;

class EditCategoryRequest extends FormRequest
{
    public $locale;
    public $category;

    protected function prepareForValidation()
    {
        $this->locale = $this->hasHeader('Locale') ? $this->header('Locale') : config('app.this->locale');
        $this->category = Category::where('slug', $this->slug)->first();
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
            'slug' => 'required',
            'name' => 'required|max:20|min:5|unique:categories,name,' . $this->category->id,
            'mm_name' => 'required|unique:categories,mm_name,' . $this->category->id,
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
