// prop types
import PropTypes from 'prop-types';
// material
import { TextField, FormControl, FormHelperText } from '@mui/material';
// number format
import NumberFormat from 'react-number-format';

const NumberFormattedInput = ({
  id,
  sx,
  name,
  mask,
  type,
  value,
  error,
  format,
  suffix,
  decimalScale,
  defaultValue,
  placeholder,
  prefix = '$',
  customNumerals,
  fullWidth = true,
  formControlProps,
  autoComplete = 'off',
  allowNegative = true,
  displayType = 'input',
  decimalSeparator = ',',
  thousandSeparator = '.',
  isNumericString = false,
  allowedDecimalSeparators,
  allowLeadingZeros = true,
  fixedDecimalScale = false,
  allowEmptyFormatting = false,
  thousandsGroupStyle = 'thousand',
  onBlur,
  onFocus,
  onChange,
  isAllowed,
  renderText,
  getInputRef,
  onValueChange,
  removeFormatting,
  ...props
}) => (
  <FormControl fullWidth={fullWidth} {...formControlProps}>
    <NumberFormat
      {...props}
      id={id}
      sx={sx}
      type={type}
      name={name}
      mask={mask}
      value={value}
      format={format}
      prefix={prefix}
      suffix={suffix}
      error={Boolean(error)}
      customInput={TextField}
      placeholder={placeholder}
      displayType={displayType}
      autoComplete={autoComplete}
      defaultValue={defaultValue}
      decimalScale={decimalScale}
      allowNegative={allowNegative}
      customNumerals={customNumerals}
      isNumericString={isNumericString}
      decimalSeparator={decimalSeparator}
      removeFormatting={removeFormatting}
      fixedDecimalScale={fixedDecimalScale}
      allowLeadingZeros={allowLeadingZeros}
      thousandSeparator={thousandSeparator}
      thousandsGroupStyle={thousandsGroupStyle}
      allowEmptyFormatting={allowEmptyFormatting}
      allowedDecimalSeparators={allowedDecimalSeparators}
      onBlur={onBlur}
      onFocus={onFocus}
      onChange={onChange}
      isAllowed={isAllowed}
      renderText={renderText}
      getInputRef={getInputRef}
      onValueChange={onValueChange}
    />
    {error && (
      <FormHelperText error sx={{ m: 0 }}>
        {error}
      </FormHelperText>
    )}
  </FormControl>
);

NumberFormattedInput.propTypes = {
  id: PropTypes.string,
  value: PropTypes.any,
  sx: PropTypes.object,
  name: PropTypes.string,
  type: PropTypes.string,
  mask: PropTypes.string,
  error: PropTypes.string,
  prefix: PropTypes.string,
  suffix: PropTypes.string,
  format: PropTypes.string,
  fullWidth: PropTypes.bool,
  allowNegative: PropTypes.bool,
  displayType: PropTypes.string,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  decimalScale: PropTypes.number,
  autoComplete: PropTypes.string,
  customNumerals: PropTypes.array,
  isNumericString: PropTypes.bool,
  fixedDecimalScale: PropTypes.bool,
  allowLeadingZeros: PropTypes.bool,
  formControlProps: PropTypes.object,
  decimalSeparator: PropTypes.string,
  thousandSeparator: PropTypes.string,
  allowEmptyFormatting: PropTypes.bool,
  thousandsGroupStyle: PropTypes.string,
  allowedDecimalSeparators: PropTypes.array,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onChange: PropTypes.func,
  isAllowed: PropTypes.func,
  renderText: PropTypes.func,
  getInputRef: PropTypes.func,
  onValueChange: PropTypes.func,
  removeFormatting: PropTypes.func
};

export default NumberFormattedInput;
