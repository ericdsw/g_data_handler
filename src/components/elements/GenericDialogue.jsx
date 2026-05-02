import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Icon,
} from '@mui/material';

const TitleButtonContainer = styled('div')(({ theme }) => ({
  position: 'absolute',
  right: theme.spacing(1),
  top: theme.spacing(1)
}));

const GenericDialogue = ({
  title,
  open = false,
  onClose,
  children,
  maxWidth = 'md',
  helpComponent,
  style = {},
}) => {

  const [helpOpen, toggleHelpOpen] = useState(false);
  useEffect(() => {
    if (!open) {
      toggleHelpOpen(false);
    }
  }, [open]);

  if (!open) {
    return <></>;
  } else {
    return (
      <>
        <Dialog
          open={open}
          onClose={onClose}
          fullWidth={true}
          maxWidth={maxWidth}
          style={style}
          disableScrollLock
          disableRestoreFocus
        >
          <DialogTitle>
            {title}
            {helpComponent && (
              <TitleButtonContainer>
                <IconButton
                  onClick={() => {
                    toggleHelpOpen(true);
                  }}
                  size="large"
                >
                  <Icon>help</Icon>
                </IconButton>
              </TitleButtonContainer>
            )}
          </DialogTitle>
          <DialogContent style={{ paddingBottom: 24 }}>
            {children}
          </DialogContent>
          <br />
        </Dialog>
        <Dialog
          open={helpOpen}
          onClose={() => toggleHelpOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          {helpComponent}
        </Dialog>
      </>
    );
  }
};

export default GenericDialogue;
