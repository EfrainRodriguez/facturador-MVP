import React, { useState } from 'react';
// router
import { useNavigate } from 'react-router-dom';
// notistack
import { useSnackbar } from 'notistack';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { createSale } from '../../redux/slices/sales';
// components
import { Page, SaleForm } from '../../components';
// paths
import { PATH_SALES } from '../../routes/paths';

const CreateSale = () => {
  const [data, setData] = useState({
    createdAt: new Date()
  });

  const { errors } = useSelector((state) => state.sales);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = () => {
    dispatch(createSale(data));
    navigate(PATH_SALES.root);
    enqueueSnackbar('Venta registrada!', { variant: 'success' });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  return (
    <Page hasBackButton title="Registrar venta" backwardPath={PATH_SALES.root}>
      <SaleForm
        data={data}
        errors={errors}
        submitButtonText="Registrar venta"
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </Page>
  );
};

export default CreateSale;
