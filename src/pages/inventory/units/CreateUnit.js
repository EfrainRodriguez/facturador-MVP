import React, { useState, useEffect } from 'react';
// router
import { useNavigate } from 'react-router-dom';
// material
import { Card, Typography } from '@mui/material';
// notistack
import { useSnackbar } from 'notistack';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { createUnits, setErrors } from '../../../redux/slices/inventory/units';
// components
import { Page, UnitForm } from '../../../components';
// paths
import { PATH_INVENTORY } from '../../../routes/paths';
// utils
import { clearError } from '../../../utils/error';

const CreateUnit = () => {
  const [data, setData] = useState({});

  const { errors } = useSelector((state) => state.inventory.units);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = () => {
    dispatch(createUnits(data))
      .then(() => {
        navigate(PATH_INVENTORY.units);
        enqueueSnackbar('Unidad creada!', { variant: 'success' });
      })
      .catch((error) => {
        if (error.response) {
          const { data: errorData } = error.response.data;
          enqueueSnackbar(errorData.message, { variant: 'error' });
          if (errorData.errors) {
            dispatch(setErrors(errorData.errors));
          }
        }
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
    dispatch(setErrors(clearError(name, errors)));
  };

  useEffect(() => {
    dispatch(setErrors([]));
  }, [dispatch]);

  return (
    <Page
      hasBackButton
      title="Crear unidad"
      backwardPath={PATH_INVENTORY.units}
    >
      <Card sx={{ p: 3 }}>
        <Typography
          mb={2}
          component="div"
          variant="caption"
          sx={{ color: 'text.secondary' }}
        >
          * Campos requeridos
        </Typography>
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
