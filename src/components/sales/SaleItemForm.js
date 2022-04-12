import React from 'react';
// prop types
import PropTypes from 'prop-types';
// material
import {
  Box,
  Grid,
  Button,
  Tooltip,
  MenuItem,
  IconButton,
  Typography
} from '@mui/material';
import { Add } from '@mui/icons-material';
// formik
import { Form, FormikProvider, useFormik } from 'formik';
// yup
import * as Yup from 'yup';
// components
import TextInput from '../TextInput';
import NumberFormattedInput from '../NumberFormattedInput';
import SelectInput from '../SelectInput';
import SaleResume from './SaleResume';
import AutocompleteInput from '../AutocompleteInput';
// utils
import { normalizeCurrency } from '../../utils/formatters';

const SaleItemForm = ({
  data = {},
  unitOptions = [],
  productOptions = [],
  onSubmit,
  onCancel,
  onCreateProduct
}) => {
  const handleCreateProduct = () => onCreateProduct && onCreateProduct();

  const validationSchema = Yup.object().shape({
    id: Yup.number().required('Por favor informe el nombre del producto'),
    amount: Yup.string().required('Por favor informe la cantidad'),
    salePrice: Yup.string().required('Por favor informe el precio de venta'),
    discount: Yup.string().required('Por favor informe el descuento')
    // unit: Yup.string().required('Por favor informe la unidad de medida')
  });

  const formik = useFormik({
    initialValues: {
      id: data.id || '',
      name: data.name || '',
      amount: data.amount || 1,
      salePrice: data.salePrice || '',
      discount: data.discount || 0,
      unit: data.unit || 0,
      observation: data.observation || ''
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (submitData, formikHelpers) =>
      onSubmit && onSubmit(submitData, formikHelpers)
  });

  const { errors, touched, values, handleSubmit, getFieldProps } = formik;

  const handleCancel = () => onCancel && onCancel();

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Typography
          mb={1}
          component="div"
          variant="caption"
          sx={{ color: 'text.secondary' }}
        >
          * Campos requeridos
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={10} sm={8}>
            <AutocompleteInput
              required
              name="id"
              label="Buscar producto"
              value={values.id}
              placeholder="Busque el producto por nombre"
              error={touched.id && errors.id}
              options={productOptions}
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              {...getFieldProps('id')}
              onChange={(value) => {
                formik.setFieldValue('id', value.id);
                formik.setFieldValue('name', value.name);
                formik.setFieldValue('salePrice', value.salePrice);
              }}
            />
          </Grid>
          <Grid item xs={2} sm={4} display="flex" alignItems="center">
            <Tooltip title="Crear producto" placement="top">
              <IconButton color="primary" onClick={handleCreateProduct}>
                <Add />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextInput
                  required
                  type="number"
                  name="amount"
                  label="Cantidad solicitada"
                  value={data.amount}
                  error={touched.amount && errors.amount}
                  placeholder="Informe la cantiad"
                  {...getFieldProps('amount')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectInput
                  required
                  name="unit"
                  value={data.unit}
                  label="Unidad de medida"
                  error={touched.unit && errors.unit}
                  placeholder="Informe la unidad del producto"
                  {...getFieldProps('unit')}
                >
                  {unitOptions.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </SelectInput>
              </Grid>
              <Grid item xs={12} sm={6}>
                <NumberFormattedInput
                  required
                  name="salePrice"
                  allowNegative={false}
                  value={data.salePrice}
                  label="Precio de venta"
                  error={touched.salePrice && errors.salePrice}
                  placeholder="Informe el precio de venta del producto"
                  {...getFieldProps('salePrice')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <NumberFormattedInput
                  required
                  name="discount"
                  allowNegative={false}
                  label="Descuento total aplicado"
                  value={data.discount || ''}
                  error={touched.discount && errors.discount}
                  placeholder="Informe el descuento a ser aplicado"
                  {...getFieldProps('discount')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextInput
                  multiline
                  minRows={2}
                  name="observation"
                  label="Observación"
                  value={data.observation}
                  error={touched.observation && errors.observation}
                  placeholder="Agregue alguna observación para este producto"
                  {...getFieldProps('observation')}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4} display="flex" alignItems="end">
            <Box width="100%">
              <SaleResume
                subTotal={
                  values.amount * Number(normalizeCurrency(values.salePrice))
                }
                discount={-Number(normalizeCurrency(values.discount))}
                total={
                  values.amount * Number(normalizeCurrency(values.salePrice)) -
                  Number(normalizeCurrency(values.discount))
                }
              />
            </Box>
          </Grid>
        </Grid>
        <Box
          sx={{
            mt: 3,
            width: '100%',
            display: 'flex',
            justifyContent: 'end'
          }}
        >
          <Button variant="outlined" sx={{ mx: 2 }} onClick={handleCancel}>
            Cancelar
          </Button>
          <Button type="submit" variant="contained">
            Agregar producto
          </Button>
        </Box>
      </Form>
    </FormikProvider>
  );
};

SaleItemForm.propTypes = {
  data: PropTypes.object,
  unitOptions: PropTypes.array,
  productOptions: PropTypes.array,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  onCreateProduct: PropTypes.func
};

export default SaleItemForm;
