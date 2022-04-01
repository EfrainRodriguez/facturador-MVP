import PropTypes from 'prop-types';
// material
import { useTheme, experimentalStyled as styled } from '@mui/material/styles';
import { Toolbar, Typography } from '@mui/material';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 0, 0, 0),
  margin: 0
}));

// ----------------------------------------------------------------------

const TableToolbar = ({ filters, actions, numSelected }) => {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: isLight ? 'primary.main' : 'text.primary',
          bgcolor: isLight ? 'primary.lighter' : 'primary.dark'
        }),
        display: filters || numSelected > 0 ? 'flex' : 'none'
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} {numSelected > 1 ? 'seleccionados' : 'seleccionado'}
        </Typography>
      ) : (
        filters
      )}

      {numSelected > 0 && actions}
    </RootStyle>
  );
};

TableToolbar.propTypes = {
  filters: PropTypes.node,
  actions: PropTypes.node,
  numSelected: PropTypes.number
};

export default TableToolbar;
