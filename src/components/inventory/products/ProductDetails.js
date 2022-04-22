import React from 'react';
// prop types
import PropTypes from 'prop-types';
// material ui
import {
  Box,
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material';

const ProductDetails = ({ data = {}, units = [] }) => {
  const getUnit = (unitId) => {
    const unit = units.find((item) => item._id === unitId);
    return unit ? unit.name : '';
  };
  return (
    <Box mt={4} mb={4} display="flex" justifyContent="center">
      <Card sx={{ width: '75%', py: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Unidad</TableCell>
              <TableCell align="center">Marca</TableCell>
              <TableCell align="center">Referencia</TableCell>
              <TableCell>Descripción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                {getUnit(data.unit)}
              </TableCell>
              <TableCell align="center">{data.brand}</TableCell>
              <TableCell align="center">{data.code}</TableCell>
              <TableCell colSpan={12}>{data.description}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </Box>
  );
};

ProductDetails.propTypes = {
  data: PropTypes.object,
  units: PropTypes.array
};

export default ProductDetails;
