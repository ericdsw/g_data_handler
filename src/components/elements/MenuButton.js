import React, { useState } from 'react';
import { Button, Menu, MenuItem, Tooltip } from '@mui/material';

const MenuButton = ({
  elementId,
  contentDictionary,
  tooltip = '',
  color = 'secondary',
  buttonText,
  handleClick,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <React.Fragment>
      <Tooltip title={tooltip}>
        <Button
          color={color}
          aria-owns={anchorEl ? elementId : undefined}
          aria-haspopup="true"
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          {buttonText}
        </Button>
      </Tooltip>
      <Menu
        id={elementId}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {Object.keys(contentDictionary).map((key, index) => (
          <MenuItem
            key={key}
            onClick={() => {
              handleClick(key);
              setAnchorEl(null);
            }}
          >
            {contentDictionary[key]}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
};

export default MenuButton;
