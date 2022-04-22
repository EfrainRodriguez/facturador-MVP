import React, { useState, useEffect } from 'react';
// router
import { useNavigate } from 'react-router-dom';
// material
import { Card, Button, Box, Typography } from '@mui/material';
// notistack
import { useSnackbar } from 'notistack';
// redux
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchSales,
  setSaleList,
  deleteManySales
} from '../../redux/slices/sales';
// components
import {
  Page,
  Label,
  TableX,
  ActionButtons,
  TableToolbar,
  NumberFormattedInput,
  Modal
} from '../../components';
// paths
import { PATH_SALES } from '../../routes/paths';
// utils
import { paymentStatus } from '../../utils/options';

const Sales = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { saleList } = useSelector((state) => state.sales);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const getPaymentStatusLabel = (data) => {
    const statusColor = {
      PENDING: 'error',
      PAID: 'success'
    };
    const status = paymentStatus.find(
      (thisStatus) => thisStatus.value === data
    );
    return status ? (
      <Label variant="outlined" color={statusColor[status.value]}>
        {status.label}
      </Label>
    ) : (
      ''
    );
  };

  const cellSchema = [
    {
      columnName: 'customer',
      columnLabel: 'Cliente'
    },
    {
      columnName: 'createdAt',
      columnLabel: 'Fecha de venta',
      columnProps: { align: 'center' },
      cellProps: { align: 'center' },
      render: (data) => new Date(data).toLocaleDateString('es-ES')
    },
    {
      columnName: 'total',
      columnLabel: 'Total de venta',
      columnProps: { align: 'center' },
      cellProps: { align: 'center' },
      render: (data, allData = {}) => {
        let saleTotal = 0;
        if (!allData.products)
          return <NumberFormattedInput displayType="text" value={saleTotal} />;
        saleTotal = allData.products.reduce(
          (total, thisData) =>
            total +
            (thisData.salePrice * thisData.amount - (thisData.discount || 0)),
          0
        );
        return <NumberFormattedInput displayType="text" value={saleTotal} />;
      }
    },
    {
      columnName: 'paymentStatus',
      columnLabel: 'Estado de pago',
      columnProps: { align: 'center' },
      cellProps: { align: 'center' },
      render: (data) => getPaymentStatusLabel(data)
    }
  ];

  const handleCreateNewSale = () => {
    navigate(PATH_SALES.createSale);
  };

  const handleSelect = (items) => {
    setSelectedItems(items);
  };

  const handleChangePage = (page) => {
    dispatch(
      fetchSales(`pageNumber=${page + 1}&pageSize=${saleList.pageSize}`)
    ).then((response) => {
      dispatch(setSaleList(response.data && response.data.data));
    });
  };

  const handleRowSelected = (item) => {
    setSelectedItem(item);
  };

  const handleChangeRowsPerPage = (rows) => {
    dispatch(
      fetchSales(`pageNumber=${saleList.pageNumber}&pageSize=${rows}`)
    ).then((response) => {
      dispatch(setSaleList(response.data && response.data.data));
    });
  };

  const handleEditSale = () => {
    if (selectedItem) {
      navigate(`${PATH_SALES.editSaleRoot}/${selectedItem._id}`);
    }
  };

  const handleDeleteSale = () => {
    setIsModalOpen(false);
    if (selectedItems) {
      dispatch(deleteManySales(selectedItems))
        .then(() => {
          if (selectedItems.length > 1) {
            enqueueSnackbar('Ventas eliminadas correctamente', {
              variant: 'success'
            });
          } else {
            enqueueSnackbar('Venta eliminada correctamente', {
              variant: 'success'
            });
          }
          dispatch(fetchSales()).then((response) => {
            dispatch(setSaleList(response.data && response.data.data));
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
    dispatch(fetchSales()).then((response) => {
      dispatch(setSaleList(response.data && response.data.data));
    });
  }, [dispatch]);

  return (
    <Page
      title="Ventas realizadas"
      actions={
        <Button
          type="primary"
          variant="contained"
          size="medium"
          onClick={handleCreateNewSale}
        >
          Nueva venta
        </Button>
      }
    >
      <Card sx={{ pt: 3 }}>
        <TableToolbar
          numSelected={selectedItems.length}
          actions={
            <ActionButtons
              editLabel="Editar venta"
              editProps={{ disabled: selectedItems.length > 1 }}
              deleteLabel={
                selectedItems.length > 1 ? 'Eliminar ventas' : 'Eliminar venta'
              }
              onEdit={handleEditSale}
              onDelete={() => setIsModalOpen(true)}
            />
          }
        />
        <TableX
          hasCollapse
          rowsPerPage={saleList.pageSize}
          page={saleList.pageNumber - 1}
          count={saleList.total}
          selected={selectedItems}
          sourceData={saleList.sales}
          cellSchema={cellSchema}
          onSelect={handleSelect}
          onChangePage={handleChangePage}
          onRowSelected={handleRowSelected}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Card>
      <Modal open={isModalOpen} onCancel={() => setIsModalOpen(false)}>
        <Typography variant="subtitle1">
          Está seguro que desea eliminar la(s) venta(s)
        </Typography>
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="outlined" onClick={() => setIsModalOpen(false)}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleDeleteSale}>
            Confirmar
          </Button>
        </Box>
      </Modal>
    </Page>
  );
};

export default Sales;
