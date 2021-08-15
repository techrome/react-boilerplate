import React from "react";
import { FormControlLabel, Checkbox, FormHelperText } from "@material-ui/core";

const DefaultCheckbox = ({
  value,
  onChange,
  disabled,
  error,
  label,
  name,
  ...props
}) => {
  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            checked={value}
            onChange={(e) => onChange(e.target.checked)}
            name={name}
            color="primary"
          />
        }
        disabled={disabled}
        label={label}
        {...props}
      />
      <FormHelperText variant="filled" error={!!error}>
        {error}
      </FormHelperText>
    </div>
  );
};

export default DefaultCheckbox;
