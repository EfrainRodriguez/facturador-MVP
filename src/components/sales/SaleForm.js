import React from 'react';
// prop types
import PropTypes from 'prop-types';
// material
import { Card, Grid, Button, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
// components
import TextInput from '../TextInput';
import DateInput from '../DateInput';
// utils
import { getErrorMessage } from '../../utils/error';

const SaleForm = ({ data = {}, errors = [], onChange, onAddCustomer }) => {
  const handleChange = (e) => onChange && onChange(e);
  const handleAddCustomer = () => onAddCustomer && onAddCustomer();
  return (
    <Card sx={{ p: 3 }}>
      <Typography
        mb={1}
        component="div"
        variant="caption"
        sx={{ color: 'text.secondary' }}
      >
        * Campos requeridos
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextInput
            required
            name="customer"
            label="Buscar cliente"
            value={data.customer || ''}
            error={getErrorMessage('customer', errors)}
            placeholder="Busque el cliente por nombre"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={2} display="flex" alignItems="center">
          <Button size="small" variant="outlined" onClick={handleAddCustomer}>
            <Add /> Nuevo cliente
          </Button>
        </Grid>
        <Grid item xs={12} sm={4}>
          <DateInput
            required
            type="number"
            name="createdAt"
            label="Fecha de creación"
            value={data.createdAt || ''}
            error={getErrorMessage('createdAt', errors)}
            placeholder="Informe la fecha de creación"
            onChange={(event) =>
              handleChange({ target: { name: 'createdAt', value: event } })
            }
          />
        </Grid>
      </Grid>
    </Card>
  );
};

SaleForm.propTypes = {
  data: PropTypes.object,
  errors: PropTypes.array,
  onChange: PropTypes.func,
  onAddCustomer: PropTypes.func
};

export default SaleForm;
