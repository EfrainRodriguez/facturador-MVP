import React, { useState, useEffect } from 'react';
// router
import { useParams, useNavigate } from 'react-router-dom';
// notistack
import { useSnackbar } from 'notistack';
// redux
import { useDispatch, useSelector } from 'react-redux';
import {
  updateCategory,
  fetchCategories,
  fetchCategory,
  setCategoryList
} from '../../../redux/slices/inventory/categories';
// components
import { Page, CategoryForm } from '../../../components';
// paths
import { PATH_INVENTORY } from '../../../routes/paths';

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
      .catch(() => {
        // TODO: handle error
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    dispatch(fetchCategory(id)).then((response) => {
      setData(response.data && response.data.data);
    });
    dispatch(fetchCategories()).then((response) => {
      dispatch(setCategoryList(response.data.data));
    });
  }, [dispatch, id]);

  return (
    <Page
      hasBackButton
      title="Editar categoria"
      backwardPath={PATH_INVENTORY.categories}
    >
      <CategoryForm
        data={data}
        errors={errors}
        categoryOptions={categoryList.categories}
        submitButtonText="Guardar cambios"
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </Page>
  );
};

export default CreateProduct;
