import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Lottery Contract component', () => {
  render(<App />);
  const linkElement = screen.getByText(/Lottery Contract/i);
  expect(linkElement).toBeInTheDocument();
});
