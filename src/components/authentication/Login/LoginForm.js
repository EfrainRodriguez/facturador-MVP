import React, { useState } from 'react';
// prop types
import PropTypes from 'prop-types';
// router
import { Link as RouterLInk } from 'react-router-dom';
// material
import {
  TextField,
  InputAdornment,
  IconButton,
  Button,
  FormControlLabel,
  Checkbox,
  Box,
  Link
} from '@mui/material';
import { Visibility, VisibilityOff, Person, Lock } from '@mui/icons-material';
// formik
import { useFormik, Form, FormikProvider } from 'formik';
// yup
import * as Yup from 'yup';
// paths
import { PATH_AUTH } from '../../../routes/paths';

const LoginForm = ({ email, remember, documentNumber, onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Por favor digite un e-mail válido')
      .required('Por favor digite su e-mail'),
    password: Yup.string().required('Por favor digite su contraseña'),
    documentNumber: Yup.number()
      .typeError('La cédula debe contener sólo números')
      .test(
        'len',
        'La cédula debe tener al menos 7 dígitos',
        (val) => val && val.toString().length > 6
      )
      .positive('La cédula no puede ser un número negativo')
      .required('Por favor digite su cédula')
  });

  const formik = useFormik({
    initialValues: {
      email: email || '',
      remember,
      password: '',
      documentNumber: documentNumber || ''
    },
    validationSchema: LoginSchema,
    onSubmit: (data, formikHelpers) => onSubmit(data, formikHelpers)
  });

  const { errors, touched, values, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <TextField
          fullWidth
          name="documentNumber"
          label="Cédula"
          placeholder="Digite su cédula"
          {...getFieldProps('documentNumber')}
          error={Boolean(touched.documentNumber && errors.documentNumber)}
          helperText={touched.documentNumber && errors.documentNumber}
          sx={{ marginBottom: 4 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person />
              </InputAdornment>
            )
          }}
        />
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
        <TextField
          fullWidth
          name="password"
          label="Contraseña"
          placeholder="Digite su contraseña"
          type={showPassword ? 'text' : 'password'}
          {...getFieldProps('password')}
          error={Boolean(touched.password && errors.password)}
          helperText={touched.password && errors.password}
          sx={{ marginBottom: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            )
          }}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                {...getFieldProps('remember')}
                checked={values.remember}
              />
            }
            label="Recordarme"
          />
          <Link to={PATH_AUTH.forgotPassword} component={RouterLInk}>
            Olvidé mi contraseña
          </Link>
        </Box>
        <Button
          fullWidth
          variant="contained"
          type="primary"
          size="large"
          sx={{ marginTop: 4 }}
        >
          Entrar
        </Button>
      </Form>
    </FormikProvider>
  );
};

LoginForm.propTypes = {
  email: PropTypes.string,
  remember: PropTypes.bool,
  password: PropTypes.string,
  documentNumber: PropTypes.string,
  onSubmit: PropTypes.func
};

export default LoginForm;
