<?php

namespace App\Services;

use OpenAI\Client;

class OpenAIService
{
    protected $client;

    public function __construct()
    {
        $this->client = OpenAI::client(config('services.openai.api_key'));
    }

    public function generatePrompt($input)
    {
        $response = $this->client->completions()->create([
            'model' => 'text-davinci-002',
            'prompt' => $input,
            'max_tokens' => 100,
        ]);

        return $response['choices'][0]['text'];
    }

    // Add more OpenAI-related methods here
}