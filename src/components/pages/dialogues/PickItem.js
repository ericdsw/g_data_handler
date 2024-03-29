import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Icon,
  Chip,
  Typography,
} from '@mui/material';

import { DialogueMessageToolbar, ConversationCardTitle } from './elements';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    backgroundColor: theme.palette.messageBackground,
    borderBottom: '1px solid #666',
    padding: theme.spacing(2),
  },
  iconContainer: {
    color: '#2d81b5',
  },
  actionContainer: {
    padding: theme.spacing(2),
  },
}));

const PickItem = ({
  pickItemData,
  handleEdit,
  handleDelete,
  handleSplitBelow,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.container} square>
      <CardHeader
        title={
          <ConversationCardTitle
            text="Pick Item"
            icon="shopping_cart_checkout"
            color="#ff5722"
          />
        }
        subheader="Will ask for the following items, and will perform these actions:"
        action={
          <DialogueMessageToolbar
            message={pickItemData}
            handleEdit={(data) => handleEdit(data)}
            handleDelete={() => handleDelete}
            handleSplitBelow={(conversationName) =>
              handleSplitBelow(conversationName)
            }
            omitEdit={false}
          />
        }
      />
      <CardContent>
        <Card
          className={classes.actionContainer}
          raised={false}
          square={true}
          variant="outlined"
        >
          {Object.keys(pickItemData.item_conditions).map((conditionItemId) => {
            let requiredAmount = 1;
            if (pickItemData.item_conditions[conditionItemId].amount) {
              requiredAmount =
                pickItemData.item_conditions[conditionItemId].amount;
            }

            const action = pickItemData.item_conditions[conditionItemId].action;
            var actionString = '';
            if (action === 'nothing') {
              actionString = 'Nothing';
            } else if (action === 'mark_delivered') {
              actionString = 'Mark Delivered';
            } else if (action === 'delete') {
              actionString = 'Substract from inventory';
            }

            return (
              <Grid key={conditionItemId} container alignItems="center">
                <Grid item xs={12} container alignItems="center">
                  <Chip
                    label={
                      <>
                        Item Id: {conditionItemId}&nbsp;
                        <b>(needs: {requiredAmount})</b>
                      </>
                    }
                    style={{ minWidth: 200 }}
                    color="secondary"
                  />
                  <div style={{ padding: 16 }}>
                    <Icon>arrow_forward</Icon>
                  </div>
                  <Chip
                    label={`Next Action => ${pickItemData.item_conditions[conditionItemId].next_action}`}
                    style={{ minWidth: 200 }}
                    color="secondary"
                  />
                  &nbsp; &nbsp;
                  <Chip label={`What to do: ${actionString}`} />
                </Grid>
                {pickItemData.item_conditions[conditionItemId]
                  .not_enough_action && (
                  <Grid item xs={12}>
                    <div
                      style={{
                        padding: 16,
                        paddingTop: 0,
                        paddingRight: 8,
                        display: 'inline-block',
                      }}
                    >
                      <Icon>subdirectory_arrow_right</Icon>
                    </div>
                    <Chip
                      label={`If not enough => ${pickItemData.item_conditions[conditionItemId].not_enough_action}`}
                      style={{ minWidth: 200, marginTop: -10 }}
                      color="secondary"
                      variant="outlined"
                    />
                  </Grid>
                )}
              </Grid>
            );
          })}
        </Card>

        {pickItemData.cancel_condition && (
          <Typography variant="body1" style={{ marginTop: 16 }}>
            Cancel action: {pickItemData.cancel_condition}
          </Typography>
        )}

        {pickItemData.incorrect_condition && (
          <Typography variant="body1" style={{ marginTop: 16 }}>
            Incorrect action: {pickItemData.incorrect_condition}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default PickItem;
