import React from 'react';
import { TextField } from '@material-ui/core';

import Label from './_defaultLabel';

const DefaultInput = ({
  value,
  onChange,
  disabled,
  error,
  label,
  onBlur,
  name,
  placeholder,
  ...props
}) => {
  return (
    <div>
      {!!label && <Label disabled={disabled}>{label}</Label>}
      <TextField
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        error={!!error}
        helperText={error}
        label={placeholder}
        onBlur={onBlur}
        name={name}
        variant="outlined"
        fullWidth
        {...props}
      />
    </div>
  );
};

export default DefaultInput;
