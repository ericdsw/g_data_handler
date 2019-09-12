import React, { useState } from 'react';
import {
    IconButton,
    Icon,
    Menu,
    MenuItem,
    Tooltip
} from '@material-ui/core';

const MenuIconButton = props => {

    // Parameters
    const { elementId, contentDictionary, tooltip = '', icon } = props;

    // Methods
    const { handleClick } = props;

    const [anchorEl, setAnchorEl] = useState(null);

    return (
        <React.Fragment>
            <Tooltip title={tooltip}>
                <IconButton
                    aria-owns={anchorEl ? elementId : undefined}
                    aria-haspopup='true'
                    onClick={e => setAnchorEl(e.currentTarget)}
                >
                    <Icon>{icon}</Icon>
                </IconButton>
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
}

export default MenuIconButton;
