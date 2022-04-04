import React from 'react';
// formik
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { Box, Grid, Card, Button, TextField, CardContent } from '@mui/material';

// ----------------------------------------------------------------------

const ProfileGeneral = () => {
  const formik = useFormik({
    initialValues: {
      name: 'Lindo',
      email: '',
      phoneNumber: '',
      mobileNumber: '',
      address: '',
      state: '',
      city: ''
    },
    onSubmit: () => {}
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
                      name="name"
                      label="Nombre"
                      placeholder="Digite su nombre"
                      InputLabelProps={{
                        shrink: true
                      }}
                      {...getFieldProps('name')}
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

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="phoneNumber"
                      label="Teléfono"
                      placeholder="Digite su teléfono fijo"
                      InputLabelProps={{
                        shrink: true
                      }}
                      {...getFieldProps('phoneNumber')}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="mobileNumber"
                      label="Celular"
                      placeholder="Digite su número de celular"
                      InputLabelProps={{
                        shrink: true
                      }}
                      {...getFieldProps('mobileNumber')}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="address"
                      label="Dirección"
                      placeholder="Digite su dirección"
                      InputLabelProps={{
                        shrink: true
                      }}
                      {...getFieldProps('address')}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="state"
                      label="Estado"
                      placeholder="Digite el estado"
                      InputLabelProps={{
                        shrink: true
                      }}
                      {...getFieldProps('state')}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="city"
                      label="Ciudad"
                      placeholder="Digite la ciudad"
                      InputLabelProps={{
                        shrink: true
                      }}
                      {...getFieldProps('city')}
                    />
                  </Grid>
                </Grid>

                <Box
                  sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}
                >
                  <Button type="submit" variant="contained" size="large">
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

export default ProfileGeneral;
