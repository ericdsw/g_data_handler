import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { Paper, Typography } from '@mui/material';

const useStyles = makeStyles(() => ({
  emptyText: {
    padding: 32,
    width: '100%',
  },
}));

const NoConversationsNotifier = ({ conversations }) => {
  const classes = useStyles();

  if (conversations.length <= 0) {
    return (
      <Paper>
        <Typography
          variant="h5"
          color="textSecondary"
          align="center"
          className={classes.emptyText}
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
