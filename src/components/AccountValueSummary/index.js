import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Summary from './Summary';

const useStyles = makeStyles({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  summaryBody: {
    flex: '1',
    width: '100%',
    margin: '16px 0',
  },
  title: {
    fontSize: '32px',
    margin: '16px',
  }
});

const LogSummary = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.title}>
        Value Summay
      </div>
      <Paper elevation={0} className={classes.summaryBody}>
        <Summary />
      </Paper>
    </div>
  )
};

export default LogSummary;