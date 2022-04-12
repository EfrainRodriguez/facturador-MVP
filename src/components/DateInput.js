import React from 'react';
// prop types
import PropTypes from 'prop-types';
// material
import { TextField, FormControl, FormHelperText } from '@mui/material';
import { DatePicker } from '@mui/lab';
// moment
import moment from 'moment';

const DateInput = ({
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
  <FormControl
    fullWidth={fullWidth}
    error={Boolean(error)}
    {...formControlProps}
  >
    <DatePicker
      id={id}
      name={name}
      label={label}
      value={value ? moment(value).toString() : ''}
      placeholder={placeholder}
      defaultValue={defaultValue}
      onBlur={onBlur}
      onFocus={onFocus}
      onChange={onChange}
      renderInput={(params) => <TextField {...params} />}
      {...rest}
    />
    {error && (
      <FormHelperText error sx={{ m: 0 }}>
        {error}
      </FormHelperText>
    )}
  </FormControl>
);

DateInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.any,
  error: PropTypes.string,
  fullWidth: PropTypes.bool,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  formControlProps: PropTypes.object,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onChange: PropTypes.func
};

export default DateInput;
