import React, { useState, useEffect } from 'react';
// router
import { useParams, useNavigate } from 'react-router-dom';
// material
import { Card } from '@mui/material';
// notistack
import { useSnackbar } from 'notistack';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { updateUnit } from '../../../redux/slices/inventory/units';
// components
import { Page, UnitForm } from '../../../components';
// paths
import { PATH_INVENTORY } from '../../../routes/paths';

const CreateUnit = () => {
  const [data, setData] = useState({});

  const { errors, unitList } = useSelector((state) => state.inventory.units);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = () => {
    dispatch(updateUnit(data));
    navigate(PATH_INVENTORY.units);
    enqueueSnackbar('Unidad atualizada!', { variant: 'success' });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    const unit = unitList.find((item) => item.id == id);
    setData(unit);
  }, [unitList, id]);

  return (
    <Page
      hasBackButton
      title="Editar unidad"
      backwardPath={PATH_INVENTORY.units}
    >
      <Card sx={{ p: 3 }}>
        <UnitForm
          data={data}
          errors={errors}
          submitButtonText="Guardar cambios"
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </Card>
    </Page>
  );
};

export default CreateUnit;
