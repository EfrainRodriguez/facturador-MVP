import React from 'react';
// material
import { styled } from '@mui/material/styles';
import { Card, Container, Typography, Box } from '@mui/material';
// notistack
import { useSnackbar } from 'notistack';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { login, setRemember } from '../../redux/slices/auth';
// components
import { LoginForm } from '../../components';
// pages
import LoadingPage from '../LoadingPage';
// util
import { getErrorObject } from '../../utils/error';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

const CardStyle = styled(Card)(({ theme }) => ({
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(4, 2),
  margin: theme.spacing(0)
}));

// ----------------------------------------------------------------------

const Login = () => {
  const { user, remember, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = (data, { setErrors }) => {
    const { email, password, remember: changedRemember, documentNumber } = data;
    dispatch(setRemember(changedRemember));
    dispatch(
      login({
        email,
        password,
        documentNumber
      })
    )
      .then(() => {
        enqueueSnackbar('Bienvenido!', {
          variant: 'success'
        });
      })
      .catch((error) => {
        enqueueSnackbar(
          error.response
            ? error.response.data.message
            : 'Error inesperado, por favor intente nuevamente',
          {
            variant: 'error'
          }
        );
        return (
          error.response &&
          error.response.data &&
          setErrors(getErrorObject(error.response.data.errors))
        );
      });
  };

  return (
    <>
      {isLoading && <LoadingPage />}
      <Container>
        <ContentStyle>
          <CardStyle>
            <Box mb={4}>
              <Typography align="center" variant="h4">
                Accesar
              </Typography>
            </Box>
            <LoginForm
              {...(remember && { ...user })}
              remember={remember}
              onSubmit={onSubmit}
            />
          </CardStyle>
        </ContentStyle>
      </Container>
    </>
  );
};

export default Login;
