import React, { useState, useEffect } from 'react';
// router
import { useNavigate } from 'react-router-dom';
// notistack
import { useSnackbar } from 'notistack';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../../../redux/slices/inventory/products';
import {
  fetchCategories,
  setCategoryList
} from '../../../redux/slices/inventory/categories';
import { fetchUnits, setUnitList } from '../../../redux/slices/inventory/units';
// components
import { Page, ProductForm } from '../../../components';
// paths
import { PATH_INVENTORY } from '../../../routes/paths';

const CreateProduct = () => {
  const [data, setData] = useState({
    status: 'ACTIVE'
  });

  const {
    products: { errors },
    units: { unitList },
    categories: { categoryList }
  } = useSelector((state) => state.inventory);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = () => {
    dispatch(createProduct(data))
      .then(() => {
        navigate(PATH_INVENTORY.products);
        enqueueSnackbar('Producto creado!', { variant: 'success' });
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
    dispatch(fetchUnits()).then((response) => {
      dispatch(setUnitList(response.data.data));
    });
  }, [dispatch]);

  return (
    <Page
      hasBackButton
      title="Crear producto"
      backwardPath={PATH_INVENTORY.products}
    >
      <ProductForm
        data={data}
        errors={errors}
        categoryOptions={categoryList.categories}
        unitOptions={unitList.units}
        submitButtonText="Crear producto"
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </Page>
  );
};

export default CreateProduct;
