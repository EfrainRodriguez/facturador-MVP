import React, { useState } from 'react';
// prop types
import PropTypes from 'prop-types';
// lodash
import { filter } from 'lodash';
// material
import {
  Box,
  Table,
  Collapse,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  IconButton,
  TablePagination
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
// custom components
import TableHeadX from './TableHeadX';

// ----------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  if (query) {
    return filter(
      array,
      (_product) =>
        _product.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }

  return stabilizedThis.map((el) => el[0]);
}

// ----------------------------------------------------------

const Row = ({
  row,
  rowIndex,
  renderRowDetails,
  hasCheckbox,
  hasCollapse,
  isItemSelected,
  cellSchema = [],
  onSelectedRow
}) => {
  const [open, setOpen] = useState(false);
  const handleSelectedRow = (event) =>
    onSelectedRow && onSelectedRow(event, rowIndex, row);
  return (
    <>
      <TableRow
        hover
        key={rowIndex}
        tabIndex={-1}
        role="checkbox"
        selected={isItemSelected}
        sx={{ cursor: 'pointer' }}
        aria-checked={isItemSelected}
        onClick={(event) => handleSelectedRow(event)}
      >
        {hasCheckbox && (
          <TableCell padding="checkbox">
            <Checkbox checked={isItemSelected} />
          </TableCell>
        )}
        {hasCollapse && (
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </TableCell>
        )}
        {cellSchema.map((item, cellIndex) => (
          <TableCell key={cellIndex} {...item.cellProps}>
            {item.render
              ? item.render(row[item.columnName], row, rowIndex)
              : row[item.columnName]}
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {renderRowDetails && renderRowDetails(row)}
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

Row.propTypes = {
  row: PropTypes.object,
  rowIndex: PropTypes.number,
  renderRowDetails: PropTypes.func,
  cellSchema: PropTypes.array,
  hasCheckbox: PropTypes.bool,
  hasCollapse: PropTypes.bool,
  isItemSelected: PropTypes.bool,
  onSelectedRow: PropTypes.func
};

const TableX = ({
  count = 0,
  page = 0,
  renderRowDetails,
  rowsPerPage = 10,
  selected = [],
  pageLimits = [5, 10, 15, 20],
  sourceData = [],
  cellSchema = [],
  hasCheckbox = true,
  hasPagination = true,
  hasCollapse = false,
  onSelect,
  onRowSelected,
  onChangeRowsPerPage,
  onChangePage
}) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');

  const filteredProducts = applySortFilter(
    sourceData,
    getComparator(order, orderBy),
    ''
  );

  // const emptyRows =
  //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - sourceData.length) : 0;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = sourceData.map((n) => n);
      return onSelect && onSelect(newSelecteds);
    }
    return onSelect && onSelect([]);
  };

  const handleSelected = (event, name, rowData) => {
    const selectedIndex = selected.indexOf(rowData);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, rowData);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    return onSelect && onSelect(newSelected);
  };

  const handleSelectedRow = (event, name, rowData) => {
    handleSelected(event, name, rowData);
    return onRowSelected && onRowSelected(rowData);
  };

  const handleChangePage = (event, newPage) =>
    onChangePage && onChangePage(newPage);

  const handleChangeRowsPerPage = (event) =>
    onChangeRowsPerPage && onChangeRowsPerPage(event.target.value);

  return (
    <>
      <Table>
        <TableHeadX
          order={order}
          orderBy={orderBy}
          headLabel={cellSchema}
          hasCheckbox={hasCheckbox}
          hasCollapse={hasCollapse}
          rowCount={sourceData.length}
          numSelected={selected.length}
          onRequestSort={handleRequestSort}
          onSelectAllClick={handleSelectAllClick}
        />
        <TableBody>
          {filteredProducts.map((row, rowIndex) => {
            const isItemSelected = selected.indexOf(row) !== -1;
            return (
              <Row
                row={row}
                key={rowIndex}
                rowIndex={rowIndex}
                renderRowDetails={renderRowDetails}
                cellSchema={cellSchema}
                hasCheckbox={hasCheckbox}
                hasCollapse={hasCollapse}
                isItemSelected={isItemSelected}
                onSelectedRow={handleSelectedRow}
              />
            );
          })}
          {/* {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )} */}
        </TableBody>
        {sourceData.length < 1 && (
          <TableBody>
            <TableRow>
              <TableCell align="center" colSpan={12}>
                <Box sx={{ py: 3 }}>
                  <Typography>No existen datos para mostrar</Typography>
                </Box>
              </TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>
      {hasPagination && (
        <TablePagination
          labelRowsPerPage="Ítems por página:"
          rowsPerPageOptions={pageLimits}
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </>
  );
};

TableX.propTypes = {
  count: PropTypes.number,
  page: PropTypes.number,
  renderRowDetails: PropTypes.func,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
  pageLimits: PropTypes.array,
  sourceData: PropTypes.array.isRequired,
  cellSchema: PropTypes.array.isRequired,
  hasCheckbox: PropTypes.bool,
  hasPagination: PropTypes.bool,
  hasCollapse: PropTypes.bool,
  onSelect: PropTypes.func,
  onRowSelected: PropTypes.func,
  onChangeRowsPerPage: PropTypes.func,
  onChangePage: PropTypes.func
};

export default TableX;
