import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardHeader, CardContent, Typography } from "@material-ui/core";

import { DialogueMessageToolbar } from "./elements";

const styles = (theme) => ({
  swarmContainer: {
    width: "100%",
    backgroundColor: "#222",
    borderBottom: "1px solid #666",
    padding: theme.spacing(3),
  },
  swarmMessage: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(0.5),
    width: "100%",
  },
});

const MessageSwarm = (props) => {
  const { swarmData } = props;
  const { handleEdit, handleDelete, handleSplitBelow } = props;
  const classes = makeStyles(styles)();

  return (
    <Card className={classes.swarmContainer} square={true}>
      <CardHeader
        subheader="Will display a swarm with the following messages:"
        action={
          <DialogueMessageToolbar
            message={swarmData}
            handleEdit={(data) => handleEdit(data)}
            handleDelete={() => handleDelete()}
            handleSplitBelow={(conversationName) =>
              handleSplitBelow(conversationName)
            }
            omitEdit={false}
          />
        }
      />
      <CardContent>
        {swarmData.swarmData.map((swarmMessage, index) => (
          <Card
            key={index}
            className={classes.swarmMessage}
            raised={false}
            square={true}
            variant="outlined"
          >
            <Typography variant="subtitle1">{swarmMessage.message}</Typography>
            <Typography variant="body2">
              Target: {swarmMessage.target_object}. Appears after{" "}
              {swarmMessage.appearance_timeout} second(s).
            </Typography>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};

export default MessageSwarm;
