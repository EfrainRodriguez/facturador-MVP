import React, { useState } from 'react';
// router
import { useNavigate } from 'react-router-dom';
// redux
import { useSelector } from 'react-redux';
// material
import { Card, Button } from '@mui/material';
// components
import {
  Page,
  TableX,
  ActionButtons,
  ProductDetails,
  TableToolbar,
  NumberFormattedInput
} from '../../../components';
// paths
import { PATH_INVENTORY } from '../../../routes/paths';

const Products = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const { productList } = useSelector((state) => state.inventory.products);

  const navigate = useNavigate();

  const cellSchema = [
    {
      columnName: 'name',
      columnLabel: 'Nombre'
    },
    {
      columnName: 'amount',
      columnLabel: 'Cantidad en stock',
      columnProps: { align: 'center' },
      cellProps: { align: 'center' }
    },
    {
      columnName: 'purchasePrice',
      columnLabel: 'Precio de compra',
      columnProps: { align: 'center' },
      cellProps: { align: 'center' },
      render: (data) => (
        <NumberFormattedInput displayType="text" value={data || ''} />
      )
    },
    {
      columnName: 'salePrice',
      columnLabel: 'Precio de venta',
      columnProps: { align: 'center' },
      cellProps: { align: 'center' },
      render: (data) => (
        <NumberFormattedInput displayType="text" value={data || ''} />
      )
    },
    {
      columnName: 'category',
      columnLabel: 'Categoria',
      columnProps: { align: 'center' },
      cellProps: { align: 'center' }
    }
  ];

  const handleCreateNewProduct = () => {
    navigate(PATH_INVENTORY.createProduct);
  };

  const handleSelect = (items) => {
    setSelectedItems(items);
  };

  const handleChangePage = () => {};

  const handleRowSelected = (item) => {
    setSelectedItem(item);
  };

  const handleChangeRowsPerPage = () => {};

  const handleEditProduct = () => {
    if (selectedItem) {
      navigate(`${PATH_INVENTORY.editProductRoot}/${selectedItem.id}`);
    }
  };

  const handleDeleteProduct = () => {};

  return (
    <Page
      title="Lista de productos"
      actions={
        <Button
          type="primary"
          variant="contained"
          size="medium"
          onClick={handleCreateNewProduct}
        >
          Nuevo producto
        </Button>
      }
    >
      <Card sx={{ pt: 3 }}>
        <TableToolbar
          numSelected={selectedItems.length}
          actions={
            <ActionButtons
              editLabel="Editar producto"
              editProps={{ disabled: selectedItems.length > 1 }}
              deleteLabel={
                selectedItems.length > 1
                  ? 'Eliminar productos'
                  : 'Eliminar producto'
              }
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
            />
          }
        />
        <TableX
          hasCollapse
          renderRowDetails={(item) => <ProductDetails data={item} />}
          selected={selectedItems}
          sourceData={productList}
          cellSchema={cellSchema}
          onSelect={handleSelect}
          onChangePage={handleChangePage}
          onRowSelected={handleRowSelected}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Card>
    </Page>
  );
};

export default Products;
