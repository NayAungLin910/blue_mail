<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Story extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'mm_name',
        'slug',
        'description',
        'mm_description',
        'image',
        'admin_id',
        'featured',
    ];

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'category_story', 'story_id', 'category_id');
    }

    // created_at attribute mutator 
    protected function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => Carbon::parse($value)->format('d/m/Y h:i:s')
        );
    }


    public function admin()
    {
        return $this->belongsTo(Admin::class);
    }

    public function mailStory()
    {
        return $this->belongsToMany(MailStory::class, 'mail_story_story_contain', 'story_id', 'mail_story_id');
    }

    public function favUsers()
    {
        return $this->belongsToMany(User::class, 'story_user_fav', 'story_id', 'user_id');
    }

    public function favAdmins()
    {
        return $this->belongsToMany(Admin::class, 'admin_story_fav', 'story_id', 'admin_id');
    }
}
