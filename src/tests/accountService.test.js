import {getRevenue, getExpenses, getGrossProfitMargin, getNetProfitMargin, getWorkingCapitalRatio} from 'service/accountService';
import { DOLLAR, PERCENTAGE } from '../constants/prefixSign';
import dataObj from './testdata/normalData';
const { data } = dataObj;

test('test revenue', () => {
  const formattedRevenue = getRevenue(data);
  const expectedValue = `Revenue: ${DOLLAR}200`;
  expect(formattedRevenue).toMatch(expectedValue);
});

test('test expenses', () => {
  const formattedExpenses = getExpenses(data);
  const expectedValue = `Expenses: ${DOLLAR}100`;
  expect(formattedExpenses).toMatch(expectedValue);
});


test('test gross profit margin', () => {
  const formattedGrossProfitMargin = getGrossProfitMargin(data);
  const expectedValue = `Gross Profit Margin: 40.0${PERCENTAGE}`;
  expect(formattedGrossProfitMargin).toMatch(expectedValue);
});

test('test net profit margin', () => {
  const formattedNetProfitMargin = getNetProfitMargin(data);
  const expectedValue = `Net Profit Margin: 50.0${PERCENTAGE}`;
  expect(formattedNetProfitMargin).toMatch(expectedValue);
});

test('test working capital ratio', () => {
  const formattedWorkingCaptialRatio = getWorkingCapitalRatio(data);
  const expectedValue = `Working Captial Ratio: 31.8${PERCENTAGE}`;
  expect(formattedWorkingCaptialRatio).toMatch(expectedValue);
});
