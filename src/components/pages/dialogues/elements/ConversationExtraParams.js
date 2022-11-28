import React, { useMemo } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { Chip } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  chip: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(1),
    },
  },
  chipContainer: {
    borderTop: '1px solid #333',
    marginTop: 12,
    paddingTop: 12,
  },
}));

const EXTRAS = ['location', 'voice_file', 'control_level', 'autopilot_offset'];

const ConversationExtraParams = ({ message }) => {
  const classes = useStyles();
  const extraChips = useMemo(() => {
    return EXTRAS
      .filter((extraProperty) => message.hasOwnProperty(extraProperty))
      .filter(extraProperty => message[extraProperty] !== '')
      .map((extraProperty) => (
        <Chip
          key={extraProperty}
          className={classes.chip}
          label={`${extraProperty}: ${message[extraProperty]}`}
        />
      ));
  }, [classes.chip, message]);

  return (
    <React.Fragment>
      {extraChips.length > 0 && (
        <div className={classes.chipContainer}>{extraChips}</div>
      )}
    </React.Fragment>
  );
};

export default ConversationExtraParams;
