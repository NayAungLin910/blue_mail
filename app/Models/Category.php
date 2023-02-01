<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'mm_name',
        'slug',
    ];

    public function stories()
    {
        return $this->belongsToMany(Story::class, 'category_story', 'category_id', 'story_id');
    }

    // created_at attribute mutator 
    protected function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => Carbon::parse($value)->format('d/m/Y h:i:s')
        );
    }
}
