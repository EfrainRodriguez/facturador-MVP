import React from 'react';
// prop types
import PropTypes from 'prop-types';
// material
import { Card, Grid, Button } from '@mui/material';
// components
import NumberFormattedInput from '../../NumberFormattedInput';
import TextInput from '../../TextInput';
import SelectInput from '../../SelectInput';
// utils
import { getErrorMessage } from '../../../utils/error';

const ProductForm = ({
  data = {},
  errors = [],
  submitButtonText,
  unitOptions = [],
  categoryOptions = [],
  onChange,
  onSubmit
}) => {
  const handleChange = (e) => onChange && onChange(e);
  const handleSubmit = () => onSubmit && onSubmit();
  return (
    <Card sx={{ p: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextInput
            name="name"
            label="Nombre"
            value={data.name}
            error={getErrorMessage('name', errors)}
            placeholder="Informe el nombre del producto"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectInput
            name="category"
            label="Categoria"
            value={data.category}
            options={categoryOptions}
            error={getErrorMessage('category', errors)}
            placeholder="Informe la categoria del producto"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <NumberFormattedInput
            name="purchasePrice"
            label="Precio de compra"
            value={data.purchasePrice}
            error={getErrorMessage('purchasePrice', errors)}
            placeholder="Informe el precio de compra del producto"
            onValueChange={(e) =>
              handleChange({
                target: { name: 'purchasePrice', value: e.floatValue }
              })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <NumberFormattedInput
            name="salePrice"
            value={data.salePrice}
            label="Precio de venta"
            error={getErrorMessage('salePrice', errors)}
            placeholder="Informe el precio de venta del producto"
            onValueChange={(e) =>
              handleChange({
                target: { name: 'salePrice', value: e.floatValue }
              })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectInput
            name="unit"
            value={data.unit}
            options={unitOptions}
            label="Unidad de medida"
            error={getErrorMessage('unit', errors)}
            placeholder="Informe la unidad del producto"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextInput
            name="code"
            value={data.code}
            label="Referencia"
            error={getErrorMessage('code', errors)}
            placeholder="Informe una referencia para el producto"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextInput
            multiline
            minRows={3}
            name="description"
            label="Descripción"
            value={data.description}
            error={getErrorMessage('description', errors)}
            placeholder="Agregue una descripción para el producto"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="end">
          <Button variant="contained" onClick={handleSubmit}>
            {submitButtonText || 'Guardar'}
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

ProductForm.propTypes = {
  data: PropTypes.object,
  errors: PropTypes.array,
  unitOptions: PropTypes.array,
  categoryOptions: PropTypes.array,
  submitButtonText: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func
};

export default ProductForm;
