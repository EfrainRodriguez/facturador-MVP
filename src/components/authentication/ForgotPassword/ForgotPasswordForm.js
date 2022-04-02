import React from 'react';
// prop types
import PropTypes from 'prop-types';
// router
import { useNavigate } from 'react-router-dom';
// components
import { TextField, Button, InputAdornment, Grid } from '@mui/material';
import { Person } from '@mui/icons-material';
// formik
import { useFormik, Form, FormikProvider } from 'formik';
// yup
import * as Yup from 'yup';
// paths
import { PATH_AUTH } from '../../../routes/paths';

const ForgotPasswordForm = ({ onSubmit }) => {
  const navigate = useNavigate();

  const ForgotSchema = Yup.object().shape({
    email: Yup.string()
      .email('Por favor digite un e-mail válido')
      .required('Por favor digite su e-mail')
  });

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: ForgotSchema,
    onSubmit: (data) => onSubmit(data)
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <TextField
          fullWidth
          name="email"
          type="email"
          label="E-mail"
          placeholder="Digite su e-mail"
          {...getFieldProps('email')}
          error={Boolean(touched.email && errors.email)}
          helperText={touched.email && errors.email}
          sx={{ marginBottom: 4 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person />
              </InputAdornment>
            )
          }}
        />
        <Grid container justify="center" spacing={2}>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="outlined"
              type="primary"
              size="large"
              onClick={() => navigate(PATH_AUTH.login)}
            >
              Volver
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth variant="contained" type="primary" size="large">
              Enviar
            </Button>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
};

ForgotPasswordForm.propTypes = {
  onSubmit: PropTypes.func
};

export default ForgotPasswordForm;
