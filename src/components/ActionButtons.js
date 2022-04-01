import React from 'react';
// prop types
import PropTypes from 'prop-types';
// material
import { Box, Tooltip, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

const ActionButtons = ({
  editLabel,
  deleteLabel,
  editProps,
  deleteProps,
  onEdit,
  onDelete,
  moreActions
}) => {
  const handleEdit = () => onEdit && onEdit();
  const handleDelete = () => onDelete && onDelete();
  return (
    <Box display="flex" justifyContent="space-between">
      <Tooltip title={editLabel} placement="top" sx={{ ml: 1 }}>
        <IconButton onClick={handleEdit} {...editProps}>
          <Edit />
        </IconButton>
      </Tooltip>
      <Tooltip title={deleteLabel} placement="top" sx={{ ml: 1 }}>
        <IconButton onClick={handleDelete} {...deleteProps}>
          <Delete />
        </IconButton>
      </Tooltip>
      {moreActions && moreActions}
    </Box>
  );
};

ActionButtons.propTypes = {
  editLabel: PropTypes.string,
  deleteLabel: PropTypes.string,
  editProps: PropTypes.object,
  deleteProps: PropTypes.object,
  moreActions: PropTypes.node,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
};

export default ActionButtons;
