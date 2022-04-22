import React, { useState, useEffect } from 'react';
// router
import { useNavigate } from 'react-router-dom';
// material
import { Card, Button, Typography, Box } from '@mui/material';
// notistack
import { useSnackbar } from 'notistack';
// redux
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchProducts,
  setProductList,
  deleteManyProducts
} from '../../../redux/slices/inventory/products';
import {
  fetchCategories,
  setCategoryList
} from '../../../redux/slices/inventory/categories';
import { fetchUnits, setUnitList } from '../../../redux/slices/inventory/units';
// components
import {
  Page,
  TableX,
  ActionButtons,
  ProductDetails,
  TableToolbar,
  NumberFormattedInput,
  Modal
} from '../../../components';
// paths
import { PATH_INVENTORY } from '../../../routes/paths';

const Products = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    products: { productList },
    categories: { categoryList },
    units: { unitList }
  } = useSelector((state) => state.inventory);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

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
      cellProps: { align: 'center' },
      render: (data) => {
        const category = categoryList.categories.find(
          (thisCategory) => thisCategory._id === data
        );
        return category ? category.name : 'Sin categoria';
      }
    }
  ];

  const handleCreateNewProduct = () => {
    navigate(PATH_INVENTORY.createProduct);
  };

  const handleSelect = (items) => {
    setSelectedItems(items);
  };

  const handleChangePage = (page) => {
    dispatch(
      fetchProducts(`pageNumber=${page + 1}&pageSize=${unitList.pageSize}`)
    ).then((response) => {
      dispatch(setProductList(response.data && response.data.data));
    });
  };

  const handleRowSelected = (item) => {
    setSelectedItem(item);
  };

  const handleChangeRowsPerPage = (rows) => {
    dispatch(
      fetchProducts(`pageNumber=${unitList.pageNumber}&pageSize=${rows}`)
    ).then((response) => {
      dispatch(setProductList(response.data && response.data.data));
    });
  };

  const handleEditProduct = () => {
    if (selectedItem) {
      navigate(`${PATH_INVENTORY.editProductRoot}/${selectedItem._id}`);
    }
  };

  const handleDeleteProduct = () => {
    setIsModalOpen(false);
    if (selectedItems) {
      dispatch(deleteManyProducts(selectedItems))
        .then(() => {
          if (selectedItems.length > 1) {
            enqueueSnackbar('Productos eliminados correctamente', {
              variant: 'success'
            });
          } else {
            enqueueSnackbar('Producto eliminado correctamente', {
              variant: 'success'
            });
          }
          dispatch(fetchProducts()).then((response) => {
            dispatch(setProductList(response.data && response.data.data));
            setSelectedItems([]);
            setSelectedItem(null);
          });
        })
        .catch((error) => {
          enqueueSnackbar(error.data.message, {
            variant: 'error'
          });
        });
    }
  };

  useEffect(() => {
    dispatch(fetchProducts()).then((response) => {
      dispatch(setProductList(response.data.data));
    });
    dispatch(fetchCategories()).then((response) => {
      dispatch(setCategoryList(response.data.data));
    });
    dispatch(fetchUnits()).then((response) => {
      dispatch(setUnitList(response.data.data));
    });
  }, [dispatch]);

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
              onDelete={() => setIsModalOpen(true)}
            />
          }
        />
        <TableX
          hasCollapse
          renderRowDetails={(item) => (
            <ProductDetails data={item} units={unitList.units} />
          )}
          rowsPerPage={productList.pageSize}
          page={productList.pageNumber - 1}
          count={productList.total}
          selected={selectedItems}
          sourceData={productList.products}
          cellSchema={cellSchema}
          onSelect={handleSelect}
          onChangePage={handleChangePage}
          onRowSelected={handleRowSelected}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Card>
      <Modal open={isModalOpen} onCancel={() => setIsModalOpen(false)}>
        <Typography variant="subtitle1">
          Está seguro que desea eliminar el(los) producto(s)
        </Typography>
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="outlined" onClick={() => setIsModalOpen(false)}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleDeleteProduct}>
            Confirmar
          </Button>
        </Box>
      </Modal>
    </Page>
  );
};

export default Products;
