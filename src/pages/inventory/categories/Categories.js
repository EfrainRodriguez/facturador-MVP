import React, { useState } from 'react';
// router
import { useNavigate } from 'react-router-dom';
// redux
import { useSelector } from 'react-redux';
// material
import { Card, Button, Typography } from '@mui/material';
// components
import { Page, TableX, ActionButtons, TableToolbar } from '../../../components';
// paths
import { PATH_INVENTORY } from '../../../routes/paths';

const Categories = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const { categoryList } = useSelector((state) => state.inventory.categories);

  const navigate = useNavigate();

  const cellSchema = [
    {
      columnName: 'name',
      columnLabel: 'Nombre',
      render: (data) => <Typography>{data}</Typography>
    },
    {
      columnName: 'father',
      columnLabel: 'Categoria padre',
      render: (data) => <Typography>{data}</Typography>
    },
    {
      columnName: 'status',
      columnLabel: 'Status',
      columnProps: { align: 'center' },
      cellProps: { align: 'center' },
      render: (data) => <Typography>{data}</Typography>
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
      navigate(`${PATH_INVENTORY.editCategoryRoot}/${selectedItem.id}`);
    }
  };

  const handleDeleteCategory = () => {};

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
          sourceData={categoryList}
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
