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
import { createCustomer } from '../../redux/slices/persons/customers';
// components
import {
  Page,
  Modal,
  TableX,
  SaleForm,
  TextInput,
  SaleResume,
  PersonForm,
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
    products: [],
    paymentStatus: 'PENDING',
    paymentMethod: 'CASH',
    customer: ''
  });
  const [showProductModal, setShowProductModal] = useState(false);
  const [showCreateCustomerModal, setShowCreateCustomertModal] =
    useState(false);

  const {
    sales: { errors },
    inventory: {
      units: { unitList },
      products: { productList }
    }
  } = useSelector((state) => state);

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
        <NumberFormattedInput displayType="text" value={salePrice || 0} />
      )
    },
    {
      columnName: 'discount',
      columnLabel: 'Descuento',
      columnProps: { align: 'center' },
      cellProps: { align: 'center' },
      render: (discount) => (
        <NumberFormattedInput displayType="text" value={discount || 0} />
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
    dispatch(
      createSale({
        ...data,
        total: getTotal()
      })
    );
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
    setShowProductModal(true);
    setSelectedItem({});
  };

  const handleCloseProductModal = () => {
    setShowProductModal(false);
    setSelectedItem({});
    setSelectedItems([]);
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
    const newProducts = data.products.filter(
      (product, index) => !selectedItems.includes(index)
    );
    setData({ ...data, products: newProducts });
    setSelectedItems([]);
  };

  const handleRedirectToCreateProductPage = () => {
    navigate(PATH_INVENTORY.createProduct);
  };

  const handleShowCreateCustomerModal = () => {
    setShowCreateCustomertModal(true);
  };

  const handleCloseCreateCustomerModal = () => {
    setShowCreateCustomertModal(false);
  };

  const handleCreateCustomerChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, customer: { ...data.customer, [name]: value } });
  };

  const handleCreateCustomerSubmit = () => {
    dispatch(createCustomer(data.customer));
    setShowCreateCustomertModal(false);
    // fetch customers
  };

  return (
    <Page hasBackButton title="Registrar venta" backwardPath={PATH_SALES.root}>
      <Card sx={{ p: 3 }}>
        <SaleForm
          data={data}
          errors={errors}
          onChange={handleChange}
          onCreateCustomer={handleShowCreateCustomerModal}
        />
        <Divider component="div" sx={{ my: 3 }} />
        <Box mt={3} mb={2} display="flex" justifyContent="end">
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
            <SaleResume
              subTotal={getSubtotal()}
              discount={-getDiscount()}
              total={getTotal()}
            />
          </Grid>
        </Grid>
        <Box mt={3} display="flex" justifyContent="end">
          <Button variant="contained" onClick={handleSubmit}>
            Registrar venta
          </Button>
        </Box>
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
          unitOptions={unitList}
          productOptions={productList}
          onCreateProduct={handleRedirectToCreateProductPage}
          onCancel={handleCloseProductModal}
          onSubmit={handleInsertProduct}
        />
      </Modal>
      <Modal
        fullWidth
        maxWidth="md"
        open={showCreateCustomerModal}
        onClose={handleCloseCreateCustomerModal}
      >
        <PersonForm
          data={data.customer}
          // errors={errors}
          submitButtonText="Crear cliente"
          onChange={handleCreateCustomerChange}
          onSubmit={handleCreateCustomerSubmit}
        />
      </Modal>
    </Page>
  );
};

export default CreateSale;
