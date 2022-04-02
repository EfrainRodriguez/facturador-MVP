import React from 'react';
// prop types
import PropTypes from 'prop-types';
// guards
import AuthGuard from '../AuthGuard';
import UserGuard from '../UserGuard';

const AuthStatusGuard = ({ children }) => (
  <AuthGuard>
    <UserGuard>{children}</UserGuard>
  </AuthGuard>
);

AuthStatusGuard.propTypes = {
  children: PropTypes.node
};

export default AuthStatusGuard;
