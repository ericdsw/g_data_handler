import { useState } from 'react';
import { ButtonOwnProps, Button, Menu, MenuItem, Tooltip } from '@mui/material';

type MenuButtonProps = {
  elementId: string,
  contentDictionary: {},
  tooltip?: string,
  color?: ButtonOwnProps["color"],
  buttonText: string,
  handleClick: (key: string) => void,
}

const MenuButton = ({
  elementId,
  contentDictionary,
  tooltip = '',
  color = 'secondary',
  buttonText,
  handleClick,
}: MenuButtonProps) => {
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <>
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
        {Object.keys(contentDictionary).map((key) => (
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
    </>
  );
};

export default MenuButton;
