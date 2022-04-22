import React from 'react';
// prop types
import PropTypes from 'prop-types';
// material
import {
  Card,
  Grid,
  Button,
  Divider,
  Typography,
  MenuItem
} from '@mui/material';
// components
import NumberFormattedInput from '../../NumberFormattedInput';
import TextInput from '../../TextInput';
import SelectInput from '../../SelectInput';
// utils
import { getErrorMessage } from '../../../utils/error';
import { productStatus } from '../../../utils/options';

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
      <Typography
        mb={1}
        component="div"
        variant="caption"
        sx={{ color: 'text.secondary' }}
      >
        * Campos requeridos
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
          <TextInput
            required
            name="name"
            label="Nombre"
            value={data.name || ''}
            error={getErrorMessage('name', errors)}
            placeholder="Informe el nombre del producto"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <SelectInput
            required
            name="category"
            label="Categoria"
            value={data.category || ''}
            error={getErrorMessage('category', errors)}
            placeholder="Informe la categoria del producto"
            onChange={handleChange}
          >
            {categoryOptions.map((category) => (
              <MenuItem key={category._id} value={category._id}>
                {category.name}
              </MenuItem>
            ))}
          </SelectInput>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextInput
            required
            type="number"
            name="amount"
            label="Cantidad en stock"
            value={data.amount || ''}
            error={getErrorMessage('amount', errors)}
            placeholder="Informe la cantiad de stock"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <NumberFormattedInput
            required
            name="purchasePrice"
            allowNegative={false}
            label="Precio de compra"
            value={data.purchasePrice || ''}
            error={getErrorMessage('purchasePrice', errors)}
            placeholder="Informe el precio de compra del producto"
            onValueChange={(e) =>
              handleChange({
                target: { name: 'purchasePrice', value: e.floatValue }
              })
            }
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <NumberFormattedInput
            required
            name="salePrice"
            allowNegative={false}
            value={data.salePrice || ''}
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
        {data.purchasePrice && data.salePrice && (
          <Grid item xs={12} display="flex" justifyContent="end">
            <Typography variant="body2">
              Ganancia de{' '}
              <strong>
                <NumberFormattedInput
                  fullWidth={false}
                  displayType="text"
                  value={data.salePrice - data.purchasePrice || ''}
                />
              </strong>{' '}
              por cada producto
            </Typography>
          </Grid>
        )}
        <Grid item xs={12}>
          <Divider
            orientation="horizontal"
            sx={{ width: '100%', mt: 1, mb: 1 }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <SelectInput
            required
            name="unit"
            value={data.unit || ''}
            label="Unidad de medida"
            error={getErrorMessage('unit', errors)}
            placeholder="Informe la unidad del producto"
            onChange={handleChange}
          >
            {unitOptions.map((unit) => (
              <MenuItem key={unit._id} value={unit._id}>
                {unit.name}
              </MenuItem>
            ))}
          </SelectInput>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextInput
            name="brand"
            value={data.brand || ''}
            label="Marca"
            error={getErrorMessage('brand', errors)}
            placeholder="Informe la marca del producto"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextInput
            name="code"
            value={data.code || ''}
            label="Referencia"
            error={getErrorMessage('code', errors)}
            placeholder="Informe una referencia para el producto"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <TextInput
            multiline
            minRows={3}
            name="description"
            label="Descripción"
            value={data.description || ''}
            error={getErrorMessage('description', errors)}
            placeholder="Agregue una descripción para el producto"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <SelectInput
            name="status"
            value={data.status || ''}
            options={productStatus}
            label="Status del producto"
            error={getErrorMessage('status', errors)}
            placeholder="Informe el status del producto"
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
