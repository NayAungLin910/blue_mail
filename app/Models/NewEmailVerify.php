<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NewEmailVerify extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'new_email',
        'currentuser_id',
        'currentuser_type',
    ];

    public function currentuser()
    {
        return $this->morphTo();
    }
}
