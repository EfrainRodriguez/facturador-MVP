import React, { useState } from 'react';
// router
import { useNavigate } from 'react-router-dom';
// material
import { Card } from '@mui/material';
// notistack
import { useSnackbar } from 'notistack';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { createUnits } from '../../../redux/slices/inventory/units';
// components
import { Page, UnitForm } from '../../../components';
// paths
import { PATH_INVENTORY } from '../../../routes/paths';

const CreateUnit = () => {
  const [data, setData] = useState({});

  const { errors } = useSelector((state) => state.inventory.units);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = () => {
    dispatch(createUnits(data));
    navigate(PATH_INVENTORY.units);
    enqueueSnackbar('Unidad creada!', { variant: 'success' });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  return (
    <Page
      hasBackButton
      title="Crear unidad"
      backwardPath={PATH_INVENTORY.units}
    >
      <Card sx={{ p: 3 }}>
        <UnitForm
          errors={errors}
          data={data}
          submitButtonText="Crear unidad"
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </Card>
    </Page>
  );
};

export default CreateUnit;
