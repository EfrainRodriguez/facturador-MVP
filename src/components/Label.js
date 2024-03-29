import PropTypes from 'prop-types';
// material
import { alpha, experimentalStyled as styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

const RootStyle = styled('span')(({ theme, styleProps }) => {
  const isLight = theme.palette.mode === 'light';
  const { color, variant } = styleProps;

  const styleFilled = (thisColor) => ({
    color: theme.palette[thisColor].contrastText,
    backgroundColor: theme.palette[thisColor].main
  });

  const styleOutlined = (thisColor) => ({
    color: theme.palette[thisColor].main,
    backgroundColor: 'transparent',
    border: `1px solid ${theme.palette[thisColor].main}`
  });

  const styleGhost = (thisColor) => ({
    color: theme.palette[thisColor][isLight ? 'dark' : 'light'],
    backgroundColor: alpha(theme.palette[thisColor].main, 0.16)
  });

  return {
    height: 22,
    minWidth: 22,
    lineHeight: 0,
    borderRadius: 8,
    cursor: 'default',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    display: 'inline-flex',
    justifyContent: 'center',
    padding: theme.spacing(0, 1),
    color: theme.palette.grey[800],
    fontSize: theme.typography.pxToRem(12),
    fontFamily: theme.typography.fontFamily,
    backgroundColor: theme.palette.grey[300],
    fontWeight: theme.typography.fontWeightBold,

    ...(color !== 'default'
      ? {
          ...(variant === 'filled' && { ...styleFilled(color) }),
          ...(variant === 'outlined' && { ...styleOutlined(color) }),
          ...(variant === 'ghost' && { ...styleGhost(color) })
        }
      : {
          ...(variant === 'outlined' && {
            backgroundColor: 'transparent',
            color: theme.palette.text.primary,
            border: `1px solid ${theme.palette.grey[500_32]}`
          }),
          ...(variant === 'ghost' && {
            color: isLight
              ? theme.palette.text.secondary
              : theme.palette.common.white,
            backgroundColor: theme.palette.grey[500_16]
          })
        })
  };
});

// ----------------------------------------------------------------------

const Label = ({
  color = 'default',
  variant = 'ghost',
  children,
  ...other
}) => (
  <RootStyle styleProps={{ color, variant }} {...other}>
    {children}
  </RootStyle>
);

Label.propTypes = {
  children: PropTypes.node,
  color: PropTypes.oneOf([
    'default',
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error'
  ]),
  variant: PropTypes.oneOf(['filled', 'outlined', 'ghost'])
};

export default Label;
