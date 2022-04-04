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
import { PATH_PERSONS } from '../../../routes/paths';

const Providers = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const { providerList } = useSelector((state) => state.persons.providers);

  const navigate = useNavigate();

  const cellSchema = [
    {
      columnName: 'firstName',
      columnLabel: 'Nombre',
      render: (data) => <Typography>{data}</Typography>
    },
    {
      columnName: 'lastName',
      columnLabel: 'Apellido',
      render: (data) => <Typography>{data}</Typography>
    },
    {
      columnName: 'documentNumber',
      columnLabel: 'Documento',
      columnProps: { align: 'center' },
      cellProps: { align: 'center' },
      render: (data) => <Typography>{data}</Typography>
    },
    {
      columnName: 'email',
      columnLabel: 'E-mail',
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

  const handleCreateNewCustomer = () => {
    navigate(PATH_PERSONS.createProvider);
  };

  const handleSelect = (items) => {
    setSelectedItems(items);
  };

  const handleChangePage = () => {};

  const handleRowSelected = (item) => {
    setSelectedItem(item);
  };

  const handleChangeRowsPerPage = () => {};

  const handleEditCustomer = () => {
    if (selectedItem) {
      navigate(`${PATH_PERSONS.editProviderRoot}/${selectedItem.id}`);
    }
  };

  const handleDeleteProduct = () => {};

  return (
    <Page
      title="Proveedores"
      actions={
        <Button
          type="primary"
          variant="contained"
          size="medium"
          onClick={handleCreateNewCustomer}
        >
          Nuevo proveedor
        </Button>
      }
    >
      <Card sx={{ pt: 3 }}>
        <TableToolbar
          numSelected={selectedItems.length}
          actions={
            <ActionButtons
              editLabel="Editar proveedor"
              editProps={{ disabled: selectedItems.length > 1 }}
              deleteLabel={
                selectedItems.length > 1
                  ? 'Eliminar proveedors'
                  : 'Eliminar proveedor'
              }
              onEdit={handleEditCustomer}
              onDelete={handleDeleteProduct}
            />
          }
        />
        <TableX
          selected={selectedItems}
          sourceData={providerList}
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

export default Providers;
