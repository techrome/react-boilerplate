import React from 'react';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import isObject from 'lodash/isObject';

import Label from './_defaultLabel';

const DefaultSelect = ({
  value, // empty values - "null" for single and "[]" for multiple
  onChange,
  disabled,
  error,
  label,
  options,
  placeholder,
  row,
  name,
  multiple,
  ...props
}) => {
  return (
    <div>
      {!!label && <Label disabled={disabled}>{label}</Label>}
      <Autocomplete
        options={options}
        value={value}
        getOptionLabel={(option) =>
          option?.title || options.find((el) => el.value === option)?.title
        }
        getOptionSelected={(option, val) => val === option.value}
        onChange={(e, val) => {
          const outputValue = multiple
            ? val.map((el) => (isObject(el) ? el.value : el))
            : isObject(val)
            ? val.value
            : val;
          onChange(outputValue);
        }}
        disabled={disabled}
        renderInput={(params) => (
          <TextField
            {...params}
            name={name}
            error={!!error}
            helperText={error}
            variant="outlined"
            label={placeholder}
          />
        )}
        multiple={multiple}
        {...props}
      />
    </div>
  );
};

export default DefaultSelect;
