import React from 'react';
import { DialogTitle, DialogContent } from '@mui/material';

const GenericDialogueContent = ({ title, childElements }) => {
  return (
    <React.Component>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{childElements}</DialogContent>
    </React.Component>
  );
};

export default GenericDialogueContent;
