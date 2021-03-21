import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Hello World Header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Hello World/i);
  expect(headerElement).toBeInTheDocument();
});
