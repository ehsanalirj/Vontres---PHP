import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';

interface BiometricLoginProps {
  onSuccess: () => void;
}

const BiometricLogin: React.FC<BiometricLoginProps> = ({ onSuccess }) => {
  const handleBiometricLogin = async () => {
    const rnBiometrics = new ReactNativeBiometrics();
    const { available, biometryType } = await rnBiometrics.isSensorAvailable();

    if (available && biometryType === ReactNativeBiometrics.TouchID) {
      const { success } = await rnBiometrics.simplePrompt({ promptMessage: 'Confirm fingerprint' });
      if (success) {
        onSuccess();
      }
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleBiometricLogin}>
      <Text style={styles.buttonText}>Login with Biometrics</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default BiometricLogin;