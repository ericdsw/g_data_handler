import { useState, useEffect, ReactNode, CSSProperties } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Icon,
  Breakpoint,
} from '@mui/material';

import { TitleButtonContainer } from './genericDialogueStyledComponents';

type GenericDialogueProps = {
  title: string,
  open?: boolean,
  onClose: () => void,
  children: ReactNode | ReactNode[],
  maxWidth?: Breakpoint,
  helpComponent?: ReactNode,
  style?: CSSProperties
}

const GenericDialogue = ({
  title,
  open = false,
  onClose,
  children,
  maxWidth = 'md',
  helpComponent,
  style = {},
}: GenericDialogueProps) => {

  const [helpOpen, toggleHelpOpen] = useState(false);
  useEffect(() => {
    if (!open) {
      toggleHelpOpen(false);
    }
  }, [open]);

  if (!open) {
    return <></>;
  }
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
};

export default GenericDialogue;
