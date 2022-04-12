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
  options = [],
  placeholder,
  defaultValue,
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
      options={options}
      noOptionsText={noOptionsText}
      onChange={(event, newInputValue) => {
        onChange(newInputValue);
      }}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={isOptionEqualToValue}
      renderInput={(params) => (
        <TextField
          {...params}
          name={name}
          label={label}
          value={value}
          error={Boolean(error)}
          placeholder={placeholder}
          defaultValue={defaultValue}
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
  error: PropTypes.string,
  options: PropTypes.array,
  fullWidth: PropTypes.bool,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  noOptionsText: PropTypes.string,
  formControlProps: PropTypes.object,
  onChange: PropTypes.func,
  getOptionLabel: PropTypes.func,
  isOptionEqualToValue: PropTypes.func
};

export default AutocompleteInput;
