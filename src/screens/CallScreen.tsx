import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RTCPeerConnection, RTCIceCandidate, RTCSessionDescription, mediaDevices } from 'react-native-webrtc';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AIAssistant from '../components/AIAssistant';
import socket from '../services/socket';

const CallScreen = ({ route }) => {
  const { phoneNumber } = route.params;
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  const peerConnection = useRef(null);

  useEffect(() => {
    const initializeCall = async () => {
      const stream = await mediaDevices.getUserMedia({ audio: true, video: false });
      setLocalStream(stream);

      peerConnection.current = new RTCPeerConnection();

      stream.getTracks().forEach(track => {
        peerConnection.current.addTrack(track, stream);
      });

      peerConnection.current.ontrack = (event) => {
        setRemoteStream(event.streams[0]);
      };

      socket.emit('call_request', { phoneNumber });

      socket.on('call_accepted', async (data) => {
        const remoteDesc = new RTCSessionDescription(data.sdp);
        await peerConnection.current.setRemoteDescription(remoteDesc);

        const answer = await peerConnection.current.createAnswer();
        await peerConnection.current.setLocalDescription(answer);

        socket.emit('call_answer', { sdp: answer, to: data.from });
      });

      socket.on('ice_candidate', async (data) => {
        const candidate = new RTCIceCandidate(data.candidate);
        await peerConnection.current.addIceCandidate(candidate);
      });

      peerConnection.current.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit('ice_candidate', { candidate: event.candidate, to: phoneNumber });
        }
      };
    };

    initializeCall();

    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
      if (peerConnection.current) {
        peerConnection.current.close();
      }
      socket.off('call_accepted');
      socket.off('ice_candidate');
    };
  }, [phoneNumber]);

  const toggleMute = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach(track => {
        track.enabled = !isMuted;
      });
      setIsMuted(!isMuted);
    }
  };

  const toggleSpeaker = () => {
    // Implement speaker toggle logic
    setIsSpeakerOn(!isSpeakerOn);
  };

  const endCall = () => {
    socket.emit('end_call', { to: phoneNumber });
    // Navigate back to previous screen
  };

  return (
    <View style={styles.container}>
      <View style={styles.callInfo}>
        <Text style={styles.callerName}>{phoneNumber}</Text>
        <Text style={styles.callDuration}>00:05:23</Text>
      </View>
      <AIAssistant />
      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton} onPress={toggleMute}>
          <Icon name={isMuted ? 'mic-off' : 'mic'} size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={toggleSpeaker}>
          <Icon name={isSpeakerOn ? 'volume-up' : 'volume-down'} size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.controlButton, styles.endCallButton]} onPress={endCall}>
          <Icon name="call-end" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // ... (styles remain the same as before)
});

export default CallScreen;