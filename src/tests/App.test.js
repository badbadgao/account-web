import { render, screen } from '@testing-library/react';
import App from 'components/App';

test('renders learn react link', () => {
  render(<App />);
  const revenueTextElement = screen.getByText(/Revenue:/i);
  expect(revenueTextElement).toBeInTheDocument();

  const expenseTextElement = screen.getByText(/Expenses:/i);
  expect(expenseTextElement).toBeInTheDocument();

  const grossProfitMarginTextElement = screen.getByText(/Gross Profit Margin:/i);
  expect(grossProfitMarginTextElement).toBeInTheDocument();

  const netProfitMarginTextElement = screen.getByText(/Net Profit Margin:/i);
  expect(netProfitMarginTextElement).toBeInTheDocument();

  const workingCaptialRatioTextElement = screen.getByText(/Working Captial Ratio:/i);
  expect(workingCaptialRatioTextElement).toBeInTheDocument();
});
