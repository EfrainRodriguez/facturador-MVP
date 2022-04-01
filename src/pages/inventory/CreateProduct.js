import React from 'react';
// components
import { Page, ProductForm } from '../../components';
// paths
import { PATH_INVENTORY } from '../../routes/paths';

const CreateProduct = () => {
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
  return (
    <Page
      hasBackButton
      title="Crear producto"
      backwardPath={PATH_INVENTORY.products}
    >
      <ProductForm
        categoryOptions={categories}
        submitButtonText="Crear producto"
        onChange={(e) => console.log(e)}
      />
    </Page>
  );
};

export default CreateProduct;
