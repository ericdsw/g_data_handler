import React from 'react';
import { Paper, Typography } from '@mui/material';

const NoConversationsNotifier = ({ conversations }) => {
  if (conversations.length <= 0) {
    return (
      <Paper>
        <Typography
          variant="h5"
          color="textSecondary"
          align="center"
          sx={{ padding: 32, width: '100%' }}
        >
          No conversations for this dialogue
        </Typography>
      </Paper>
    );
  } else {
    return <React.Fragment />;
  }
};

export default NoConversationsNotifier;
