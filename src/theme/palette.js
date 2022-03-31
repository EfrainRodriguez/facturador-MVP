import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

function createGradient(color1, color2) {
  return `linear-gradient(to bottom, ${color1}, ${color2})`;
}

// SETUP COLORS
const PRIMARY = {
  lighter: '#E5DDFA',
  light: '#A896E6',
  main: '#5C49AE',
  dark: '#31247D',
  darker: '#150E53'
};
const SECONDARY = {
  lighter: '#E5DDFA',
  light: '#A896E6',
  main: '#5C49AE',
  dark: '#31247D',
  darker: '#150E53'
};
const INFO = {
  lighter: '#CAFCF5',
  light: '#61EEF1',
  main: '#02AED1',
  dark: '#016696',
  darker: '#003464'
};
const SUCCESS = {
  lighter: '#D0F8CB',
  light: '#62D86D',
  main: '#0C7F2D',
  dark: '#065B2F',
  darker: '#023C2A'
};
const WARNING = {
  lighter: '#FEF8CB',
  light: '#FEE365',
  main: '#FCC500',
  dark: '#B58500',
  darker: '#785300'
};
const ERROR = {
  lighter: '#FDE6D0',
  light: '#F49F71',
  main: '#DD3F18',
  dark: '#9F130C',
  darker: '#6A040E'
};

const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
  500_8: alpha('#919EAB', 0.08),
  500_12: alpha('#919EAB', 0.12),
  500_16: alpha('#919EAB', 0.16),
  500_24: alpha('#919EAB', 0.24),
  500_32: alpha('#919EAB', 0.32),
  500_48: alpha('#919EAB', 0.48),
  500_56: alpha('#919EAB', 0.56),
  500_80: alpha('#919EAB', 0.8)
};

const GRADIENTS = {
  primary: createGradient(PRIMARY.light, PRIMARY.main),
  info: createGradient(INFO.light, INFO.main),
  success: createGradient(SUCCESS.light, SUCCESS.main),
  warning: createGradient(WARNING.light, WARNING.main),
  error: createGradient(ERROR.light, ERROR.main)
};

const COMMON = {
  common: { black: '#000', white: '#fff' },
  primary: { ...PRIMARY, contrastText: '#fff' },
  secondary: { ...SECONDARY, contrastText: '#fff' },
  info: { ...INFO, contrastText: '#fff' },
  success: { ...SUCCESS, contrastText: GREY[800] },
  warning: { ...WARNING, contrastText: GREY[800] },
  error: { ...ERROR, contrastText: '#fff' },
  grey: GREY,
  gradients: GRADIENTS,
  divider: GREY[500_24],
  action: {
    hover: GREY[500_8],
    selected: GREY[500_16],
    disabled: GREY[500_80],
    disabledBackground: GREY[500_24],
    focus: GREY[500_24],
    hoverOpacity: 0.08,
    disabledOpacity: 0.48
  }
};

const palette = {
  light: {
    ...COMMON,
    text: {
      primary: GREY[800],
      secondary: GREY[600],
      disabled: GREY[500],
      purpleContrast: '#fff'
    },
    background: {
      paper: '#fff',
      default: '#fff',
      neutral: GREY[200],
      purple: '#5C49AE'
    },
    action: { active: GREY[600], ...COMMON.action }
  },
  dark: {
    ...COMMON,
    text: { primary: '#fff', secondary: GREY[500], disabled: GREY[600] },
    background: { paper: GREY[800], default: GREY[900], neutral: GREY[500_16] },
    action: { active: GREY[500], ...COMMON.action }
  }
};

export default palette;
