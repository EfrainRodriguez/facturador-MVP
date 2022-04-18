import React from 'react';
// prop types
import PropTypes from 'prop-types';
// material
import { Card, Zoom, Dialog, DialogContent } from '@mui/material';
import { styled } from '@mui/material/styles';

const Transition = React.forwardRef((props, ref) => (
  <Zoom ref={ref} {...props} />
));

// --------------------------------------------------

const RootStyle = styled(Dialog)(() => ({
  '& .MuiPaper-rounded': {
    borderRadius: 20
  }
}));

const StyledModalContent = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(2),
  '&.MuiPaper-rounded': {
    borderRadius: 0
  }
}));

const StyledModalCard = styled(Card)(({ theme }) => ({
  width: '100%',
  height: '100%',
  padding: theme.spacing(3),
  borderRadius: 0,
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
}));

// --------------------------------------------------

const Modal = ({ children, open, onCancel, ...props }) => {
  const handleCancel = () => onCancel && onCancel();
  return (
    <RootStyle
      open={open}
      TransitionComponent={Transition}
      onClose={handleCancel}
      {...props}
    >
      <StyledModalContent>
        <StyledModalCard>{children && children}</StyledModalCard>
      </StyledModalContent>
    </RootStyle>
  );
};

Modal.propTypes = {
  children: PropTypes.node,
  open: PropTypes.bool,
  onCancel: PropTypes.func
};

export default Modal;
