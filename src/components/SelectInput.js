import React from 'react';
// prop types
import PropTypes from 'prop-types';
// material
import {
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  FormHelperText
} from '@mui/material';

const SelectInput = ({
  id,
  name,
  label,
  value,
  size = 'small',
  error,
  required,
  children,
  placeholder,
  options = [],
  defaultValue,
  fullWidth = true,
  formControlProps,
  inputLabelProps,
  onBlur,
  onFocus,
  onChange,
  ...rest
}) => (
  <FormControl
    size={size}
    required={required}
    fullWidth={fullWidth}
    {...formControlProps}
  >
    <InputLabel {...inputLabelProps}>{label}</InputLabel>
    <Select
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
    >
      {children}
      {options.map(({ label: itemLabel, value: itemValue }, index) => (
        <MenuItem key={index} value={itemValue}>
          {itemLabel}
        </MenuItem>
      ))}
    </Select>
    {error && (
      <FormHelperText error sx={{ m: 0 }}>
        {error}
      </FormHelperText>
    )}
  </FormControl>
);

SelectInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.any,
  size: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.bool,
  options: PropTypes.array,
  children: PropTypes.node,
  fullWidth: PropTypes.bool,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  inputLabelProps: PropTypes.object,
  formControlProps: PropTypes.object,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onChange: PropTypes.func
};

export default SelectInput;
