import React, { useState } from 'react';
// router
import { useNavigate } from 'react-router-dom';
// notistack
import { useSnackbar } from 'notistack';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { createCategory } from '../../../redux/slices/inventory/categories';
// components
import { Page, CategoryForm } from '../../../components';
// paths
import { PATH_INVENTORY } from '../../../routes/paths';

const CreateProduct = () => {
  const [data, setData] = useState({
    status: 'ACTIVE'
  });

  const { errors } = useSelector((state) => state.inventory.categories);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = () => {
    dispatch(createCategory(data));
    navigate(PATH_INVENTORY.categories);
    enqueueSnackbar('Categoria creada!', { variant: 'success' });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  return (
    <Page
      hasBackButton
      title="Crear categoria"
      backwardPath={PATH_INVENTORY.categories}
    >
      <CategoryForm
        errors={errors}
        data={data}
        submitButtonText="Crear categoria"
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </Page>
  );
};

export default CreateProduct;
