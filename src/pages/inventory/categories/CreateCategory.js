import React, { useState, useEffect } from 'react';
// router
import { useNavigate } from 'react-router-dom';
// notistack
import { useSnackbar } from 'notistack';
// redux
import { useDispatch, useSelector } from 'react-redux';
import {
  createCategory,
  fetchCategories,
  setCategoryList
} from '../../../redux/slices/inventory/categories';
// components
import { Page, CategoryForm } from '../../../components';
// paths
import { PATH_INVENTORY } from '../../../routes/paths';

const CreateProduct = () => {
  const [data, setData] = useState({
    status: 'ACTIVE'
  });

  const { errors, categoryList } = useSelector(
    (state) => state.inventory.categories
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = () => {
    dispatch(createCategory(data))
      .then(() => {
        navigate(PATH_INVENTORY.categories);
        enqueueSnackbar('Categoria creada!', { variant: 'success' });
      })
      .catch(() => {
        // TODO: handle error
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    dispatch(fetchCategories()).then((response) => {
      dispatch(setCategoryList(response.data.data));
    });
  }, [dispatch]);

  return (
    <Page
      hasBackButton
      title="Crear categoria"
      backwardPath={PATH_INVENTORY.categories}
    >
      <CategoryForm
        errors={errors}
        data={data}
        categoryOptions={categoryList.categories}
        submitButtonText="Crear categoria"
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </Page>
  );
};

export default CreateProduct;
