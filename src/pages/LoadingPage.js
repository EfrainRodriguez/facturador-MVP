import React from 'react';
// material
import { CircularProgress } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';

// custom styles ---------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  zIndex: 10,
  width: '100%',
  height: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor:
    theme.palette.mode === 'light'
      ? 'rgba(255, 255, 255, 0.5)'
      : alpha(theme.palette.background.default, 0.8)
}));

// -----------------------------------------------------------

const LoadingPage = () => (
  <RootStyle>
    <CircularProgress />
  </RootStyle>
);

export default LoadingPage;
