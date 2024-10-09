import React, { useState } from 'react';
import axios from 'axios';

const IntegrationSettings: React.FC = () => {
  const [twilioSettings, setTwilioSettings] = useState({
    accountSid: '',
    authToken: '',
    phoneNumber: '',
    twimlAppSid: '',
  });

  const [dialogflowSettings, setDialogflowSettings] = useState({
    projectId: '',
    credentials: '',
  });

  const [openaiSettings, setOpenaiSettings] = useState({
    apiKey: '',
  });

  const saveSettings = async () => {
    try {
      await axios.post('/api/settings/integrations', {
        twilio: twilioSettings,
        dialogflow: dialogflowSettings,
        openai: openaiSettings,
      });
      alert('Settings saved successfully');
    } catch (error) {
      alert('Error saving settings');
    }
  };

  return (
    <div className="integration-settings">
      <h2>Integration Settings</h2>
      
      <h3>Twilio Settings</h3>
      <input
        type="text"
        placeholder="Account SID"
        value={twilioSettings.accountSid}
        onChange={(e) => setTwilioSettings({...twilioSettings, accountSid: e.target.value})}
      />
      {/* Add other Twilio fields */}

      <h3>Dialogflow Settings</h3>
      <input
        type="text"
        placeholder="Project ID"
        value={dialogflowSettings.projectId}
        onChange={(e) => setDialogflowSettings({...dialogflowSettings, projectId: e.target.value})}
      />
      <textarea
        placeholder="Credentials JSON"
        value={dialogflowSettings.credentials}
        onChange={(e) => setDialogflowSettings({...dialogflowSettings, credentials: e.target.value})}
      />

      <h3>OpenAI Settings</h3>
      <input
        type="text"
        placeholder="API Key"
        value={openaiSettings.apiKey}
        onChange={(e) => setOpenaiSettings({...openaiSettings, apiKey: e.target.value})}
      />

      <button onClick={saveSettings}>Save Settings</button>
    </div>
  );
};

export default IntegrationSettings;