<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MailStory extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'mm_name',
        'admin_id',
        'slug',
    ];

    public function stories()
    {
        return $this->belongsToMany(Story::class, 'mail_story_story_contain', 'mail_story_id', 'story_id');
    }

    public function admin()
    {
        return $this->belongsTo(Admin::class);
    }

    // created_at attribute mutator 
    protected function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => Carbon::parse($value)->format('d/m/Y h:i:s')
        );
    }
}
