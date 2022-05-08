import React from 'react';
// prop types
import PropTypes from 'prop-types';
// material
import { Grid } from '@mui/material';
// import { Add } from '@mui/icons-material';
// components
import TextInput from '../TextInput';
import DateInput from '../DateInput';
import SelectInput from '../SelectInput';
// utils
import { getErrorMessage } from '../../utils/error';
import { paymentStatus, paymentMethods } from '../../utils/options';

const SaleForm = ({ data = {}, errors = [], onChange }) => {
  const handleChange = (e) => onChange && onChange(e);
  // const handleCreateCustomer = () => onCreateCustomer && onCreateCustomer();
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextInput
          name="customer"
          label="Buscar cliente"
          value={data.customer || ''}
          error={getErrorMessage('customer', errors)}
          placeholder="Busque el cliente por nombre"
          onChange={handleChange}
        />
      </Grid>
      {/* <Grid item xs={2} sm={2} display="flex" alignItems="center">
        <Tooltip title="Crear cliente" placement="top">
          <IconButton color="primary" onClick={handleCreateCustomer}>
            <Add />
          </IconButton>
        </Tooltip>
      </Grid> */}
      <Grid item xs={12} md={6}>
        <DateInput
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
      <Grid item xs={12} md={6}>
        <SelectInput
          name="paymentStatus"
          value={data.paymentStatus}
          label="Status de pago"
          error={getErrorMessage('paymentStatus', errors)}
          placeholder="Informe el status de pago"
          options={paymentStatus}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <SelectInput
          name="paymentMethod"
          value={data.paymentMethod}
          label="Metodo de pago"
          error={getErrorMessage('paymentMethod', errors)}
          placeholder="Informe el metodo de pago"
          options={paymentMethods}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextInput
          multiline
          minRows={2}
          name="observation"
          label="Observación"
          value={data.observation || ''}
          placeholder="Agregue alguna observación para esta venta"
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  );
};

SaleForm.propTypes = {
  data: PropTypes.object,
  errors: PropTypes.array,
  onChange: PropTypes.func
  // onCreateCustomer: PropTypes.func
};

export default SaleForm;
