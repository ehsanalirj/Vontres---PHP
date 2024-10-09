import React from 'react';
import { render } from '@testing-library/react-native';
import QuickStats from '../components/QuickStats';

describe('QuickStats', () => {
  it('renders correctly', () => {
    const { getByText } = render(<QuickStats />);
    expect(getByText('Calls Today')).toBeTruthy();
    expect(getByText('Avg Duration')).toBeTruthy();
    expect(getByText('Rating')).toBeTruthy();
  });
});