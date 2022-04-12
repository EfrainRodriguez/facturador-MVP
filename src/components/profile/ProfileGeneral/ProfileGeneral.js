import React from 'react';
// prop types
import PropTypes from 'prop-types';
// formik
import { Form, FormikProvider, useFormik } from 'formik';
// material
import {
  Box,
  Grid,
  Card,
  Button,
  TextField,
  CardContent,
  Typography
} from '@mui/material';

// ----------------------------------------------------------------------

const ProfileGeneral = ({ data = {}, onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      documentNumber: data.documentNumber || '',
      email: data.email || '',
      phoneNumber: data.phoneNumber || '',
      address: data.address || '',
      state: data.state || '',
      city: data.city || ''
    },
    onSubmit: (submitData, formikHelpers) => onSubmit(submitData, formikHelpers)
  });

  const { handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="firstName"
                      label="Nombre(s)"
                      placeholder="Informe su(s) nombre(s)"
                      {...getFieldProps('firstName')}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="lastName"
                      label="Apellido(s)"
                      placeholder="Informe su(s) apellido(s)"
                      {...getFieldProps('lastName')}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      disabled
                      name="email"
                      label="E-mail"
                      {...getFieldProps('email')}
                    />
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <TextField
                      fullWidth
                      type="number"
                      name="documentNumber"
                      label="Número de documento"
                      placeholder="Informe su número de documento"
                      {...getFieldProps('documentNumber')}
                    />
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <TextField
                      fullWidth
                      type="number"
                      name="phoneNumber"
                      label="Teléfono"
                      placeholder="Informe su teléfono"
                      {...getFieldProps('phoneNumber')}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Card sx={{ p: 3 }}>
                      <Typography variant="body1" mb={2}>
                        Datos de dirección
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            name="address"
                            label="Dirección"
                            placeholder="Informe su dirección"
                            {...getFieldProps('address')}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            name="state"
                            label="Departamento"
                            placeholder="Informe el departamento"
                            {...getFieldProps('state')}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            name="city"
                            label="Ciudad"
                            placeholder="Informe la ciudad"
                            {...getFieldProps('city')}
                          />
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                </Grid>

                <Box
                  sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}
                >
                  <Button type="submit" variant="contained">
                    Guardar cambios
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
};

ProfileGeneral.propTypes = {
  data: PropTypes.object,
  onSubmit: PropTypes.func
};

export default ProfileGeneral;
