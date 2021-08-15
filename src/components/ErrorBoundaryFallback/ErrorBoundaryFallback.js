import React from 'react';
import { Button, Typography } from '@material-ui/core';
import { Error as ErrorIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(
  (theme) => ({
    main: {
      height: '100vh',
      width: '100%',
      backgroundColor: '#fafafa',
      padding: theme.spacing(12, 4),
    },
    error: {
      color: theme.palette.error.main,
      marginBottom: theme.spacing(4),
    },
  }),
  { index: 1 },
);

const ErrorBoundaryFallback = ({ error, resetErrorBoundary, ...props }) => {
  const cls = useStyles();

  return (
    <div className={cls.main}>
      <ErrorIcon style={{ fontSize: '55px' }} color="error" />
      <Typography variant="h5">
        An unexpected error occured. We are sorry for the inconveniece. Error:
      </Typography>
      <Typography variant="h6" className={cls.error}>
        {error?.message || 'No error description'}
      </Typography>
      <Button variant="contained" color="default" onClick={resetErrorBoundary}>
        Recover page
      </Button>
    </div>
  );
};

export default ErrorBoundaryFallback;
