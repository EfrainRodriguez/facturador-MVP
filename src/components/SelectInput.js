import React from 'react';
// prop types
import PropTypes from 'prop-types';
// material
import { Select, InputLabel, MenuItem, FormControl } from '@mui/material';

const SelectInput = ({
  id,
  name,
  label,
  value,
  error,
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
  <FormControl fullWidth={fullWidth} {...formControlProps}>
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
  </FormControl>
);

SelectInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
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
