import { Alert } from 'react-native';

export const handleError = (error: any) => {
  console.error('An error occurred:', error);

  let message = 'An unexpected error occurred. Please try again.';

  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    message = error.response.data.message || message;
  } else if (error.request) {
    // The request was made but no response was received
    message = 'No response received from server. Please check your internet connection.';
  } else {
    // Something happened in setting up the request that triggered an Error
    message = error.message || message;
  }

  Alert.alert('Error', message);
};