import { render, screen } from '@testing-library/react';
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import App from '../components/App';

test('renders Lottery Contract component', () => {
  render(<App />);
  const linkElement = screen.getByText(/Lottery Contract/i);
  expect(linkElement).toBeInTheDocument();
});
