
import { REVENUE, EXPENSE, ASSETS, LIABILITY} from 'constants/accountCategory';
import { DEBIT, CREDIT} from 'constants/valueType';
import { BANK, CURRENT, CURRENT_ACCOUNTS_PAYABLE, CURRENT_ACCOUNTS_RECEIVABLE, SALES } from 'constants/accountType';
import { sumTotalValueWithFilter, formattedValue, formattedPercentage } from './accountUtility';
import dataObj from './data';

const { data } = dataObj;

/**
 * The sum of the total_value of the account records where the account_category field is set to revenue
 */
const getRevenueTotalValue = (accountRecordsData = data) => {
  const filter = {
    'account_category': [REVENUE],
  };

  return sumTotalValueWithFilter(accountRecordsData, filter)
}

/**
 * The fommatted sum of the total_value of the account records where the account_category field is set to revenue
 */
export const getRevenue = (accountRecordsData = data) => {
  const filter = {
    'account_category': [REVENUE],
  };

  const totalRevenue = getRevenueTotalValue(accountRecordsData);

  return formattedValue(totalRevenue, 'Revenue');
}

/**
 * The sum of the total_value of the account records where the account_category field is set to expense
 */
export const getExpensesTotalValue = (accountRecordsData = data) => {
  const filter = {
    'account_category': [EXPENSE],
  };

  return sumTotalValueWithFilter(accountRecordsData, filter)
}

/**
 * The formatted sum of the total_value of the account records where the account_category field is set to expense
 */
export const getExpenses = (accountRecordsData = data) => {
  const filter = {
    'account_category': [EXPENSE],
  };

  const totalExpenses = getExpensesTotalValue(accountRecordsData, filter);
  return formattedValue(totalExpenses, 'Expenses');
}

/**
 * Get the gross profit margin
 * @param {*} accountRecordsData the account record data, if not given then use `data` as the default
 * @param {*} revenue the revenue to be used to calculate the gross profit margin
 */
export const getGrossProfitMargin = (accountRecordsData = data, revenue) => {
  const filter = {
    'account_type': [SALES],
    'value_type': [DEBIT],
  }
  const salesDebitTotalValue = sumTotalValueWithFilter(accountRecordsData, filter)

  const revenueTotalValue = revenue || getRevenueTotalValue(accountRecordsData);

  const grossProfiMargin = salesDebitTotalValue / revenueTotalValue;
  return formattedPercentage(grossProfiMargin, 'Gross Profit Margin');
}

/**
 * Get the net profit margin
 * @param {*} expense the default expense if given
 * @param {*} revenue the default revenue if given
 */
/**
 * 
 * Get the net profit margin
 * @param {*} accountRecordsData the record data to be calculated from
 * @param {*} expense the default expense if given
 * @param {*} revenue the default revenue if given
 */
export const getNetProfitMargin = (accountRecordsData = data, expense, revenue) => {
  const expenseTotalValue = expense || getExpensesTotalValue(accountRecordsData);
  const revenueTotalValue = revenue || getRevenueTotalValue(accountRecordsData);
  const netProfitMargin = (revenueTotalValue - expenseTotalValue) / revenueTotalValue;
  return formattedPercentage(netProfitMargin, 'Net Profit Margin');
}

/**
 * Get assets debit value
 * The sum of total_value from all records where the account_category is set to assets, 
 * the value_type is set to debit, and the account_type is one of current, bank, or current_accounts_receivable
 * @param {*} accountRecordsData the record data to be calculated from
 */
const getAssetsDebitTotalValue = (accountRecordsData = data) => {
  const filter = {
    'account_category': [ASSETS],
    'value_type': [DEBIT],
    'account_type': [CURRENT, BANK, CURRENT_ACCOUNTS_RECEIVABLE],
  };

  return sumTotalValueWithFilter(accountRecordsData, filter)
}

/**
 * Get assets credit value
 * The sum of total_value from all records where the account_category is set to assets, 
 * the value_type is set to credit, and the account_type is one of current, bank, or current_accounts_receivable
 * @param {*} accountRecordsData the record data to be calculated from
 */
const getAseetsCreditTotalValue = (accountRecordsData = data) => {
  const filter = {
    'account_category': [ASSETS],
    'value_type': [CREDIT],
    'account_type': [CURRENT, BANK, CURRENT_ACCOUNTS_RECEIVABLE],
  };

  return sumTotalValueWithFilter(accountRecordsData, filter)
}

/**
 * Get liablility credit value
 * The sum of total_value from all records where the account_category is set to liability, the value_type is set to credit, and the account_type is one of 
 * current or current_accounts_payable
 * @param {*} accountRecordsData the record data to be calculated from
 */
const getLiablilityCreditTotalValue = (accountRecordsData = data) => {
  const filter = {
    'account_category': [LIABILITY],
    'value_type': [CREDIT],
    'account_type': [CURRENT, CURRENT_ACCOUNTS_PAYABLE],
  };
  return sumTotalValueWithFilter(accountRecordsData, filter)
}

/**
 * Get liablility debit value
 * The sum of total_value from all records where the account_category is set to liability, the value_type is set to credit, and the account_type is one of 
 * current or current_accounts_payable
 * @param {*} accountRecordsData the record data to be calculated from
 */
const getLiablilityDebitTotalValue = (accountRecordsData = data) => {
  const filter = {
    'account_category': [LIABILITY],
    'value_type': [DEBIT],
    'account_type': [CURRENT, CURRENT_ACCOUNTS_PAYABLE],
  };
  return sumTotalValueWithFilter(accountRecordsData, filter)
}

/**
 * Get working captial ratio
 * This is calculated dividing the assets by the liabilities creating a percentage value where assets are calculated by:
 * adding the total_value from all records where the account_category is set to assets, the value_type is set to debit, and the account_type is one of current, bank, or current_accounts_receivable
 * subtracting the total_value from all records where the account_category is set to assets, the value_type is set to credit, and the account_type is one of current, bank, or current_accounts_receivable
 * and liabilities are calculated by:

 * adding the total_value from all records where the account_category is set to liability, the value_type is set to credit, and the account_type is one of current or current_accounts_payable
 * subtracting the total_value from all records where the account_category is set to liability, the value_type is set to debit, and the account_type is one current or current_accounts_payable
 * @param {*} accountRecordsData the record data to be calculated from
 */
export const getWorkingCapitalRatio = (accountRecordsData = data) => {
  const assetsTotalValue = getAssetsDebitTotalValue(accountRecordsData) - getAseetsCreditTotalValue(accountRecordsData);
  const liabilitiesTotalValue = getLiablilityCreditTotalValue(accountRecordsData) - getLiablilityDebitTotalValue(accountRecordsData);

  const workingCaptalRatio = assetsTotalValue / liabilitiesTotalValue;
  return formattedPercentage(workingCaptalRatio, 'Working Captial Ratio');
}