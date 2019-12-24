import React from 'react';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core'

const GenericDialogue = ({title, open = false, onClose, children, maxWidth = 'md'}) => {
    if (! open) {
        return <React.Fragment />
    } else {
        return (
            <Dialog
                open={open}
                onClose={onClose}
                fullWidth={true}
                maxWidth={maxWidth}
            >
                <DialogTitle>
                    {title}
                </DialogTitle>
                <DialogContent>
                    {children}
                </DialogContent>
                <br />
            </Dialog>
        );
    }
}

export default GenericDialogue;
