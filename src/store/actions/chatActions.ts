import { Dispatch } from 'redux';
import api from '../../services/api';

export const fetchChannels = () => async (dispatch: Dispatch) => {
  try {
    const response = await api.get('/channels');
    dispatch({ type: 'FETCH_CHANNELS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_CHANNELS_FAILURE', payload: error.message });
  }
};

export const fetchDirectMessages = (userId: string) => async (dispatch: Dispatch) => {
  try {
    const response = await api.get(`/direct-messages/${userId}`);
    dispatch({ type: 'FETCH_DIRECT_MESSAGES_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_DIRECT_MESSAGES_FAILURE', payload: error.message });
  }
};

export const createChannel = (name: string) => async (dispatch: Dispatch) => {
  try {
    const response = await api.post('/channels', { name });
    dispatch({ type: 'CREATE_CHANNEL_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'CREATE_CHANNEL_FAILURE', payload: error.message });
  }
};

export const fetchUsers = () => async (dispatch: Dispatch) => {
  try {
    const response = await api.get('/users');
    dispatch({ type: 'FETCH_USERS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_USERS_FAILURE', payload: error.message });
  }
};

export const startDirectMessage = (userId: string) => async (dispatch: Dispatch) => {
  try {
    const response = await api.post('/direct-messages', { userId });
    dispatch({ type: 'START_DIRECT_MESSAGE_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'START_DIRECT_MESSAGE_FAILURE', payload: error.message });
  }
};

export const fetchMessages = (chatId: string) => async (dispatch: Dispatch) => {
  try {
    const response = await api.get(`/messages/${chatId}`);
    dispatch({ type: 'FETCH_MESSAGES_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_MESSAGES_FAILURE', payload: error.message });
  }
};

export const sendMessage = (chatId: string, content: string) => async (dispatch: Dispatch) => {
  try {
    const response = await api.post(`/messages/${chatId}`, { content });
    dispatch({ type: 'SEND_MESSAGE_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'SEND_MESSAGE_FAILURE', payload: error.message });
  }
};