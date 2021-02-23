import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {getRevenue, getExpenses, getGrossProfitMargin, getNetProfitMargin, getWorkingCapitalRatio} from 'service/accountService';
const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: '16px',
  },
});

const Summary = () => {
  const classes = useStyles();
  const [revenue, setRevenue] = useState();
  const [expenses, setExpenses] = useState();
  const [grossProfitMargin, setGrossProfitMargin] = useState();
  const [netProfitMargin, setNetProfitMargin] = useState();
  const [workingCapitalRatio, setWorkingCapitalRatio] = useState();

  useEffect(() => {
    setRevenue(getRevenue());
    setExpenses(getExpenses());
    setGrossProfitMargin(getGrossProfitMargin());
    setNetProfitMargin(getNetProfitMargin());
    setWorkingCapitalRatio(getWorkingCapitalRatio());
  }, []);

  return (
    <div className={classes.root}>
      <li>{revenue}</li>
      <li>{expenses}</li>
      <li>{grossProfitMargin}</li>
      <li>{netProfitMargin}</li>
      <li>{workingCapitalRatio}</li>
    </div>
  );
}

export default Summary;
