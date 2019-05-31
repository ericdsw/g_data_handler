import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent
} from '@material-ui/core'

const GenericDialogue = ({title, open, onClose, children}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth={true}
            maxWidth='md'
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
