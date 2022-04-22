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
  fetchUnits,
  setUnitList,
  deleteManyUnits
} from '../../../redux/slices/inventory/units';
// components
import { Page, TableX, ActionButtons, TableToolbar } from '../../../components';
// paths
import { PATH_INVENTORY } from '../../../routes/paths';

const Units = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const { unitList } = useSelector((state) => state.inventory.units);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

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
      navigate(`${PATH_INVENTORY.editUnitRoot}/${selectedItem._id}`);
    }
  };

  const handleDeleteUnit = () => {
    if (selectedItems) {
      dispatch(deleteManyUnits(selectedItems))
        .then(() => {
          if (selectedItems.length > 1) {
            enqueueSnackbar(`Se eliminaron ${selectedItems.length} unidades`, {
              variant: 'success'
            });
          } else {
            enqueueSnackbar(`Se eliminó la unidad ${selectedItems[0].name}`, {
              variant: 'success'
            });
          }
          dispatch(fetchUnits()).then((response) => {
            dispatch(setUnitList(response.data && response.data.data));
            setSelectedItems([]);
            setSelectedItem(null);
          });
        })
        .catch((error) => {
          enqueueSnackbar(error.message, {
            variant: 'error'
          });
        });
    }
  };

  useEffect(() => {
    dispatch(fetchUnits()).then((response) => {
      dispatch(setUnitList(response.data && response.data.data));
    });
  }, [dispatch]);

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
          sourceData={unitList.units}
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
