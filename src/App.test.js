import React from 'react';
import { render } from '@testing-library/react';
import App from './App';


test('weather', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/weather/i);
  expect(linkElement).toBeInTheDocument();
});
