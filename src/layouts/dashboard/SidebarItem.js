import React, { useState } from 'react';
// prop types
import PropTypes from 'prop-types';
// router
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
// material
import { alpha, experimentalStyled as styled } from '@mui/material/styles';
import {
  Box,
  Collapse,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { Icon } from '@iconify/react';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';

// ----------------------------------------------------------------------

const ListItemStyle = styled(ListItem)(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  textTransform: 'capitalize',
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(2.5),
  color: theme.palette.text.secondary,
  '&.isActiveRoot': {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    backgroundColor: alpha(
      theme.palette.primary.main,
      theme.palette.action.selectedOpacity
    ),
    '&:before': {
      top: 0,
      right: 0,
      width: 3,
      bottom: 0,
      content: "''",
      position: 'absolute',
      backgroundColor: theme.palette.primary.main
    }
  },
  '&.isActiveSub': {
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightMedium,
    '& .subIcon:before': {
      transform: 'scale(2)',
      backgroundColor: theme.palette.primary.main
    }
  }
}));

const SubIconStyle = styled('span')(({ theme }) => ({
  width: 22,
  height: 22,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:before': {
    width: 4,
    height: 4,
    content: "''",
    display: 'block',
    borderRadius: '50%',
    backgroundColor: theme.palette.text.disabled,
    transition: theme.transitions.create('transform')
  }
}));

// ----------------------------------------------------------------------

const SidebarItem = ({
  level,
  title,
  href,
  info,
  icon,
  open = false,
  children
}) => {
  const [show, setShow] = useState(open);
  const isSubItem = level > 0;

  const { pathname } = useLocation();

  const handleShow = () => {
    setShow(() => !show);
  };

  if (children) {
    return (
      <>
        <ListItemStyle
          button
          disableGutters
          onClick={handleShow}
          className={open ? 'isActiveRoot' : ''}
        >
          <ListItemIcon>{icon && icon}</ListItemIcon>
          <ListItemText disableTypography primary={title} />
          {info && info}
          <Box
            component={Icon}
            icon={show ? arrowIosDownwardFill : arrowIosForwardFill}
            sx={{ width: 16, height: 16, ml: 1 }}
          />
        </ListItemStyle>

        <Collapse in={show}>{children}</Collapse>
      </>
    );
  }

  return (
    <ListItemStyle
      button
      to={href}
      exact={open.toString()}
      disableGutters
      component={RouterLink}
      className={
        href === pathname && (isSubItem ? 'isActiveSub' : 'isActiveRoot')
      }
    >
      <ListItemIcon>
        {isSubItem ? <SubIconStyle className="subIcon" /> : icon}
      </ListItemIcon>
      <ListItemText disableTypography primary={title} />

      {info && info}
    </ListItemStyle>
  );
};

SidebarItem.propTypes = {
  level: PropTypes.number,
  title: PropTypes.string,
  href: PropTypes.string,
  info: PropTypes.element,
  icon: PropTypes.element,
  open: PropTypes.bool,
  children: PropTypes.node
};

export default SidebarItem;
