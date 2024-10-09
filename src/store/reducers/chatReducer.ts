import { AnyAction } from 'redux';

const initialState = {
  channels: [],
  directMessages: [],
  messages: [],
  users: [],
  error: null,
};

const chatReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case 'FETCH_CHANNELS_SUCCESS':
      return { ...state, channels: action.payload, error: null };
    case 'FETCH_CHANNELS_FAILURE':
      return { ...state, error: action.payload };
    case 'FETCH_DIRECT_MESSAGES_SUCCESS':
      return { ...state, directMessages: action.payload, error: null };
    case 'FETCH_DIRECT_MESSAGES_FAILURE':
      return { ...state, error: action.payload };
    case 'CREATE_CHANNEL_SUCCESS':
      return { ...state, channels: [...state.channels, action.payload], error: null };
    case 'CREATE_CHANNEL_FAILURE':
      return { ...state, error: action.payload };
    case 'FETCH_USERS_SUCCESS':
      return { ...state, users: action.payload, error: null };
    case 'FETCH_USERS_FAILURE':
      return { ...state, error: action.payload };
    case 'START_DIRECT_MESSAGE_SUCCESS':
      return { ...state, directMessages: [...state.directMessages, action.payload], error: null };
    case 'START_DIRECT_MESSAGE_FAILURE':
      return { ...state, error: action.payload };
    case 'FETCH_MESSAGES_SUCCESS':
      return { ...state, messages: action.payload, error: null };
    case 'FETCH_MESSAGES_FAILURE':
      return { ...state, error: action.payload };
    case 'SEND_MESSAGE_SUCCESS':
      return { ...state, messages: [...state.messages, action.payload], error: null };
    case 'SEND_MESSAGE_FAILURE':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default chatReducer;