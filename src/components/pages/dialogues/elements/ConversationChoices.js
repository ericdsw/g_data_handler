import React, { useMemo } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { Chip, Tooltip } from '@mui/material';

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

const ConversationChoices = ({ message }) => {
  const classes = useStyles();

  const choicesChips = useMemo(() => {
    if (!message.choices) {
      return [];
    }

    return message.choices.map((currentChoice) => {
      if (currentChoice.next_message) {
        const label = `${currentChoice.key}: ${currentChoice.value}`;
        return (
          <Tooltip
            key={currentChoice.key}
            title={`Next Message: ${currentChoice.next_message}`}
          >
            <Chip
              className={classes.chip}
              color="primary"
              label={label}
              style={{
                border: currentChoice.isDefaultCancel
                  ? '1px solid red'
                  : 'none',
              }}
            />
          </Tooltip>
        );
      } else {
        return (
          <Chip
            key={currentChoice.key}
            className={classes.chip}
            label={`${currentChoice.key}: ${currentChoice.value}`}
            style={{
              border: currentChoice.isDefaultCancel ? '1px solid red' : 'none',
            }}
          />
        );
      }
    });
  }, [message, classes.chip]);

  return (
    <React.Fragment>
      {choicesChips.length > 0 && (
        <div className={classes.chipContainer}>{choicesChips}</div>
      )}
    </React.Fragment>
  );
};

export default ConversationChoices;
