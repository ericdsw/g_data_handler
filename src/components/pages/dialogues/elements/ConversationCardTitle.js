import React from 'react';
import {
  Icon,
  Typography,
  makeStyles,
  Grid
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    color: props => props.color ? 
      props.color :
      theme.palette.text.primary
  },
  icon: {
    marginRight: theme.spacing(1)
  }
}))

const ConversationCardTitle = ({
  text,
  icon,
  color
}) => {

  const classes = useStyles({ color });

  return (
    <Grid 
      container
      alignItems="center"
      className={classes.container}
    >
      {icon && (
        <Icon className={classes.icon}>{icon}</Icon>
      )}
      <Typography variant="h5">{text}</Typography>
    </Grid>
  );
}

export default ConversationCardTitle;
