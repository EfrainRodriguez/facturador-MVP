import React, { useState } from 'react';
// router
import { useNavigate } from 'react-router-dom';
// redux
import { useDispatch } from 'react-redux';
import { createProduct } from '../../redux/slices/inventory/products';
// components
import { Page, ProductForm } from '../../components';
// paths
import { PATH_INVENTORY } from '../../routes/paths';

const CreateProduct = () => {
  const [data, setData] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categories = [
    {
      label: 'Categoria 1',
      value: '1'
    },
    {
      label: 'Categoria 2',
      value: '2'
    }
  ];

  const handleSubmit = () => {
    dispatch(createProduct(data));
    navigate(PATH_INVENTORY.products);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  return (
    <Page
      hasBackButton
      title="Crear producto"
      backwardPath={PATH_INVENTORY.products}
    >
      <ProductForm
        categoryOptions={categories}
        submitButtonText="Crear producto"
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </Page>
  );
};

export default CreateProduct;
