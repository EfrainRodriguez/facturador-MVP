import React from 'react';
// prop types
import PropTypes from 'prop-types';
// material
import { Box, Container } from '@mui/material';
// components
import PageHeader from './PageHeader';

const Page = ({
  title,
  actions,
  children,
  hasBackButton,
  backwardPath,
  ...rest
}) => (
  <Box {...rest}>
    <Container>
      <PageHeader
        title={title}
        actions={actions}
        hasBackButton={hasBackButton}
        backwardPath={backwardPath}
      />
      {children}
    </Container>
  </Box>
);

Page.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  actions: PropTypes.node,
  hasBackButton: PropTypes.bool,
  backwardPath: PropTypes.string
};

export default Page;
