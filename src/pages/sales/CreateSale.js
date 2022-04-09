import React, { useState } from 'react';
// router
import { useNavigate } from 'react-router-dom';
// material
import { Box, Grid, Card, Button, Divider, Typography } from '@mui/material';
// notistack
import { useSnackbar } from 'notistack';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { createSale } from '../../redux/slices/sales';
// components
import {
  Page,
  Modal,
  TableX,
  SaleForm,
  TextInput,
  TableToolbar,
  SaleItemForm,
  ActionButtons,
  NumberFormattedInput
} from '../../components';
// paths
import { PATH_SALES, PATH_INVENTORY } from '../../routes/paths';
// utils
import { normalizeCurrency } from '../../utils/formatters';

const CreateSale = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const [data, setData] = useState({
    createdAt: new Date(),
    products: []
  });
  const [showProductModal, setShowProductModal] = useState(false);

  const { errors } = useSelector((state) => state.sales);

  const cellSchema = [
    {
      columnName: 'name',
      columnLabel: 'Nombre'
    },
    {
      columnName: 'amount',
      columnLabel: 'Cantidad',
      columnProps: { align: 'center' },
      cellProps: { align: 'center' }
    },
    {
      columnName: 'salePrice',
      columnLabel: 'Valor unitario',
      columnProps: { align: 'center' },
      cellProps: { align: 'center' },
      render: (salePrice) => (
        <NumberFormattedInput displayType="text" value={salePrice || ''} />
      )
    },
    {
      columnName: 'discount',
      columnLabel: 'Descuento',
      columnProps: { align: 'center' },
      cellProps: { align: 'center' },
      render: (discount) => (
        <NumberFormattedInput displayType="text" value={discount || ''} />
      )
    },
    {
      columnName: 'total',
      columnLabel: 'Valor total',
      columnProps: { align: 'center' },
      cellProps: { align: 'center' },
      render: (total, allData) => (
        <NumberFormattedInput
          displayType="text"
          value={allData.salePrice * allData.amount - allData.discount || ''}
        />
      )
    }
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const getSubtotal = () =>
    data.products.reduce((acc, curr) => acc + curr.salePrice * curr.amount, 0);

  const getDiscount = () =>
    data.products.reduce((acc, curr) => acc + curr.discount, 0);

  const getTotal = () => getSubtotal() - getDiscount();

  const handleSubmit = () => {
    dispatch(createSale(data));
    navigate(PATH_SALES.root);
    enqueueSnackbar('Venta registrada!', { variant: 'success' });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleSelect = (items) => {
    setSelectedItems(items);
  };

  const handleChangePage = () => {};

  const handleRowSelected = (item) => {
    setSelectedItem(item);
  };

  const handleChangeRowsPerPage = () => {};

  const handleAddProduct = () => {
    setSelectedItem({});
    setShowProductModal(true);
  };

  const handleCloseProductModal = () => {
    setSelectedItem({});
    setShowProductModal(false);
  };

  const handleInsertProduct = (product) => {
    setData({
      ...data,
      products: [
        ...data.products,
        {
          ...product,
          salePrice: Number(normalizeCurrency(product.salePrice)),
          discount: Number(normalizeCurrency(product.discount))
        }
      ]
    });
    setShowProductModal(false);
  };

  const handleEditProduct = () => {
    setShowProductModal(true);
  };

  const handleDeleteProduct = () => {
    setData({
      ...data,
      products: data.products.filter((item) => item.id !== selectedItem.id)
    });
    setSelectedItem({});
    setSelectedItems([]);
  };

  const handleRedirectToCreateProductPage = () => {
    navigate(PATH_INVENTORY.createProduct);
  };

  return (
    <Page hasBackButton title="Registrar venta" backwardPath={PATH_SALES.root}>
      <Card sx={{ p: 3 }}>
        <SaleForm
          data={data}
          errors={errors}
          submitButtonText="Registrar venta"
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
        <Box mt={3} mb={1} display="flex" justifyContent="end">
          <Button variant="contained" onClick={handleAddProduct}>
            Agregar producto
          </Button>
        </Box>
        <Card sx={{ px: 2, pt: 2, pb: 0 }}>
          <Typography variant="subtitle1" mb={2} textAlign="center">
            Lista de productos
          </Typography>
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
            selected={selectedItems}
            sourceData={data.products}
            cellSchema={cellSchema}
            onSelect={handleSelect}
            onChangePage={handleChangePage}
            onRowSelected={handleRowSelected}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Card>
        <Divider component="div" sx={{ my: 3 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={8}>
            <TextInput
              multiline
              minRows={2}
              name="observation"
              label="Observación"
              value={data.observation}
              placeholder="Agregue alguna observación para esta venta"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography
              mb={1}
              variant="h5"
              component="div"
              display="flex"
              justifyContent="space-between"
            >
              Subtotal:{' '}
              <NumberFormattedInput
                fullWidth={false}
                displayType="text"
                value={getSubtotal()}
              />
            </Typography>
            <Typography
              mb={1}
              variant="h5"
              component="div"
              display="flex"
              justifyContent="space-between"
            >
              Descuento:{' '}
              <NumberFormattedInput
                fullWidth={false}
                displayType="text"
                value={-getDiscount()}
              />
            </Typography>
            <Divider component="div" sx={{ my: 1 }} />
            <Typography
              mb={1}
              variant="h5"
              component="div"
              display="flex"
              justifyContent="space-between"
            >
              Total:{' '}
              <NumberFormattedInput
                fullWidth={false}
                displayType="text"
                value={getTotal()}
              />
            </Typography>
          </Grid>
        </Grid>
      </Card>
      <Modal
        fullWidth
        maxWidth="md"
        open={showProductModal}
        onClose={handleCloseProductModal}
      >
        <Typography variant="subtitle1" mt={-1} mb={2}>
          Información de producto
        </Typography>
        <SaleItemForm
          data={selectedItem}
          onCreateProduct={handleRedirectToCreateProductPage}
          onCancel={handleCloseProductModal}
          onSubmit={handleInsertProduct}
        />
      </Modal>
    </Page>
  );
};

export default CreateSale;
