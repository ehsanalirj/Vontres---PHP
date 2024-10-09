<?php

namespace App\Services;

use Twilio\Rest\Client;

class TwilioService
{
    protected $client;

    public function __construct()
    {
        $this->client = new Client(
            config('services.twilio.account_sid'),
            config('services.twilio.auth_token')
        );
    }

    public function makeCall($to, $from = null)
    {
        $from = $from ?? config('services.twilio.phone_number');

        return $this->client->calls->create(
            $to,
            $from,
            [
                'url' => route('twilio.twiml'),
                'record' => true,
            ]
        );
    }

    // Add more Twilio-related methods here
}