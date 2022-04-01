import React from 'react';
// prop types
import PropTypes from 'prop-types';
// material
import { Box, Typography } from '@mui/material';
// components
import BackButton from './BackButton';

const PageHeader = ({ title, actions, backwardPath, hasBackButton }) => (
  <Box sx={{ mb: 2 }}>
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h4" gutterBottom mb={3}>
          {title}
        </Typography>
        <Box display="flex">
          {hasBackButton && <BackButton path={backwardPath} />}
          <Box flexGrow={1} />
          {actions && actions}
        </Box>
      </Box>
    </Box>
  </Box>
);

PageHeader.propTypes = {
  title: PropTypes.string,
  actions: PropTypes.node,
  backwardPath: PropTypes.string,
  hasBackButton: PropTypes.bool
};

export default PageHeader;
