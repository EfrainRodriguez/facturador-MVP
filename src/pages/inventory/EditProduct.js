import React, { useState, useEffect } from 'react';
// router
import { useParams } from 'react-router-dom';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct } from '../../redux/slices/inventory/products';
// components
import { Page, ProductForm } from '../../components';
// paths
import { PATH_INVENTORY } from '../../routes/paths';

const EditProduct = () => {
  const [data, setData] = useState({});

  const { productList, errors } = useSelector(
    (state) => state.inventory.products
  );

  const dispatch = useDispatch();
  const { id } = useParams();

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
    dispatch(updateProduct(data));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    const product = productList.find((item) => item.id == id);
    setData(product);
  }, [productList, id]);

  return (
    <Page
      hasBackButton
      title="Editar producto"
      backwardPath={PATH_INVENTORY.products}
    >
      <ProductForm
        data={data}
        errors={errors}
        categoryOptions={categories}
        submitButtonText="Guardar cambios"
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </Page>
  );
};

export default EditProduct;
