import React, { useState } from 'react';
// router
import { useNavigate } from 'react-router-dom';
// material
import { Card } from '@mui/material';
// notistack
import { useSnackbar } from 'notistack';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { createProvider } from '../../../redux/slices/persons/providers';
// components
import { Page, PersonForm } from '../../../components';
// paths
import { PATH_PERSONS } from '../../../routes/paths';

const CreateCustomer = () => {
  const [data, setData] = useState({
    documentType: 'CC'
  });

  const { errors } = useSelector((state) => state.persons.providers);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = () => {
    dispatch(createProvider(data));
    navigate(PATH_PERSONS.providers);
    enqueueSnackbar('Proveedor creado!', { variant: 'success' });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  return (
    <Page
      hasBackButton
      title="Crear proveedor"
      backwardPath={PATH_PERSONS.providers}
    >
      <Card sx={{ p: 3 }}>
        <PersonForm
          data={data}
          errors={errors}
          submitButtonText="Crear proveedor"
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </Card>
    </Page>
  );
};

export default CreateCustomer;
