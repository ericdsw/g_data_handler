import React, { useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Chip } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  chip: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.down("xs")]: {
      marginBottom: theme.spacing(1),
    },
  },
  chipContainer: {
    borderTop: "1px solid #333",
    marginTop: 12,
    paddingTop: 12,
  },
}));

const extras = [
  "location",
  "voice_file",
  "control_level",
  "autopilot_offset",
];

const ConversationExtraParams = ({ message }) => {

  const classes = useStyles();
  const extraChips = useMemo(() => {
    return extras
      .filter(extraProperty => message.hasOwnProperty(extraProperty))
      .map(extraProperty => (
        <Chip
          key={extraProperty}
          className={classes.chip}
          label={`${extraProperty}: ${message[extraProperty]}`}
        />
      ))
  }, [classes, message]);

  return (
    <React.Fragment>
      {extraChips.length > 0 && (
        <div className={classes.chipContainer}>{extraChips}</div>
      )}
    </React.Fragment>
  );
};

export default ConversationExtraParams;
