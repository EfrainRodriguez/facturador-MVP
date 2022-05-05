import React from 'react';
// prop types
import PropTypes from 'prop-types';
// material
import { Divider, Typography } from '@mui/material';
// components
import NumberFormattedInput from '../NumberFormattedInput';

const SaleResume = ({ subTotal, discount, total }) => (
  <>
    <Typography mb={1} variant="subtitle1">
      Resumen de la venta
    </Typography>
    <Typography
      mb={1}
      variant="body1"
      component="div"
      fontWeight={400}
      display="flex"
      justifyContent="space-between"
    >
      Subtotal:{' '}
      <NumberFormattedInput
        fullWidth={false}
        displayType="text"
        value={subTotal}
      />
    </Typography>
    <Typography
      mb={1}
      variant="body1"
      fontWeight={400}
      component="div"
      display="flex"
      justifyContent="space-between"
    >
      Descuento:{' '}
      <NumberFormattedInput
        fullWidth={false}
        displayType="text"
        value={discount}
      />
    </Typography>
    <Divider component="div" sx={{ my: 1 }} />
    <Typography
      mb={1}
      variant="body1"
      fontWeight={400}
      component="div"
      display="flex"
      justifyContent="space-between"
    >
      Total:{' '}
      <NumberFormattedInput
        fullWidth={false}
        displayType="text"
        value={total}
      />
    </Typography>
  </>
);

SaleResume.propTypes = {
  subTotal: PropTypes.number,
  discount: PropTypes.number,
  total: PropTypes.number
};

export default SaleResume;
