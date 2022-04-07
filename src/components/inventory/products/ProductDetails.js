import React from 'react';
// prop types
import PropTypes from 'prop-types';
// material ui
import { Grid, Typography } from '@mui/material';

const ProductDetails = ({ data }) => (
  <Grid container>
    <Grid item xs={12} sm={3} mt={2}>
      <Typography variant="body">
        Unidad: <strong>{data.unit}</strong>
      </Typography>
    </Grid>
    <Grid item xs={12} sm={3} mt={2}>
      <Typography variant="body">
        Marca: <strong>{data.brand}</strong>
      </Typography>
    </Grid>
    <Grid item xs={12} sm={3} mt={2}>
      <Typography variant="body">
        Referencia: <strong>{data.code}</strong>
      </Typography>
    </Grid>
    <Grid item xs={12} mb={2}>
      <Typography variant="body">
        Descripción: <strong>{data.description}</strong>
      </Typography>
    </Grid>
  </Grid>
);

ProductDetails.propTypes = {
  data: PropTypes.object
};

export default ProductDetails;
