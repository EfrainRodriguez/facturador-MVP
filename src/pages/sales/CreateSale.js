import React, { useState, useEffect } from 'react';
// router
// import { useNavigate } from 'react-router-dom';
// material
import {
  Box,
  Grid,
  Card,
  Tooltip,
  IconButton,
  Typography
} from '@mui/material';
import { AddCircle } from '@mui/icons-material';
// notistack
// import { useSnackbar } from 'notistack';
// redux
import { useDispatch, useSelector } from 'react-redux';
// import { createSale } from '../../redux/slices/sales';
import {
  fetchProducts,
  setProductList,
  fetchProductByNameAutocomplete
} from '../../redux/slices/inventory/products';
import { fetchUnits, setUnitList } from '../../redux/slices/inventory/units';
// components
import {
  Page,
  SaleForm,
  ScrollBar,
  SaleResume,
  SaleProductList
} from '../../components';
// paths
import { PATH_SALES } from '../../routes/paths';
// utils
import { normalizeCurrency } from '../../utils/formatters';

const CreateSale = () => {
  // STATE -----------------------------------------------------
  const [data, setData] = useState({
    createdAt: new Date(),
    products: [
      {
        amountSold: 1
      }
    ],
    paymentStatus: 'PAID',
    paymentMethod: 'CASH',
    customer: ''
  });

  const [productsFromSearch, setProductsFromSearch] = useState({
    list: [],
    index: 0,
    isLoading: false
  });

  const {
    sales: { errors }
    // inventory: {
    //   units: { unitList }
    // }
  } = useSelector((state) => state);

  // HOOKS -----------------------------------------------------
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const { enqueueSnackbar } = useSnackbar();

  // OTHER FUNCTIONS -------------------------------------------
  // const removeEmptyProducts = (products) =>
  //   products.filter((product = {}) => Object.keys(product).length > 0);

  const appendRowData = (product, rowIndex) => {
    const allProducts = [...data.products];
    allProducts[rowIndex] = {
      ...allProducts[rowIndex],
      ...product
    };
    setData({ ...data, products: allProducts });
  };

  const getSubtotal = () =>
    data.products.reduce((acc, curr) => {
      const salePrice = normalizeCurrency(curr.salePrice) || 0;
      const amount = Number(curr.amount) || 0;
      return acc + salePrice * amount;
    }, 0);

  const getDiscount = () =>
    data.products.reduce((acc, curr) => {
      const discount = normalizeCurrency(curr.discount) || 0;
      return acc + discount;
    }, 0);

  const getTotal = () => getSubtotal() - getDiscount();

  // HANDLERS --------------------------------------------------

  const handleChangeRowData = (event, rowIndex) => {
    const { name, value } = event.target;
    const products = [...data.products];
    products[rowIndex][name] = value;
    setData({ ...data, products });
  };

  const handleDeleteProduct = (rowIndex) => {
    const products = [...data.products];
    if (products.length === 1) {
      products[rowIndex] = {};
    } else {
      products.splice(rowIndex, 1);
    }
    setData({ ...data, products });
  };

  const handleAddProduct = () => {
    setData({
      ...data,
      products: [
        ...data.products,
        {
          amountSold: 1
        }
      ]
    });
  };

  const handleSearchProductByCode = (barCode, rowIndex) => {
    dispatch(fetchProducts(`barCode=${barCode}`)).then((response) => {
      if (
        response.data &&
        response.data.data.products &&
        response.data.data.products.length > 0
      ) {
        appendRowData(response.data.data.products[0], rowIndex);
        const products = [...data.products];
        products[rowIndex] = {
          ...products[rowIndex],
          ...response.data.data.products[0]
        };
        products[rowIndex + 1] = {
          amountSold: 1
        };
        setData({ ...data, products });
      }
    });
  };

  const handleSearchProductByName = (event, inputValue, rowIndex) => {
    setProductsFromSearch({
      ...productsFromSearch,
      isLoading: true,
      index: rowIndex
    });
    if (inputValue.length > 3) {
      dispatch(fetchProductByNameAutocomplete(`name=${inputValue}`))
        .then((response) => {
          if (
            response.data &&
            response.data.data &&
            response.data.data.length > 0
          ) {
            setProductsFromSearch({
              ...productsFromSearch,
              list: response.data.data,
              isLoading: false
            });
          }
        })
        .catch(() => {
          setProductsFromSearch({
            ...productsFromSearch,
            list: [],
            isLoading: false
          });
        });
    }
  };

  const handleSelectProductFromSearch = (e, product, rowIndex) => {
    const products = [...data.products];
    products[rowIndex] = {
      ...products[rowIndex],
      ...product
    };
    setData({ ...data, products });
    setProductsFromSearch({
      ...productsFromSearch,
      list: [],
      isLoading: false
    });
  };

  // const handleSubmit = () => {
  //   dispatch(
  //     createSale({
  //       ...data,
  //       products: removeEmptyProducts(data.products)
  //     })
  //   ).then(() => {
  //     navigate(PATH_SALES.root);
  //     enqueueSnackbar('Venta registrada!', { variant: 'success' });
  //   });
  // };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    dispatch(fetchProducts()).then((response) => {
      dispatch(setProductList(response.data && response.data.data));
    });
    dispatch(fetchUnits()).then((response) => {
      dispatch(setUnitList(response.data && response.data.data));
    });
  }, [dispatch]);

  return (
    <Page hasBackButton title="Registrar venta" backwardPath={PATH_SALES.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2, mb: 2 }}>
            <SaleForm data={data} errors={errors} onChange={handleChange} />
          </Card>
          <Card sx={{ p: 2, pb: 0 }}>
            <SaleResume
              subTotal={getSubtotal()}
              discount={-getDiscount()}
              total={getTotal()}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card sx={{ py: 2, px: 0 }}>
            <Box
              px={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="subtitle1" textAlign="center">
                Lista de productos
              </Typography>
              <Tooltip placement="top" title="Agregar producto">
                <IconButton variant="contained" onClick={handleAddProduct}>
                  <AddCircle fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
            <ScrollBar style={{ maxHeight: 370 }}>
              <SaleProductList
                products={data.products}
                productsFromSearch={productsFromSearch}
                onChange={handleChangeRowData}
                onDeleteItem={handleDeleteProduct}
                onSearchItemByCode={handleSearchProductByCode}
                onSearchItemByName={handleSearchProductByName}
                onSelectProductFromSearch={handleSelectProductFromSearch}
              />
            </ScrollBar>
          </Card>
        </Grid>
      </Grid>
    </Page>
  );
};

export default CreateSale;
