import React, { useState } from 'react';
// prop types
import PropTypes from 'prop-types';
// components
import {
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Box
} from '@mui/material';
import { Visibility, VisibilityOff, Lock } from '@mui/icons-material';
import { useFormik, Form, FormikProvider } from 'formik';
// yup
import * as Yup from 'yup';

const ChangePasswordForm = ({
  buttonFullWidth = true,
  hasCurrentPasswordField = true,
  onSubmit
}) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const passwordSchema = {
    newPassword: Yup.string()
      .required('Por favor digite su nueva contraseña')
      .min(8, 'Su nueva contraseña debe tener al menos 8 caracteres')
      .matches(
        /^(?=.*[0-9])/,
        'Su nueva contraseña debe tener al menos un dígito'
      )
      .matches(
        /^(?=.*[a-zA-Z])/,
        'Su nueva contraseña debe tener al menos una letra'
      )
      .matches(
        /^(?=.*[A-Z])/,
        'Su nueva contraseña debe tener al menos una letra mayúscula'
      ),
    passwordConfirm: Yup.string()
      .required('Por favor repita su nueva contraseña')
      .oneOf([Yup.ref('newPassword'), null], 'Las contraseñas no coinciden')
  };

  const PasswordSchema = Yup.object().shape(passwordSchema);

  const PasswordSchemaHasCurrentPassword = Yup.object().shape({
    currentPassword: Yup.string().required(
      'Por favor digite su contraseña actual'
    ),
    ...passwordSchema
  });

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      passwordConfirm: ''
    },
    validationSchema: hasCurrentPasswordField
      ? PasswordSchemaHasCurrentPassword
      : PasswordSchema,
    onSubmit: (data, formikHelpers) => onSubmit(data, formikHelpers)
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        {hasCurrentPasswordField && (
          <TextField
            fullWidth
            name="currentPassword"
            label="Contraseña actual"
            sx={{ marginBottom: 2 }}
            placeholder="Digite su contraseña actual"
            type={showCurrentPassword ? 'text' : 'password'}
            {...getFieldProps('currentPassword')}
            error={Boolean(touched.currentPassword && errors.currentPassword)}
            helperText={touched.currentPassword && errors.currentPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    edge="end"
                  >
                    {showCurrentPassword ? <Visibility /> : <VisibilityOff />}
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
        )}
        <TextField
          fullWidth
          name="newPassword"
          label="Nueva contraseña"
          placeholder="Digite su nueva contraseña"
          type={showNewPassword ? 'text' : 'password'}
          {...getFieldProps('newPassword')}
          error={Boolean(touched.newPassword && errors.newPassword)}
          helperText={touched.newPassword && errors.newPassword}
          sx={{ marginBottom: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  edge="end"
                >
                  {showNewPassword ? <Visibility /> : <VisibilityOff />}
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
        <TextField
          fullWidth
          name="passwordConfirm"
          label="Repetir contraseña"
          placeholder="Repita su nueva contraseña"
          type={showPasswordConfirm ? 'text' : 'password'}
          {...getFieldProps('passwordConfirm')}
          error={Boolean(touched.passwordConfirm && errors.passwordConfirm)}
          helperText={touched.passwordConfirm && errors.passwordConfirm}
          sx={{ marginBottom: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton
                  onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                  edge="end"
                >
                  {showPasswordConfirm ? <Visibility /> : <VisibilityOff />}
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
        <Box sx={{ marginTop: 4, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            fullWidth={buttonFullWidth}
            variant="contained"
            type="primary"
            size="large"
          >
            Enviar
          </Button>
        </Box>
      </Form>
    </FormikProvider>
  );
};

ChangePasswordForm.propTypes = {
  buttonFullWidth: PropTypes.bool,
  hasCurrentPasswordField: PropTypes.bool,
  onSubmit: PropTypes.func
};

export default ChangePasswordForm;
