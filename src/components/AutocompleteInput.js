import * as React from 'react';
// prop types
import PropTypes from 'prop-types';
// material
import {
  TextField,
  FormControl,
  Autocomplete,
  FormHelperText
} from '@mui/material';

const AutocompleteInput = ({
  id,
  name,
  label,
  value,
  error,
  size = 'small',
  options = [],
  placeholder,
  defaultValue,
  inputValue,
  fullWidth = true,
  formControlProps,
  noOptionsText = 'No hay items',
  getOptionLabel,
  isOptionEqualToValue,
  onChange,
  ...rest
}) => (
  <FormControl fullWidth={fullWidth} {...formControlProps}>
    <Autocomplete
      id={id}
      name={name}
      value={value}
      options={options}
      inputValue={inputValue}
      defaultValue={defaultValue}
      noOptionsText={noOptionsText}
      onChange={(event, newInputValue) => {
        onChange(newInputValue);
      }}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={isOptionEqualToValue}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          size={size}
          error={Boolean(error)}
          placeholder={placeholder}
        />
      )}
      {...rest}
    />
    {error && (
      <FormHelperText error sx={{ m: 0 }}>
        {error}
      </FormHelperText>
    )}
  </FormControl>
);

AutocompleteInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  size: PropTypes.string,
  error: PropTypes.string,
  options: PropTypes.array,
  fullWidth: PropTypes.bool,
  inputValue: PropTypes.string,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  noOptionsText: PropTypes.string,
  formControlProps: PropTypes.object,
  onChange: PropTypes.func,
  getOptionLabel: PropTypes.func,
  isOptionEqualToValue: PropTypes.func
};

export default AutocompleteInput;
