import React, { useState } from 'react';
// router
import { useNavigate } from 'react-router-dom';
// material
import { Card } from '@mui/material';
// notistack
import { useSnackbar } from 'notistack';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { createCustomer } from '../../../redux/slices/persons/customers';
// components
import { Page, PersonForm } from '../../../components';
// paths
import { PATH_PERSONS } from '../../../routes/paths';

const CreateCustomer = () => {
  const [data, setData] = useState({
    documentType: 'CC'
  });

  const { errors } = useSelector((state) => state.persons.customers);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = () => {
    dispatch(createCustomer(data));
    navigate(PATH_PERSONS.customers);
    enqueueSnackbar('Cliente creado!', { variant: 'success' });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  return (
    <Page
      hasBackButton
      title="Crear cliente"
      backwardPath={PATH_PERSONS.customers}
    >
      <Card sx={{ p: 3 }}>
        <PersonForm
          data={data}
          errors={errors}
          submitButtonText="Crear cliente"
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </Card>
    </Page>
  );
};

export default CreateCustomer;
