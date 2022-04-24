import React, { useState, useEffect } from 'react';
// router
import { useParams, useNavigate } from 'react-router-dom';
// notistack
import { useSnackbar } from 'notistack';
// redux
import { useDispatch, useSelector } from 'react-redux';
import {
  updateProduct,
  fetchProduct,
  setErrors
} from '../../../redux/slices/inventory/products';
import {
  fetchCategories,
  setCategoryList
} from '../../../redux/slices/inventory/categories';
import { fetchUnits, setUnitList } from '../../../redux/slices/inventory/units';
// components
import { Page, ProductForm } from '../../../components';
// paths
import { PATH_INVENTORY } from '../../../routes/paths';
// utils
import { clearError } from '../../../utils/error';

const EditProduct = () => {
  const [data, setData] = useState({});

  const {
    products: { errors },
    units: { unitList },
    categories: { categoryList }
  } = useSelector((state) => state.inventory);

  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = () => {
    dispatch(updateProduct(id, { ...data, stock: data.amount }))
      .then(() => {
        navigate(PATH_INVENTORY.products);
        enqueueSnackbar('Producto actualizado!', { variant: 'success' });
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
    dispatch(fetchProduct(id)).then((response) => {
      setData(response.data && response.data.data);
    });
    dispatch(fetchCategories()).then((response) => {
      dispatch(setCategoryList(response.data.data));
    });
    dispatch(fetchUnits()).then((response) => {
      dispatch(setUnitList(response.data.data));
    });
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(setErrors([]));
  }, [dispatch]);

  return (
    <Page
      hasBackButton
      title="Editar producto"
      backwardPath={PATH_INVENTORY.products}
    >
      <ProductForm
        data={data}
        errors={errors}
        categoryOptions={categoryList.categories}
        unitOptions={unitList.units}
        submitButtonText="Guardar cambios"
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </Page>
  );
};

export default EditProduct;
