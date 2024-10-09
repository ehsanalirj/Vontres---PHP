import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import LoginScreen from '../screens/LoginScreen';

const mockStore = configureStore([]);

describe('LoginScreen', () => {
  it('renders login form', () => {
    const store = mockStore({
      auth: { user: null, token: null },
    });

    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <LoginScreen navigation={{}} />
      </Provider>
    );

    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('Login')).toBeTruthy();
  });

  it('handles login', () => {
    const store = mockStore({
      auth: { user: null, token: null },
    });

    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <LoginScreen navigation={{}} />
      </Provider>
    );

    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.press(getByText('Login'));

    const actions = store.getActions();
    expect(actions[0].type).toBe('auth/login');
  });
});