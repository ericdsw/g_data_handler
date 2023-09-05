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

const EXTRAS = {
  location: {
    label: 'Location',
  },
  voice_file: {
    label: 'Voice File',
  },
  control_level: {
    label: 'Control Level',
  },
  autopilot_offset: {
    label: 'Autopilot Offset',
  },
  try_to_position_on_center: {
    label: 'Try to position on Center',
  },
};

const ConversationExtraParams = ({ message }) => {
  const classes = useStyles();
  const extraChips = useMemo(() => {
    return Object.keys(EXTRAS)
      .filter((extraProperty) => message.hasOwnProperty(extraProperty))
      .filter((extraProperty) => message[extraProperty] !== '')
      .map((extraProperty) => (
        <Chip
          key={extraProperty}
          className={classes.chip}
          label={`${EXTRAS[extraProperty].label}: ${message[extraProperty]}`}
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
