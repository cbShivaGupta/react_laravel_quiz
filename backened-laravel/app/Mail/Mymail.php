<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class Mymail extends Mailable
{
    use Queueable, SerializesModels;

    public $content, $to, $subject;

    public function __construct($content, $to, $subject)
    {
        $this->content = $content;
        // $this->to = $to;
        $this->subject = $subject;
    }

    public function build()
    {
        return $this->from("codingbrains8@gmail.com", $this->subject)
            ->subject($this->subject)
            ->html($this->content);
    }
}