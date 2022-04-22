import React from 'react';
// router
import { useNavigate } from 'react-router-dom';
// prop types
import PropTypes from 'prop-types';
// material
import { Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

const BackButton = ({ path, text, icon, onClick, ...restProps }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    navigate(path);
  };
  return (
    <Button variant="outlined" onClick={handleClick} {...restProps}>
      {icon || <ArrowBack />}&nbsp;
      {text || 'Volver'}
    </Button>
  );
};

BackButton.propTypes = {
  path: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.node,
  onClick: PropTypes.func
};

export default BackButton;
