import PropTypes from 'prop-types';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
// redux
import { useSelector } from 'react-redux';
// material
import { experimentalStyled as styled } from '@mui/material/styles';
//
import NavbarLayout from './NavbarLayout';
import SidebarLayout from './SidebarLayout';
import LoadingPage from '../../pages/LoadingPage';
// constants
import { LAYOUT } from '../../utils/constants';

// ----------------------------------------------------------------------

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: LAYOUT.APPBAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: LAYOUT.APPBAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

// ----------------------------------------------------------------------

const DashboardLayout = ({ children }) => {
  const [open, setOpen] = useState(false);

  const { isLoading } = useSelector((state) => state.common);

  return (
    <RootStyle>
      <NavbarLayout onOpenSidebar={() => setOpen(true)} />
      {isLoading && <LoadingPage />}
      <SidebarLayout
        isOpenSidebar={open}
        onCloseSidebar={() => setOpen(false)}
      />
      <MainStyle>{children || <Outlet />}</MainStyle>
    </RootStyle>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node
};

export default DashboardLayout;
