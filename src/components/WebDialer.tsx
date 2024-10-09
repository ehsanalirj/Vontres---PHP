import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Input, Select, message } from 'antd';
import { PhoneOutlined, UserOutlined, TransferOutlined } from '@ant-design/icons';
import { Device } from 'twilio-client';
import { makeCall, endCall, transferCall } from '../store/actions/callActions';

const { Option } = Select;

const WebDialer: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [transferNumber, setTransferNumber] = useState('');
  const [selectedTwilioNumber, setSelectedTwilioNumber] = useState('');
  const [device, setDevice] = useState<Device | null>(null);
  const [connection, setConnection] = useState<any>(null);

  const dispatch = useDispatch();
  const twilioNumbers = useSelector((state: RootState) => state.company.twilioNumbers);
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    const setupDevice = async () => {
      const newDevice = new Device(token, { codecPreferences: ['opus', 'pcmu'] });
      setDevice(newDevice);

      newDevice.on('ready', () => {
        console.log('Twilio device is ready');
      });

      newDevice.on('error', (error) => {
        console.error('Twilio device error:', error);
        message.error('An error occurred with the phone connection');
      });

      newDevice.on('connect', (conn) => {
        setConnection(conn);
      });

      newDevice.on('disconnect', () => {
        setConnection(null);
      });
    };

    if (token) {
      setupDevice();
    }

    return () => {
      if (device) {
        device.destroy();
      }
    };
  }, [token]);

  const handleMakeCall = () => {
    if (!device) {
      message.error('Phone device is not ready');
      return;
    }
    dispatch(makeCall(phoneNumber, selectedTwilioNumber));
    device.connect({ To: phoneNumber, From: selectedTwilioNumber });
  };

  const handleEndCall = () => {
    if (connection) {
      connection.disconnect();
    }
    dispatch(endCall());
  };

  const handleTransferCall = () => {
    if (connection) {
      dispatch(transferCall(transferNumber));
      connection.sendDigits(transferNumber);
    } else {
      message.error('No active call to transfer');
    }
  };

  return (
    <div className="web-dialer">
      <Select
        style={{ width: '100%', marginBottom: 16 }}
        placeholder="Select Twilio Number"
        onChange={(value) => setSelectedTwilioNumber(value)}
      >
        {twilioNumbers.map((num) => (
          <Option key={num.number} value={num.number}>
            {num.number} ({num.department})
          </Option>
        ))}
      </Select>
      <Input
        prefix={<PhoneOutlined />}
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Enter phone number"
        style={{ marginBottom: 16 }}
      />
      <Button
        type="primary"
        icon={<PhoneOutlined />}
        onClick={handleMakeCall}
        disabled={!selectedTwilioNumber || !phoneNumber}
        block
      >
        Make Call
      </Button>
      <Button
        type="danger"
        icon={<PhoneOutlined />}
        onClick={handleEndCall}
        disabled={!connection}
        block
        style={{ marginTop: 16 }}
      >
        End Call
      </Button>
      <Input
        prefix={<UserOutlined />}
        value={transferNumber}
        onChange={(e) => setTransferNumber(e.target.value)}
        placeholder="Enter transfer number"
        style={{ marginTop: 16, marginBottom: 16 }}
      />
      <Button
        type="default"
        icon={<TransferOutlined />}
        onClick={handleTransferCall}
        disabled={!connection || !transferNumber}
        block
      >
        Transfer Call
      </Button>
    </div>
  );
};

export default WebDialer;