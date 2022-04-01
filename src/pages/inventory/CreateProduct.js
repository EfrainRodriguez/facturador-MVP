import React from 'react';
// components
import { Page } from '../../components';
// paths
import { PATH_INVENTORY } from '../../routes/paths';

const CreateProduct = () => {
  return (
    <Page
      hasBackButton
      title="Crear producto"
      backwardPath={PATH_INVENTORY.products}
    >
      CreateProduct
    </Page>
  );
};

export default CreateProduct;
