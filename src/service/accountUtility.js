import { DOLLAR, PERCENTAGE } from '../constants/prefixSign';
import { forEach, filter, sum } from 'lodash';
import numeral from 'numeral';

/**
 * Get the sum of the total_value of the records which match the filter object
 * @param {} data an array of account data record 
 * @param {*} filterObj the filter object to filter data
 */
export const sumTotalValueWithFilter = (data, filterObj) => {
  if (!data || data.length === 0) return [];

  const totalValueArray = filter(
    data,
    accountRecord => !isFilteredOut(accountRecord, filterObj)
  ).map(accountRecord => accountRecord.total_value);

  return sum(totalValueArray);
}

/**
 * Check if the account record data should be filtered out by the given filter object.
 * @param {*} accountRecord the account record data object
 * @param {*} filterObj the filter object to filter out the record
 * Example of fitlerObj
 * {
 *  'account_category': [REVENUE],
 *  'value_type': [DEBIT],
 *  'account_type': [CURRENT, CURRENT_ACCOUNTS_PAYABLE]
 * }
 * 
 * If the value of each field in the given account record is *NOT* one of the values in the filter object,
 * then the record does not match the filter, so the given record will be filtered out. 
 */
const isFilteredOut = (accountRecord, filterObj) => {
  const filterNames = Object.keys(filterObj);

  let isFilteredOut = false;
  forEach(filterNames, filterName => {
    const valuesToMatch = filterObj[filterName];
    const valueFromRecord = accountRecord[filterName];
    if (valueFromRecord && !valuesToMatch.includes(valueFromRecord)) {
      isFilteredOut = true;
      return;
    }
  })

  return isFilteredOut;
}

/**
 * Format a value with '$' as the prefix and use a comma to separate every 3 digits in the thousands, 
 * millions, billions, and trillions
 * @param {*} value the value to be formatted
 * @param {*} valueName the name of the value
 */
export const formattedValue = (value, valueName) => {
  const formattedValue = numeral(value).format(`${DOLLAR}0,0`);
  return `${valueName}: ${formattedValue}`;
}

/**
 * Format a percentage value with the '%' as the prefix
 * @param {*} value  the value to be formatted
 * @param {*} valueName the name of the value
 */
export const formattedPercentage = (value, valueName) => {
  const formattedPercentage = numeral(value).format(`0,0.0${PERCENTAGE}`);
  return `${valueName}: ${formattedPercentage}`;
}