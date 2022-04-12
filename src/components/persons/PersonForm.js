import React from 'react';
// prop types
import PropTypes from 'prop-types';
// material
import { Card, Grid, Button, Typography } from '@mui/material';
// components
import TextInput from '../TextInput';
import SelectInput from '../SelectInput';
// utils
import { getErrorMessage } from '../../utils/error';
import { documentTypes, userStatus } from '../../utils/options';
import { orderByLabel } from '../../utils/formatters';

const physicalPersonConfig = [
  'firstName',
  'lastName',
  'documentNumber',
  'email',
  'phone',
  'status'
];

const companyConfig = [
  'companyName',
  'commercialName',
  'documentNumber',
  'verificationDigit',
  'email',
  'phone',
  'status'
];

const personConfig = {
  CC: physicalPersonConfig,
  TI: physicalPersonConfig,
  CCE: physicalPersonConfig,
  TIE: physicalPersonConfig,
  PAS: physicalPersonConfig,
  NIT: companyConfig
};

const PersonWrapper = ({ children, documentType, fieldName }) => {
  const config = documentType
    ? personConfig[documentType]
    : physicalPersonConfig;
  if (!config) return null;
  if (config.find((item) => item === fieldName)) return children;
  return null;
};

const PersonForm = ({
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
      <Grid item xs={12} sm={6}>
        <SelectInput
          name="documentType"
          label="Tipo de documento"
          value={data.documentType || ''}
          options={orderByLabel(documentTypes)}
          error={getErrorMessage('documentType', errors)}
          placeholder="Seleccione un tipo de documento"
          onChange={handleChange}
        />
      </Grid>
      <PersonWrapper
        documentType={data.documentType}
        fieldName="documentNumber"
      >
        <Grid item xs={12} sm={3}>
          <TextInput
            type="number"
            name="documentNumber"
            label="Número de documento"
            value={data.documentNumber || ''}
            error={getErrorMessage('documentNumber', errors)}
            placeholder="Informe el número del documento"
            onChange={handleChange}
          />
        </Grid>
      </PersonWrapper>
      <PersonWrapper
        documentType={data.documentType}
        fieldName="verificationDigit"
      >
        <Grid item xs={12} sm={3}>
          <TextInput
            type="number"
            maxLength={1}
            name="verificationDigit"
            label="Digito de verificación"
            value={data.verificationDigit || ''}
            error={getErrorMessage('verificationDigit', errors)}
            placeholder="Informe el digito de verificación"
            onChange={handleChange}
            onInput={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value, 10))
                .toString()
                .slice(0, 1);
            }}
          />
        </Grid>
      </PersonWrapper>
      <PersonWrapper documentType={data.documentType} fieldName="firstName">
        <Grid item xs={12} sm={6}>
          <TextInput
            name="firstName"
            label="Nombre(s)"
            value={data.firstName || ''}
            error={getErrorMessage('firstName', errors)}
            placeholder="Informe el nombre"
            onChange={handleChange}
          />
        </Grid>
      </PersonWrapper>
      <PersonWrapper documentType={data.documentType} fieldName="lastName">
        <Grid item xs={12} sm={6}>
          <TextInput
            name="lastName"
            label="Apellido(s)"
            value={data.lastName || ''}
            error={getErrorMessage('lastName', errors)}
            placeholder="Informe el apellido"
            onChange={handleChange}
          />
        </Grid>
      </PersonWrapper>
      <PersonWrapper documentType={data.documentType} fieldName="companyName">
        <Grid item xs={12} sm={6}>
          <TextInput
            name="companyName"
            label="Razón social"
            value={data.companyName || ''}
            error={getErrorMessage('companyName', errors)}
            placeholder="Informe la razão social"
            onChange={handleChange}
          />
        </Grid>
      </PersonWrapper>
      <PersonWrapper
        documentType={data.documentType}
        fieldName="commercialName"
      >
        <Grid item xs={12} sm={6}>
          <TextInput
            name="commercialName"
            label="Nombre comercial"
            value={data.commercialName || ''}
            error={getErrorMessage('commercialName', errors)}
            placeholder="Informe el nombre comercial"
            onChange={handleChange}
          />
        </Grid>
      </PersonWrapper>
      <PersonWrapper documentType={data.documentType} fieldName="email">
        <Grid item xs={12} sm={6}>
          <TextInput
            type="email"
            name="email"
            label="E-mail"
            value={data.email || ''}
            error={getErrorMessage('email', errors)}
            placeholder="Informe un e-mail"
            onChange={handleChange}
          />
        </Grid>
      </PersonWrapper>
      <PersonWrapper documentType={data.documentType} fieldName="phone">
        <Grid item xs={12} sm={3}>
          <TextInput
            type="number"
            name="phone"
            label="Teléfono"
            value={data.phone || ''}
            error={getErrorMessage('phone', errors)}
            placeholder="Informe un número de teléfono"
            onChange={handleChange}
          />
        </Grid>
      </PersonWrapper>
      <PersonWrapper documentType={data.documentType} fieldName="status">
        <Grid item xs={12} sm={3}>
          <SelectInput
            name="status"
            value={data.status || ''}
            options={orderByLabel(userStatus)}
            label="Status"
            error={getErrorMessage('status', errors)}
            placeholder="Defina un status para este cliente"
            onChange={handleChange}
          />
        </Grid>
      </PersonWrapper>
      <Grid item xs={12}>
        <Card sx={{ p: 3 }}>
          <Typography variant="body1" mb={2}>
            Datos de dirección
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextInput
                name="address"
                label="Dirección"
                value={data.address || ''}
                error={getErrorMessage('address', errors)}
                placeholder="Informe la dirección"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput
                name="state"
                label="Departamento"
                value={data.state || ''}
                error={getErrorMessage('state', errors)}
                placeholder="Informe un departamento"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput
                name="city"
                label="Ciudad"
                value={data.city || ''}
                error={getErrorMessage('city', errors)}
                placeholder="Informe una ciudad"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Grid item xs={12} display="flex" justifyContent="end">
        <Button variant="contained" onClick={handleSubmit}>
          {submitButtonText || 'Guardar'}
        </Button>
      </Grid>
    </Grid>
  );
};

PersonForm.propTypes = {
  data: PropTypes.object,
  errors: PropTypes.array,
  submitButtonText: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func
};

export default PersonForm;
