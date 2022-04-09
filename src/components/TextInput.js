import React from 'react';
// prop types
import PropTypes from 'prop-types';
// material
import { TextField, FormControl, FormHelperText } from '@mui/material';

const TextInput = ({
  id,
  name,
  label,
  value,
  error,
  placeholder,
  defaultValue,
  fullWidth = true,
  formControlProps,
  onBlur,
  onFocus,
  onChange,
  ...rest
}) => (
  <FormControl fullWidth={fullWidth} {...formControlProps}>
    <TextField
      id={id}
      name={name}
      label={label}
      value={value}
      error={Boolean(error)}
      placeholder={placeholder}
      defaultValue={defaultValue}
      onBlur={onBlur}
      onFocus={onFocus}
      onChange={onChange}
      {...rest}
    />
    {error && (
      <FormHelperText error sx={{ m: 0 }}>
        {error}
      </FormHelperText>
    )}
  </FormControl>
);

TextInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  fullWidth: PropTypes.bool,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  formControlProps: PropTypes.object,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onChange: PropTypes.func
};

export default TextInput;
