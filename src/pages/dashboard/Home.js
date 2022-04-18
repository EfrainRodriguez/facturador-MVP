import React from 'react';
// prop types
import PropTypes from 'prop-types';
// material
import { Grid, Typography, Divider } from '@mui/material';
import { RocketLaunch } from '@mui/icons-material';
// components
import { Page, AnalyticsCard, NumberFormattedInput } from '../../components';

const CurrencyDataLabel = ({ value, label, ...props }) => (
  <>
    <Typography variant="h3" textAlign="center">
      <NumberFormattedInput value={value} displayType="text" {...props} />
    </Typography>
    <Typography variant="body1" textAlign="center">
      {label}
    </Typography>
  </>
);

CurrencyDataLabel.propTypes = {
  value: PropTypes.number,
  label: PropTypes.string
};

const Home = () => {
  return (
    <Page>
      <Typography variant="subtitle1" textAlign="center" mb={2}>
        Ingresos y ventas del mes
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <AnalyticsCard color="success">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <CurrencyDataLabel value={1200000} label="Ingresos" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CurrencyDataLabel value={500000} label="Ganancias" />
              </Grid>
            </Grid>
          </AnalyticsCard>
        </Grid>
        <Grid item xs={12} sm={6}>
          <AnalyticsCard icon={<RocketLaunch />}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <CurrencyDataLabel
                  value={100}
                  label="Ventas realizadas"
                  prefix=""
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CurrencyDataLabel
                  value={25}
                  label="Ventas respecto al mes anterior"
                  prefix="+"
                />
              </Grid>
            </Grid>
          </AnalyticsCard>
        </Grid>
      </Grid>
      <Divider sx={{ width: '100%', my: 2 }} />
    </Page>
  );
};

export default Home;
