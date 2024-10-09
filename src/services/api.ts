import axios from 'axios';
import { store } from '../store/store';
import { sslPinning } from 'react-native-ssl-pinning';

const api = sslPinning({
  baseUrl: 'https://api.vontres.ai',
  certificates: [
    'sha256/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=', // Replace with your actual certificate hash
  ],
});

api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ... rest of the api.ts file remains the same