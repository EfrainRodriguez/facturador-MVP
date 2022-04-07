import React, { useState } from 'react';
// prop types
import PropTypes from 'prop-types';
// router
import { Link as RouterLink } from 'react-router-dom';
// material
import { experimentalStyled as styled } from '@mui/material/styles';
import {
  List,
  Drawer,
  Hidden,
  ListSubheader,
  Link,
  Typography,
  Box,
  Avatar,
  Button
} from '@mui/material';
import {
  Home,
  MonetizationOn,
  Person,
  Group,
  Inventory
} from '@mui/icons-material';
// notistack
import { useSnackbar } from 'notistack';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/auth';
// layout
import SidebarItem from './SidebarItem';
// components
import { ScrollBar, Modal } from '../../components';
// paths
import {
  PATH_HOME,
  PATH_PROFILE,
  PATH_INVENTORY,
  PATH_PERSONS,
  PATH_SALES
} from '../../routes/paths';
// image
import UserLogo from '../../assets/images/user.svg';
// constants
import { LAYOUT } from '../../utils/constants';

// custom styles ------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: LAYOUT.DRAWER_WIDTH
  }
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  margin: theme.spacing(0, 2.5, 5),
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[500_12]
}));

// ----------------------------------------------------------------------

const DashboardSidebar = ({ isOpenSidebar, onCloseSidebar }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogout = () => {
    dispatch(logout()).then(() => {
      enqueueSnackbar('Vuelve pronto!', {
        variant: 'success'
      });
    });
  };

  const handleCancel = () => setIsOpenModal(false);

  const siderbarContent = () => (
    <ScrollBar>
      <Typography variant="h5" sx={{ px: 2.5, mt: 4 }}>
        Bienvenido!
      </Typography>
      <Link underline="none" component={RouterLink} to={PATH_PROFILE.root}>
        <AccountStyle>
          <Avatar src={UserLogo} />
          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
              {user.firstName}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Admin
            </Typography>
          </Box>
        </AccountStyle>
      </Link>
      <List
        disablePadding
        subheader={
          <ListSubheader
            disableSticky
            disableGutters
            sx={{
              mt: 3,
              mb: 2,
              pl: 5,
              color: 'text.primary',
              typography: 'overline'
            }}
          >
            Punto de ventas
          </ListSubheader>
        }
      >
        <SidebarItem title="Inicio" href={PATH_HOME.root} icon={<Home />} />
        <SidebarItem
          title="Ventas"
          href={PATH_SALES.root}
          icon={<MonetizationOn />}
        />
        <SidebarItem title="Inventario" icon={<Inventory />}>
          <SidebarItem
            title="Productos"
            level={1}
            href={PATH_INVENTORY.products}
          />
          <SidebarItem
            title="Categorias"
            level={1}
            href={PATH_INVENTORY.categories}
          />
          <SidebarItem title="Unidades" level={1} href={PATH_INVENTORY.units} />
        </SidebarItem>
        <SidebarItem title="Personas" icon={<Group />}>
          <SidebarItem
            title="Clientes"
            level={1}
            href={PATH_PERSONS.customers}
          />
          <SidebarItem
            title="Proveedores"
            level={1}
            href={PATH_PERSONS.providers}
          />
          <SidebarItem
            title="Empleados"
            level={1}
            href={PATH_PERSONS.empolyees}
          />
        </SidebarItem>
        <SidebarItem
          title="Mi perfil"
          href={PATH_PROFILE.root}
          icon={<Person />}
        />
        <Box my={8} px={2} display="flex" justifyContent="center">
          <Button
            fullWidth
            variant="outlined"
            onClick={() => setIsOpenModal(true)}
          >
            Salir
          </Button>
        </Box>
      </List>
    </ScrollBar>
  );

  return (
    <RootStyle>
      <Modal open={isOpenModal} onCancel={handleCancel}>
        <Typography variant="h6" mb={3}>
          Está seguro que desea salir?
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Button variant="outlined" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleLogout}>
            Salir
          </Button>
        </Box>
      </Modal>
      <Hidden lgUp>
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: LAYOUT.DRAWER_WIDTH }
          }}
        >
          {siderbarContent()}
        </Drawer>
      </Hidden>

      <Hidden lgDown>
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: { width: LAYOUT.DRAWER_WIDTH }
          }}
        >
          {siderbarContent()}
        </Drawer>
      </Hidden>
    </RootStyle>
  );
};

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func
};

export default DashboardSidebar;
