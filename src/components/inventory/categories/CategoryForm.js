import React from 'react';
// prop types
import PropTypes from 'prop-types';
// material
import { Card, Grid, Button, MenuItem } from '@mui/material';
// components
import TextInput from '../../TextInput';
import SelectInput from '../../SelectInput';
// utils
import { getErrorMessage } from '../../../utils/error';
import { categoryStatus } from '../../../utils/options';

const ProductForm = ({
  data = {},
  errors = [],
  submitButtonText,
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
            value={data.name || ''}
            error={getErrorMessage('name', errors)}
            placeholder="Informe el nombre de la categoria"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectInput
            name="parent"
            label="Categoria padre"
            value={data.parent || ''}
            error={getErrorMessage('parent', errors)}
            placeholder="Informe la categoria padre"
            onChange={handleChange}
          >
            {/* <MenuItem value="">Sin categoria padre</MenuItem> */}
            {categoryOptions.map((category) => (
              <MenuItem key={category._id} value={category._id}>
                {category.name}
              </MenuItem>
            ))}
          </SelectInput>
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectInput
            name="status"
            value={data.status || ''}
            options={categoryStatus}
            label="Status de la categoria"
            error={getErrorMessage('status', errors)}
            placeholder="Informe el status de la categoria"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextInput
            multiline
            minRows={3}
            name="description"
            label="Descripción"
            value={data.description || ''}
            error={getErrorMessage('description', errors)}
            placeholder="Agregue una descripción para la categoria"
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
  categoryOptions: PropTypes.array,
  submitButtonText: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func
};

export default ProductForm;
