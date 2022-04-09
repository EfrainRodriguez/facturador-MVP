// import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Backdrop() {
  // const varLow = alpha(theme.palette.grey[900], 0.48);
  // const varHigh = alpha(theme.palette.grey[900], 1);

  return {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.75)',
          // background: [
          //   `rgb(22,28,36)`,
          //   `-moz-linear-gradient(75deg, ${varLow} 0%, ${varHigh} 100%)`,
          //   `-webkit-linear-gradient(75deg, ${varLow} 0%, ${varHigh} 100%)`,
          //   `linear-gradient(75deg, ${varLow} 0%, ${varHigh} 100%)`
          // ],
          '&.MuiBackdrop-invisible': {
            background: 'transparent'
          }
        }
      }
    }
  };
}
