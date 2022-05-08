import React, { useState } from 'react';
// material
import { Tabs, Tab, Box } from '@mui/material';
import { AccountBox, VpnKey } from '@mui/icons-material';
// notistack
import { useSnackbar } from 'notistack';
// redux
import { useDispatch } from 'react-redux';
import { updatePassword, logout } from '../../redux/slices/auth';
// custom components
import { Page, ProfileGeneral, ProfileChangePassword } from '../../components';

const Profile = () => {
  const [currentTab, setCurrentTab] = useState('general');

  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const handleChangePassword = (data) => {
    dispatch(updatePassword(data))
      .then(() => {
        enqueueSnackbar(
          'Hemos actualizado su contraseña! Por favor, accese nuevamente',
          {
            variant: 'success'
          }
        );
        dispatch(logout());
      })
      .catch(({ response: { data: error } }) => {
        enqueueSnackbar(
          error
            ? error.data.message
            : 'Error inesperado, por favor intente nuevamente',
          {
            variant: 'error'
          }
        );
      });
  };

  const getTabContent = (tab) => {
    if (tab === 'general') return <ProfileGeneral />;
    if (tab === 'password')
      return <ProfileChangePassword onSubmit={handleChangePassword} />;
    return null;
  };

  return (
    <Page title="Mi perfil">
      <Tabs
        value={currentTab}
        scrollButtons="auto"
        variant="scrollable"
        allowScrollButtonsMobile
        onChange={(event, tab) => setCurrentTab(tab)}
      >
        <Tab
          disableRipple
          value="general"
          label="Datos generales"
          icon={<AccountBox fontSize="small" />}
        />
        {/* <Tab
            disableRipple
            value="settings"
            label="Configuraciones"
            icon={<Settings fontSize="small" />}
          /> */}
        <Tab
          disableRipple
          value="password"
          label="Cambiar contraseña"
          icon={<VpnKey fontSize="small" />}
        />
      </Tabs>

      <Box sx={{ mt: 5 }}>{getTabContent(currentTab)}</Box>
    </Page>
  );
};

export default Profile;
