import React, { useState } from 'react';
// router
import { useNavigate } from 'react-router-dom';
// redux
import { useSelector } from 'react-redux';
// material
import { Card, Button } from '@mui/material';
// components
import { Page, TableX, ActionButtons, TableToolbar } from '../../../components';
// paths
import { PATH_INVENTORY } from '../../../routes/paths';

const Units = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const { unitList } = useSelector((state) => state.inventory.units);

  const navigate = useNavigate();

  const cellSchema = [
    {
      columnName: 'name',
      columnLabel: 'Nombre'
    },
    {
      columnName: 'description',
      columnLabel: 'Descripción'
    }
  ];

  const handleCreateNewUnit = () => {
    navigate(PATH_INVENTORY.createUnit);
  };

  const handleSelect = (items) => {
    setSelectedItems(items);
  };

  const handleChangePage = () => {};

  const handleRowSelected = (item) => {
    setSelectedItem(item);
  };

  const handleChangeRowsPerPage = () => {};

  const handleEditUnit = () => {
    if (selectedItem) {
      navigate(`${PATH_INVENTORY.editUnitRoot}/${selectedItem.id}`);
    }
  };

  const handleDeleteUnit = () => {};

  return (
    <Page
      title="Unidades de medida"
      actions={
        <Button
          type="primary"
          variant="contained"
          size="medium"
          onClick={handleCreateNewUnit}
        >
          Nueva unidad
        </Button>
      }
    >
      <Card sx={{ pt: 3 }}>
        <TableToolbar
          numSelected={selectedItems.length}
          actions={
            <ActionButtons
              editLabel="Editar unidad"
              editProps={{ disabled: selectedItems.length > 1 }}
              deleteLabel={
                selectedItems.length > 1
                  ? 'Eliminar unidades'
                  : 'Eliminar unidad'
              }
              onEdit={handleEditUnit}
              onDelete={handleDeleteUnit}
            />
          }
        />
        <TableX
          selected={selectedItems}
          sourceData={unitList}
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

export default Units;
