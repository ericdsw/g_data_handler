import React , { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { 
    IconButton, Icon, Menu, MenuItem
} from '@material-ui/core';
import { useDialogueManager } from '../../../../hooks';
import { ConfirmationDialogue } from '../../../elements';

const styles = theme => ({
    button: {
        color: 'white'
    }
});

const DialogueMessageToolbar = props => {

    const { message, omitEdit } = props;

    const { handleAddAbove, handleAddBelow, handleEdit, handleDelete } = props; 

    const [dialogues, toggleDialogue] = useDialogueManager('confirmDelete');

    const [selectedOption, setSelectedOption] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [typeAnchorEl, setTypeAnchorEl] = useState(null);

    function handleMenuOpen(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleTypeMenuOpen(event) {
        setTypeAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    function handleTypeClose() {
        setTypeAnchorEl(null);
    }

    function handleMenuSelect(event, menuItemName) {
        
        switch(menuItemName) {
            case 'addAbove':
            case 'addBelow':
                setSelectedOption(menuItemName);
                handleTypeMenuOpen(event);
                break;
            case 'edit':
                handleEdit();
                break;
            case 'delete':
                toggleDialogue('confirmDelete', 'show');
                break;
            default:
                break;
        }
        setAnchorEl(null);
    }

    function handleTypeMenuSelect(itemName) {
        const isEmote = (itemName === 'emote');
        switch (selectedOption) {
            case 'addAbove':
                handleAddAbove(isEmote);
                break;
            case 'addBelow':
                handleAddBelow(isEmote);
                break;
            default:
                break;
        }
        setTypeAnchorEl(null);
    }

    return (
        <div>

            <IconButton
                aria-controls='simple-menu'
                aria-haspopup='true'
                onClick={(e) => handleMenuOpen(e)}
            >
                <Icon>more_vert</Icon>
            </IconButton>

            <Menu
                id='simple-menu'
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem 
                    aria-controls='simple-type-menu'
                    aria-haspopup='true'
                    onClick={(e) => handleMenuSelect(e, 'addAbove')}
                >
                    Add Above
                </MenuItem>
                <MenuItem 
                    aria-controls='simple-type-menu'
                    aria-haspopup='true'
                    onClick={(e) => handleMenuSelect(e, 'addBelow')}
                >
                    Add Below
                </MenuItem>
                {!omitEdit && 
                    <MenuItem 
                        aria-controls='simple-type-menu'
                        aria-haspopup='true'
                        onClick={(e) => handleMenuSelect(e, 'edit')}>
                    Edit
                    </MenuItem>
                }
                <MenuItem onClick={(e) => handleMenuSelect(e, 'delete')}>
                    Delete
                </MenuItem>
            </Menu>

            <Menu
                id='simple-type-menu'
                anchorEl={typeAnchorEl}
                open={Boolean(typeAnchorEl)}
                onClose={handleTypeClose}
            >
                <MenuItem onClick={() => handleTypeMenuSelect('message')}>
                    Message
                </MenuItem>
                <MenuItem onClick={() => handleTypeMenuSelect('emote')}>
                    Emote
                </MenuItem>
           </Menu>

            <ConfirmationDialogue
                message={`Delete the ${message.is_emote ? 'emote' : 'message'}?`}
                isOpen={dialogues['confirmDelete']}
                handleClose={() => toggleDialogue('confirmDelete', 'hide')}
                handleConfirm={() => {
                    handleDelete();
                    toggleDialogue('confirmDelete', 'hide');
                }}
            />

        </div>
    );
}

export default withStyles(styles)(DialogueMessageToolbar);
