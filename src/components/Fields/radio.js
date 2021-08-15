import React from 'react';
import {
  FormControlLabel,
  FormHelperText,
  RadioGroup,
  Radio,
} from '@material-ui/core';

import Label from './_defaultLabel';

const DefaultRadio = ({
  value,
  onChange,
  disabled,
  error,
  label,
  options,
  row,
  name,
  ...props
}) => {
  return (
    <div>
      {!!label && <Label disabled={disabled}>{label}</Label>}
      <RadioGroup
        row={row}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            control={<Radio color="primary" />}
            value={option.value}
            label={option.title}
            disabled={disabled}
          />
        ))}
      </RadioGroup>
      <FormHelperText variant="filled" error={!!error}>
        {error}
      </FormHelperText>
    </div>
  );
};

export default DefaultRadio;
