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

const Employees = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const { employeeList } = useSelector((state) => state.persons.employees);

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

  const handleCreateNewEmployee = () => {
    navigate(PATH_PERSONS.createEmployee);
  };

  const handleSelect = (items) => {
    setSelectedItems(items);
  };

  const handleChangePage = () => {};

  const handleRowSelected = (item) => {
    setSelectedItem(item);
  };

  const handleChangeRowsPerPage = () => {};

  const handleEditEmployee = () => {
    if (selectedItem) {
      navigate(`${PATH_PERSONS.editEmployeeRoot}/${selectedItem.id}`);
    }
  };

  const handleDeleteEmployee = () => {};

  return (
    <Page
      title="Empleados"
      actions={
        <Button
          type="primary"
          variant="contained"
          size="medium"
          onClick={handleCreateNewEmployee}
        >
          Nuevo empleado
        </Button>
      }
    >
      <Card sx={{ pt: 3 }}>
        <TableToolbar
          numSelected={selectedItems.length}
          actions={
            <ActionButtons
              editLabel="Editar empleado"
              editProps={{ disabled: selectedItems.length > 1 }}
              deleteLabel={
                selectedItems.length > 1
                  ? 'Eliminar empleados'
                  : 'Eliminar empleado'
              }
              onEdit={handleEditEmployee}
              onDelete={handleDeleteEmployee}
            />
          }
        />
        <TableX
          selected={selectedItems}
          sourceData={employeeList}
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

export default Employees;
