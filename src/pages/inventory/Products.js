import React, { useState } from 'react';
// router
import { useNavigate } from 'react-router-dom';
// material
import { Card, Button, Typography } from '@mui/material';
// components
import { Page, TableX, ActionButtons, TableToolbar } from '../../components';
// paths
import { PATH_INVENTORY } from '../../routes/paths';

const Products = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  const navigate = useNavigate();

  const cellSchema = [
    {
      columnName: 'name',
      columnLabel: 'Nombre',
      render: (data) => <Typography>{data}</Typography>
    },
    {
      columnName: 'purchasePrice',
      columnLabel: 'Precio de compra',
      columnProps: { align: 'center' },
      cellProps: { align: 'center' },
      render: (data) => <Typography>{data}</Typography>
    },
    {
      columnName: 'salePrice',
      columnLabel: 'Precio de venta',
      columnProps: { align: 'center' },
      cellProps: { align: 'center' },
      render: (data) => <Typography>{data}</Typography>
    },
    {
      columnName: 'category',
      columnLabel: 'Categoria',
      columnProps: { align: 'center' },
      cellProps: { align: 'center' },
      render: (data) => <Typography>{data}</Typography>
    }
  ];

  const products = [
    {
      name: 'Producto 1',
      purchasePrice: '$100',
      salePrice: '$200',
      category: 'Categoria 1'
    },
    {
      name: 'Producto 2',
      purchasePrice: '$300',
      salePrice: '$400',
      category: 'Categoria 2'
    },
    {
      name: 'Producto 3',
      purchasePrice: '$500',
      salePrice: '$600',
      category: 'Categoria 3'
    }
  ];

  const handleCreateNewProduct = () => {
    navigate(PATH_INVENTORY.createProduct);
  };

  const handleSelect = (items) => {
    setSelectedItems(items);
  };

  const handleChangePage = () => {};

  const handleRowSelected = () => {};

  const handleChangeRowsPerPage = () => {};

  const handleEditProduct = () => {};

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
          selected={selectedItems}
          sourceData={products}
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
