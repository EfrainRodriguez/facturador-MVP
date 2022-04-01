import React from 'react';
// components
import { Page } from '../../components';
// paths
import { PATH_INVENTORY } from '../../routes/paths';

const EditProduct = () => {
  return (
    <Page
      hasBackButton
      title="Editar producto"
      backwardPath={PATH_INVENTORY.products}
    >
      EditProduct
    </Page>
  );
};

export default EditProduct;
