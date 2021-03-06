import { makeStyles } from '@material-ui/core/styles'
import DataPage from 'components/DataPage';
import AccountValueSummary from 'components/AccountValueSummary';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    width: '100%',
    height: '100vh',
    backgroundColor: '#dcdcdc',
  },
  dataPage: {
    width: '40%',
  },
  summary: {
    width: '60%',
  }
});

const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.dataPage}>
        <DataPage />
      </div>
      <div className={classes.summary}>
        <AccountValueSummary/>
      </div>
    </div>
  );
}

export default App;
