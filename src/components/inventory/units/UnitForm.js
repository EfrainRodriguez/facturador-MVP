import React from 'react';
// prop types
import PropTypes from 'prop-types';
// material
import { Grid, Button } from '@mui/material';
// components
import TextInput from '../../TextInput';
// utils
import { getErrorMessage } from '../../../utils/error';

const UnitForm = ({
  data = {},
  errors = [],
  submitButtonText,
  onChange,
  onSubmit
}) => {
  const handleChange = (e) => onChange && onChange(e);
  const handleSubmit = () => onSubmit && onSubmit();
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextInput
          required
          autoFocus
          name="name"
          label="Nombre"
          value={data.name || ''}
          error={getErrorMessage('name', errors)}
          placeholder="Informe el nombre de la unidad"
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextInput
          multiline
          minRows={3}
          name="description"
          label="Descripción"
          value={data.description || ''}
          error={getErrorMessage('description', errors)}
          placeholder="Agregue una descripción para la unidad"
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} display="flex" justifyContent="end">
        <Button variant="contained" onClick={handleSubmit}>
          {submitButtonText || 'Guardar'}
        </Button>
      </Grid>
    </Grid>
  );
};

UnitForm.propTypes = {
  data: PropTypes.object,
  errors: PropTypes.array,
  submitButtonText: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func
};

export default UnitForm;
