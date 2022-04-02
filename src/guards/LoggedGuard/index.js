import React from 'react';
// prop-type
import PropTypes from 'prop-types';
// router
import { Navigate } from 'react-router-dom';
// redux
import { useSelector } from 'react-redux';
// paths
import { PATH_HOME } from '../../routes/paths';

const LoggedGuard = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Navigate replace to={PATH_HOME.root} />;
  }

  return children;
};

LoggedGuard.propTypes = {
  children: PropTypes.node
};

export default LoggedGuard;
