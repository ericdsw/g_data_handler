import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Icon,
  Chip,
  Typography
} from '@material-ui/core';

import {
  DialogueMessageToolbar,
  ConversationCardTitle
} from './elements';

const styles = (theme) => ({
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
  }
})

const PickItem = ({
  pickItemData,
  handleEdit,
  handleDelete,
  handleSplitBelow
}) => {

  const classes = makeStyles(styles)();

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
            handleEdit={data => handleEdit(data)}
            handleDelete={() => handleDelete}
            handleSplitBelow={conversationName => handleSplitBelow(conversationName)}
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
          {Object.keys(pickItemData.item_conditions).map(conditionItemId => {
            const usesItem = pickItemData.item_conditions[conditionItemId].uses_item
            return (
              <Grid container alignItems="center">
                <Chip
                  label={`Item Id: ${conditionItemId}`}
                  style={{ minWidth: 200 }}
                  color="secondary"
                />
                <div style={{padding: 16 }}>
                  <Icon>arrow_forward</Icon>
                </div>
                <Chip 
                  label={`Next Action: ${pickItemData.item_conditions[conditionItemId].next_action}`} 
                  style={{ minWidth: 200 }}
                  color="secondary"
                />
                &nbsp;
                &nbsp;
                {usesItem && (
                  <Chip label="Uses Item" />
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
}

export default PickItem;
