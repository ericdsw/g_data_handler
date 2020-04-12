import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  CardHeader,
  IconButton,
  Icon,
  Typography,
  Button,
} from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import { createInput } from "../../../../functions";

const shortMessageSchema = {
  parameters: {
    message: {
      label: "Message",
      type: "text",
      required: true,
      tooltip: "The short message",
      placeholder: "Cannot be too long...",
    },
    target_object: {
      label: "Target Object",
      type: "text",
      required: true,
      tooltip: "Object that the dialogue will follow",
      placeholder: "foo",
    },
    appearance_timeout: {
      label: "Appearance Timeout",
      type: "number",
      required: true,
      default: 0.0,
    },
  },
};

const styles = (theme) => ({
  swarmMessageCard: {
    backgroundColor: "#222",
    margin: theme.spacing(0.5),
  },
  targetObject: {
    color: blue[200],
  },
});

const CreateSwarmForm = (props) => {
  const classes = makeStyles(styles)();

  // Extract properties
  const { initialSwarmData = [], isEdit = false } = props;

  // Extract methods
  const { handleSubmit } = props;

  const [swarmMessages, updateSwarmMessages] = useState(initialSwarmData);
  const [curMessage, updateCurMessage] = useState({
    offset: -1,
    message: "",
    target_object: "",
    appearance_timeout: 0.0,
  });

  const handleInputChange = (inputName) => (event) => {
    const newMessage = { ...curMessage };
    newMessage[inputName] = event.target.value;
    updateCurMessage(newMessage);
  };

  const messageFormSubmit = (e) => {
    e.preventDefault();

    if (curMessage.offset === -1) {
      updateSwarmMessages([
        ...swarmMessages,
        {
          message: curMessage.message,
          target_object: curMessage.target_object,
          appearance_timeout: curMessage.appearance_timeout,
        },
      ]);
    } else {
      const newMessages = [...swarmMessages];
      newMessages.splice(curMessage.offset, 1, {
        message: curMessage.message,
        target_object: curMessage.target_object,
        appearance_timeout: curMessage.appearance_timeout,
      });
      updateSwarmMessages(newMessages);
    }

    updateCurMessage({
      offset: -1,
      message: "",
      target_object: "",
      appearance_timeout: 0.0,
    });
  };

  const requestEdit = (offset) => {
    const newMessage = { ...swarmMessages[offset] };
    newMessage.offset = offset;
    updateCurMessage(newMessage);
  };

  const clearEdit = () => {
    updateCurMessage({
      offset: -1,
      message: "",
      target_object: "",
      appearance_timeout: 0.0,
    });
  };

  const removeSwarmMessageAtIndex = (index) => {
    const newMessages = [...swarmMessages];
    newMessages.splice(index, 1);
    updateSwarmMessages(newMessages);
  };

  const createSwarmRequest = () => {
    const returnData = {
      type: "swarm",
      swarmData: swarmMessages,
    };
    handleSubmit(returnData);
  };

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <form onSubmit={(e) => messageFormSubmit(e)}>
            {Object.keys(shortMessageSchema.parameters).map(
              (paramName, index) => (
                <React.Fragment key={paramName}>
                  {createInput(
                    paramName,
                    shortMessageSchema.parameters[paramName],
                    curMessage[paramName],
                    handleInputChange
                  )}
                </React.Fragment>
              )
            )}
            <Grid container justify="flex-end">
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                style={{ marginTop: 8 }}
              >
                {curMessage.offset !== -1 ? "Edit Message" : "Add To Swarm"}
              </Button>
            </Grid>
          </form>
        </Grid>
        <Grid item xs={6}>
          {swarmMessages.length <= 0 && (
            <Typography variant="subtitle1" align="center">
              No messages found for this swarm
            </Typography>
          )}
          {swarmMessages.map((currentMessage, index) => (
            <Card
              key={index}
              className={classes.swarmMessageCard}
              style={{
                border: curMessage.offset === index ? "1px solid red" : "none",
              }}
            >
              <CardHeader
                subheader={
                  <React.Fragment>
                    {currentMessage.message} <br />
                    <small>
                      Target: {currentMessage.target_object}. Appears after{" "}
                      {currentMessage.appearance_timeout} second(s)
                    </small>
                  </React.Fragment>
                }
                action={
                  <React.Fragment>
                    <IconButton
                      onClick={() => {
                        if (index === curMessage.offset) {
                          clearEdit();
                        } else {
                          requestEdit(index);
                        }
                      }}
                    >
                      <Icon>
                        {index === curMessage.offset ? "cancel" : "edit"}
                      </Icon>
                    </IconButton>
                    <IconButton
                      onClick={() => removeSwarmMessageAtIndex(index)}
                    >
                      <Icon>delete</Icon>
                    </IconButton>
                  </React.Fragment>
                }
              />
            </Card>
          ))}
        </Grid>
        <Grid item xs={12}>
          <Grid container justify="flex-end">
            <Button
              variant="contained"
              color="primary"
              onClick={() => createSwarmRequest()}
            >
              {isEdit ? "Edit Swarm" : "Create Swarm"}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default CreateSwarmForm;
