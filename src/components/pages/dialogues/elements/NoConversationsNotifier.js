import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import { Typography } from "@mui/material";

const useStyles = makeStyles(() => ({
  emptyText: {
    padding: 32,
    width: "100%",
  },
}));

const NoConversationsNotifier = ({ conversations }) => {
  const classes = useStyles();

  if (conversations.length <= 0) {
    return (
      <Typography
        variant="h5"
        color="textSecondary"
        align="center"
        className={classes.emptyText}
      >
        No conversations for this dialogue
      </Typography>
    );
  } else {
    return <React.Fragment />;
  }
};

export default NoConversationsNotifier;
