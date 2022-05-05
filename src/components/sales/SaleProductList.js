import React from 'react';
// prop types
import PropTypes from 'prop-types';
// material
import {
  Box,
  Grid,
  Card,
  Divider,
  IconButton,
  Tooltip,
  InputAdornment,
  TextField,
  Autocomplete
} from '@mui/material';
import { Delete, Search } from '@mui/icons-material';
// components
import TextInput from '../TextInput';
import NumberFormattedInput from '../NumberFormattedInput';
// utils
import { normalizeCurrency } from '../../utils/formatters';

const SaleProductList = ({
  products = [],
  productsFromSearch = {},
  onChange,
  onDeleteItem,
  onSearchItemByCode,
  onSearchItemByName,
  onSelectProductFromSearch
}) => {
  const handleChange = (event, index) => onChange && onChange(event, index);
  const handleDeleteItem = (index) => onDeleteItem && onDeleteItem(index);
  const handleSearchItemByCode = (code, index) =>
    onSearchItemByCode && onSearchItemByCode(code, index);
  const handleSearchItemByName = (e, inputValue, index) =>
    onSearchItemByName && onSearchItemByName(e, inputValue, index);
  const handleSelectProductFromSearch = (e, value, index) =>
    onSelectProductFromSearch && onSelectProductFromSearch(e, value, index);
  return (
    <Box>
      {products.map((product, index) => (
        <Card key={index} sx={{ p: 1, px: 2, pb: 2, m: 2 }}>
          <Divider sx={{ mb: 1 }}>
            <strong>Producto {index + 1}</strong>
          </Divider>
          <Grid container spacing={1}>
            <Grid item xs={12} md={5}>
              <TextInput
                autoFocus
                name="barCode"
                label="Código de barras"
                value={product.barCode || ''}
                sx={{ mb: 1 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton
                        edge="end"
                        onClick={() =>
                          handleSearchItemByCode(product.barCode, index)
                        }
                      >
                        <Search fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSearchItemByCode(product.barCode, index);
                  }
                }}
                onChange={(e) => handleChange(e, index)}
              />
              <Autocomplete
                name="name"
                value={product}
                inputValue={product.name}
                onChange={(e, value) =>
                  handleSelectProductFromSearch(e, value, index)
                }
                isOptionEqualToValue={(option, value) =>
                  option._id === value._id
                }
                getOptionLabel={(option) => option.name || ''}
                onInputChange={(e, inputValue) =>
                  handleSearchItemByName(e, inputValue, index)
                }
                options={
                  productsFromSearch.index === index
                    ? productsFromSearch.list
                    : []
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    label="Buscar producto"
                    placeholder="Busque el producto por nombre"
                  />
                )}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <TextInput
                type="number"
                name="amountSold"
                sx={{ mb: 1 }}
                label="Cantidad"
                value={product.amountSold || ''}
                onChange={(e) => handleChange(e, index)}
              />
              <NumberFormattedInput
                name="discount"
                label="Descuento"
                value={product.discount || ''}
                onChange={(e) => handleChange(e, index)}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <NumberFormattedInput
                sx={{ mb: 1 }}
                name="salePrice"
                label="Precio de venta"
                value={product.salePrice || ''}
                onChange={(e) => handleChange(e, index)}
              />
              <NumberFormattedInput
                name="total"
                label="Total"
                disabled
                value={
                  (normalizeCurrency(product.salePrice) || 0) *
                    (Number(product.amountSold) || 0) -
                    (normalizeCurrency(product.discount) || 0) || ''
                }
                onChange={(e) => handleChange(e, index)}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={1}
              display="flex"
              justifyContent="end"
              alignItems="center"
            >
              <Tooltip placement="top" title="Eliminar item">
                <IconButton onClick={() => handleDeleteItem(index)}>
                  <Delete fontSize="small" />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Card>
      ))}
    </Box>
  );
};

SaleProductList.propTypes = {
  products: PropTypes.array,
  productsFromSearch: PropTypes.object,
  onChange: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onSearchItemByCode: PropTypes.func,
  onSearchItemByName: PropTypes.func,
  onSelectProductFromSearch: PropTypes.func
};

export default SaleProductList;
