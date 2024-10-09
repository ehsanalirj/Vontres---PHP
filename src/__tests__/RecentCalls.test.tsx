import React from 'react';
import { render } from '@testing-library/react-native';
import RecentCalls from '../components/RecentCalls';

describe('RecentCalls', () => {
  it('renders correctly', () => {
    const { getByText } = render(<RecentCalls />);
    expect(getByText('Recent Calls')).toBeTruthy();
    expect(getByText('John Doe')).toBeTruthy();
    expect(getByText('Jane Smith')).toBeTruthy();
  });
});