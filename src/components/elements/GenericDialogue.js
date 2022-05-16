import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Icon,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  titleButtonContainer: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
}));

const GenericDialogue = ({
  title,
  open = false,
  onClose,
  children,
  maxWidth = "md",
  helpComponent,
}) => {
  const classes = useStyles();

  const [helpOpen, toggleHelpOpen] = useState(false);
  useEffect(() => {
    if (!open) {
      toggleHelpOpen(false);
    }
  }, [open]);

  if (!open) {
    return <React.Fragment />;
  } else {
    return (
      <>
        <Dialog
          open={open}
          onClose={onClose}
          fullWidth={true}
          maxWidth={maxWidth}
        >
          <DialogTitle>
            {title}
            {helpComponent && (
              <div className={classes.titleButtonContainer}>
                <IconButton
                  onClick={() => {
                    toggleHelpOpen(true);
                  }}
                >
                  <Icon>help</Icon>
                </IconButton>
              </div>
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
