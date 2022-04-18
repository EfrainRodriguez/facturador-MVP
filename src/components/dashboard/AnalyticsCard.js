import React from 'react';
// prop types
import PropTypes from 'prop-types';
// material
import { alpha, experimentalStyled as styled } from '@mui/material/styles';
import { Card } from '@mui/material';
import { MonetizationOn } from '@mui/icons-material';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme, color }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette[color].darker,
  backgroundColor: theme.palette[color].lighter
}));

const IconWrapperStyle = styled('div')(({ theme, color }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette[color].dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(
    theme.palette[color].dark,
    0
  )} 0%, ${alpha(theme.palette[color].dark, 0.24)} 100%)`
}));

// ----------------------------------------------------------------------

const AnalyticsBugReports = ({ color = 'primary', icon, children }) => (
  <RootStyle color={color}>
    <IconWrapperStyle color={color}>
      {icon || <MonetizationOn width={24} height={24} />}
    </IconWrapperStyle>
    {children}
  </RootStyle>
);

AnalyticsBugReports.propTypes = {
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'error',
    'warning',
    'info',
    'success'
  ]),
  icon: PropTypes.element,
  children: PropTypes.node
};

export default AnalyticsBugReports;
