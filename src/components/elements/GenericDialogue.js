import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent
} from '@material-ui/core'

const GenericDialogue = ({title, open = false, onClose, children, maxWidth = 'md'}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth={true}
            maxWidth={maxWidth}
            aria-labelledby='form-dialog-title'
        >
            <DialogTitle id='form-dialog-title'>
                {title}
            </DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>
    );
}

export default GenericDialogue;
