import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import data from 'service/data';
import JSONPretty from 'react-json-pretty';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: '32px',
    height: '100%',
  },
  title: {
    fontSize: '32px',
    margin: '16px',
  },
  dataBody: {
    margin: '16px',
    height: '100%',
    'overflowY':'auto', 
  }
});

const LogHistory = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        Data
      </div>
      <Paper elevation={0} className={classes.dataBody}>
        <JSONPretty id="json-pretty" data={data}/>
      </Paper>
    </div>
  )
};

export default LogHistory;