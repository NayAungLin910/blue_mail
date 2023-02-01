<?php

namespace App\Jobs;

use App\Mail\MailStoryTemplate;
use App\Mail\MailStoryTemplateMm;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class MailStorySendingToUsers implements ShouldQueue
{
    /*
    Send all the news as emails to all the users
    */
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    protected $stories, $name, $mm_name;
    public $tries = 3;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($stories, $name, $mm_name)
    {
        $this->stories = $stories;
        $this->name = $name;
        $this->mm_name = $mm_name;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $users = User::get();

        foreach ($users as $user) {
            if ($user->language == "mm") {
                // if user chose mm, send mm language email
                Mail::to($user)->send(new MailStoryTemplateMm($this->stories, $this->mm_name));
            } else {
                // else if user choses en, send en language email
                Mail::to($user)->send(new MailStoryTemplate($this->stories, $this->name));
            }
        }
    }
}
