import React from 'react';
// router
import { useNavigate } from 'react-router-dom';
// material
import { Card, Button, Typography } from '@mui/material';
// components
import { Page, TableX } from '../../components';
// paths
import { PATH_INVENTORY } from '../../routes/paths';

const Products = () => {
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
        <TableX
          sourceData={products}
          cellSchema={cellSchema}
          // onSelected={setSelected}
          // onChangePage={handleChangePage}
          // onRowSelected={handleUserSelected}
          // onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Card>
    </Page>
  );
};

export default Products;
