import React, { useState } from 'react';
// router
import { useNavigate } from 'react-router-dom';
// material
import { Card } from '@mui/material';
// notistack
import { useSnackbar } from 'notistack';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { createEmployee } from '../../../redux/slices/persons/employees';
// components
import { Page, PersonForm } from '../../../components';
// paths
import { PATH_PERSONS } from '../../../routes/paths';

const CreateEmployee = () => {
  const [data, setData] = useState({
    documentType: 'CC'
  });

  const { errors } = useSelector((state) => state.persons.employees);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = () => {
    dispatch(createEmployee(data));
    navigate(PATH_PERSONS.empolyees);
    enqueueSnackbar('Empleado creado com éxito!', { variant: 'success' });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  return (
    <Page
      hasBackButton
      title="Crear empleado"
      backwardPath={PATH_PERSONS.empolyees}
    >
      <Card sx={{ p: 3 }}>
        <PersonForm
          data={data}
          errors={errors}
          submitButtonText="Crear empleado"
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </Card>
    </Page>
  );
};

export default CreateEmployee;
