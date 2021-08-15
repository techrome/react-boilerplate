import React from 'react';
import { FormLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  main: {
    marginBottom: theme.spacing(1),
  },
}));

const Label = ({ disabled, children, ...props }) => {
  const cls = useStyles();

  return (
    <div className={cls.main}>
      <FormLabel disabled={disabled} {...props}>
        {children}
      </FormLabel>
    </div>
  );
};

export default Label;
