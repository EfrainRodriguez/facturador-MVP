import React, { useState, useEffect } from 'react';
// router
import { useNavigate } from 'react-router-dom';
// material
import { Card, Button } from '@mui/material';
// notistack
import { useSnackbar } from 'notistack';
// redux
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchCategories,
  setCategoryList,
  deleteManyCategories
} from '../../../redux/slices/inventory/categories';
// components
import { Page, TableX, ActionButtons, TableToolbar } from '../../../components';
// paths
import { PATH_INVENTORY } from '../../../routes/paths';

const Categories = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const { categoryList } = useSelector((state) => state.inventory.categories);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const cellSchema = [
    {
      columnName: 'name',
      columnLabel: 'Nombre'
    },
    {
      columnName: 'parent',
      columnLabel: 'Categoria padre',
      render: (item) => {
        const category = categoryList.categories.find(
          (thisCategory) => thisCategory._id === item
        );
        return category ? category.name : 'Sin categoria padre';
      }
    },
    {
      columnName: 'description',
      columnLabel: 'Descripción'
    },
    {
      columnName: 'status',
      columnLabel: 'Status',
      columnProps: { align: 'center' },
      cellProps: { align: 'center' }
    }
  ];

  const handleCreateNewProduct = () => {
    navigate(PATH_INVENTORY.createCategory);
  };

  const handleSelect = (items) => {
    setSelectedItems(items);
  };

  const handleChangePage = () => {};

  const handleRowSelected = (item) => {
    setSelectedItem(item);
  };

  const handleChangeRowsPerPage = () => {};

  const handleEditCategory = () => {
    if (selectedItem) {
      navigate(`${PATH_INVENTORY.editCategoryRoot}/${selectedItem._id}`);
    }
  };

  const handleDeleteCategory = () => {
    if (selectedItems) {
      dispatch(deleteManyCategories(selectedItems))
        .then(() => {
          if (selectedItems.length > 1) {
            enqueueSnackbar(
              `Se eliminaron ${selectedItems.length} categorias`,
              {
                variant: 'success'
              }
            );
          } else {
            enqueueSnackbar(
              `Se elimino la categoria ${selectedItems[0].name}`,
              {
                variant: 'success'
              }
            );
          }
          dispatch(fetchCategories()).then((response) => {
            dispatch(setCategoryList(response.data && response.data.data));
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
    dispatch(fetchCategories()).then((response) => {
      dispatch(setCategoryList(response.data.data));
    });
  }, [dispatch]);

  return (
    <Page
      title="Categories de productos"
      actions={
        <Button
          type="primary"
          variant="contained"
          size="medium"
          onClick={handleCreateNewProduct}
        >
          Nueva categoria
        </Button>
      }
    >
      <Card sx={{ pt: 3 }}>
        <TableToolbar
          numSelected={selectedItems.length}
          actions={
            <ActionButtons
              editLabel="Editar categoria"
              editProps={{ disabled: selectedItems.length > 1 }}
              deleteLabel={
                selectedItems.length > 1
                  ? 'Eliminar categorias'
                  : 'Eliminar categoria'
              }
              onEdit={handleEditCategory}
              onDelete={handleDeleteCategory}
            />
          }
        />
        <TableX
          selected={selectedItems}
          sourceData={categoryList.categories}
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

export default Categories;
