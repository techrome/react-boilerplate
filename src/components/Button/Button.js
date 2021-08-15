import React, { forwardRef } from 'react';
import { Button as MuiButton, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(
  (theme) => ({
    spinner: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: '-12px',
      marginLeft: '-12px',
    },
  }),
  { index: 1 },
);

const Button = forwardRef(({ loading, children, disabled, ...props }, ref) => {
  const cls = useStyles();
  return (
    <MuiButton ref={ref} disabled={disabled || loading} {...props}>
      {children}
      {loading && <CircularProgress size={24} className={cls.spinner} />}
    </MuiButton>
  );
});

export default Button;
