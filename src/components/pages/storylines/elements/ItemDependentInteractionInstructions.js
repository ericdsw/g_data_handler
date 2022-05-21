import React from "react";
import { Grid, Typography } from "@mui/material";

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
}));

const ItemDependentInteractionInstructions = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            How to use
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2">
            Take a look at this guide if there's any confusion in how "required
            items" and "excluding items / missing items" work.
          </Typography>
          <br />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Required Items
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            If one or more items are defined here, depending on the switch's
            value it will have the following behavior:
            <ul>
              <li>
                If the switch is OFF, all items must be present in the player's
                invetory for this interaction to trigger.
                <br />
                <br />
                <b>Example:</b> you must have item_1 AND item_2 AND item_3...
                <br />
                <br />
              </li>
              <li>
                If the switch is ON, you just need one of the specified items
                from the list.
                <br />
                <br />
                <b>Example: </b> must have EITHER item_1 OR item_2 OR item_3...
                <br />
                <br />
              </li>
            </ul>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Excluded/Missing Items
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            If one or more items are defined here, depending on the switch's
            value it will have the following behavior:
            <ul>
              <li>
                If the switch is OFF, you must not have ALL of these items at
                the same time for the interaction to trigger, BUT having any
                combination of them that doesn't match with what's defined here
                will evaluate to false (and hence, the interaction will not be
                fired).
                <br />
                <br />
                <b>Example:</b> NOT having both item_1 and item_2 will cause the
                interaction to trigger, but having only item_1 or only item_2
                will not cause it to trigger
                <br />
                <br />
              </li>
              <li>
                If the switch is ON, the interaction will trigger as as long as
                you are missing at least ONE item on the list. It will stop
                triggering when all the items in the list are obtained.
                <br />
                <br />
                <b>Example:</b> Let's say you specify item_1 and item_2; in this
                case, not having either item_1 OR item_2 will cause the
                interaction to trigger (unlike when it's on, where it will only
                trigger if neither item_1 NOR item_2 are present in the
                inventory).
                <br />
                <br />
              </li>
            </ul>
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default ItemDependentInteractionInstructions;
