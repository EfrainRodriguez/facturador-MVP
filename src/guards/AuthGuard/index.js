import React from 'react';
// prop-type
import PropTypes from 'prop-types';
// router
import { Navigate } from 'react-router-dom';
// redux
import { useSelector } from 'react-redux';
// paths
import { PATH_AUTH } from '../../routes/paths';

const AuthGuard = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate replace to={PATH_AUTH.login} />;
  }

  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.node
};

export default AuthGuard;
