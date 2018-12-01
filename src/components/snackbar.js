import React from 'react';
import ErrorIcon from '@material-ui/icons/Error';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const styles = theme => ({
  error: {
    backgroundColor: '#CD2929',
  },
  success: {
    backgroundColor: '#3B953E',
  },
  icon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

const MySnackbar = ({ isError, open, message, classes, onClose, ...other }) => (
  <Snackbar
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    open={open}
    onClose={onClose}
    autoHideDuration={5000}
  >
    <SnackbarContent
      className={isError ? classes.error : classes.success}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          {isError ? <ErrorIcon className={classes.icon} /> : <CheckCircleIcon className={classes.icon} />}
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>,
      ]}
      {...other}
    />
  </Snackbar>
);

export default withStyles(styles)(MySnackbar);
