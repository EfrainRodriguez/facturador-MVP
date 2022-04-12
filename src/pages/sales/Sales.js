import React, { useState } from 'react';
// router
import { useNavigate } from 'react-router-dom';
// redux
import { useSelector } from 'react-redux';
// material
import { Card, Button } from '@mui/material';
// components
import {
  Page,
  Label,
  TableX,
  ActionButtons,
  TableToolbar,
  NumberFormattedInput
} from '../../components';
// paths
import { PATH_SALES } from '../../routes/paths';
// utils
import { paymentStatus } from '../../utils/options';

const Sales = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const { saleList } = useSelector((state) => state.sales);

  const navigate = useNavigate();

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
      render: (data) => (
        <NumberFormattedInput displayType="text" value={data || 0} />
      )
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

  const handleChangePage = () => {};

  const handleRowSelected = (item) => {
    setSelectedItem(item);
  };

  const handleChangeRowsPerPage = () => {};

  const handleEditSale = () => {
    if (selectedItem) {
      navigate(`${PATH_SALES.editSaleRoot}/${selectedItem.id}`);
    }
  };

  const handleDeleteSale = () => {};

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
              onDelete={handleDeleteSale}
            />
          }
        />
        <TableX
          hasCollapse
          selected={selectedItems}
          sourceData={saleList}
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

export default Sales;
