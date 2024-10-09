<?php

namespace App\Services;

use Google\Cloud\Dialogflow\V2\SessionsClient;
use Google\Cloud\Dialogflow\V2\TextInput;
use Google\Cloud\Dialogflow\V2\QueryInput;

class DialogflowService
{
    protected $projectId;
    protected $sessionClient;

    public function __construct()
    {
        $this->projectId = config('services.dialogflow.project_id');
        $this->sessionClient = new SessionsClient();
    }

    public function detectIntent($text, $sessionId)
    {
        $session = $this->sessionClient->sessionName($this->projectId, $sessionId);

        $textInput = new TextInput();
        $textInput->setText($text);
        $textInput->setLanguageCode('en-US');

        $queryInput = new QueryInput();
        $queryInput->setText($textInput);

        $response = $this->sessionClient->detectIntent($session, $queryInput);

        return $response->getQueryResult();
    }

    // Add more Dialogflow-related methods here
}