import React, { useState, useEffect } from 'react';
// router
import { useParams, useNavigate } from 'react-router-dom';
// material
import { Card, Typography } from '@mui/material';
// notistack
import { useSnackbar } from 'notistack';
// redux
import { useDispatch, useSelector } from 'react-redux';
import {
  updateCategory,
  fetchCategories,
  fetchCategory,
  setCategoryList,
  setErrors
} from '../../../redux/slices/inventory/categories';
// components
import { Page, CategoryForm } from '../../../components';
// paths
import { PATH_INVENTORY } from '../../../routes/paths';
// utils
import { clearError } from '../../../utils/error';

const CreateProduct = () => {
  const [data, setData] = useState({});

  const { errors, categoryList } = useSelector(
    (state) => state.inventory.categories
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = () => {
    dispatch(updateCategory(id, data))
      .then(() => {
        navigate(PATH_INVENTORY.categories);
        enqueueSnackbar('Categoria atualizada!', { variant: 'success' });
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
    dispatch(fetchCategory(id)).then((response) => {
      setData(response.data && response.data.data);
    });
    dispatch(fetchCategories()).then((response) => {
      dispatch(setCategoryList(response.data.data));
    });
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(setErrors([]));
  }, [dispatch]);

  return (
    <Page
      hasBackButton
      title="Editar categoria"
      backwardPath={PATH_INVENTORY.categories}
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
        <CategoryForm
          data={data}
          errors={errors}
          categoryOptions={categoryList.categories}
          submitButtonText="Guardar cambios"
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </Card>
    </Page>
  );
};

export default CreateProduct;
