import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { withSnackbar } from "notistack";
import {
  TextField,
  MenuItem,
  Grid,
  Button,
  Typography,
  Avatar,
} from "@material-ui/core";

import { speakerSchema } from "../../../../globals";

const styles = (theme) => ({
  emoteAvatar: {
    width: 16,
    height: 16,
    backgroundColor: "#fff",
    padding: 8,
  },
});

const VALID_EMOTES = {
  angry: "Angry",
  exclamation: "Exclamation",
  question: "Question",
  three_dots: "Three Dots",
  sweat: "Sweat",
};

class CreateEmoteForm extends React.Component {
  state = {
    type: "emote",
    target_object: "",
    message: "",
    is_emote: true,
    speaker: "",
  };

  handleInputChange = (inputIdentifier) => (event) => {
    let value = event.target.value;
    if (inputIdentifier === "speaker") {
      var newSpeaker = speakerSchema[value];
      this.setState({
        speaker: value,
        target_object: newSpeaker.target_object,
      });
    } else {
      this.setState({ [inputIdentifier]: value });
    }
  };

  handleSpeakerChange = (event) => {
    var newSpeaker = speakerSchema[event.target.value];
    this.setState({
      speaker: event.target.value,
      target_object: newSpeaker.target_object,
    });
  };

  submitData = (event) => {
    const { enqueueSnackbar, creationHandler } = this.props;

    event.preventDefault();
    event.stopPropagation();

    if (this.state.message === "") {
      enqueueSnackbar("The emote must be specified", { variant: "error" });
      return;
    }
    if (this.state.target_object === "") {
      enqueueSnackbar("The target object must be specified", {
        variant: "error",
      });
      return;
    }

    creationHandler(this.state);
  };

  render() {
    const { classes } = this.props;

    let speakerMenuItems = [
      <MenuItem key="---" value="">
        ---
      </MenuItem>,
    ];
    for (const speakerId in speakerSchema) {
      const target = speakerSchema[speakerId].target_object;
      if (target && target !== "NONE") {
        speakerMenuItems.push(
          <MenuItem key={speakerId} value={speakerId}>
            {speakerId} ({target})
          </MenuItem>
        );
      }
    }

    let emoteMenuItems = [];
    for (const emoteId in VALID_EMOTES) {
      emoteMenuItems.push(
        <MenuItem key={emoteId} value={emoteId}>
          <Avatar
            className={classes.emoteAvatar}
            src={`images/emotes/${emoteId}.png`}
            alt="Emote"
          />
          &nbsp;&nbsp;
          <Typography variant="body1">{VALID_EMOTES[emoteId]}</Typography>
        </MenuItem>
      );
    }

    return (
      <form onSubmit={this.submitData}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              label="Speaker"
              onChange={this.handleInputChange("speaker")}
              value={this.state.speaker}
              variant="outlined"
              margin="normal"
            >
              {speakerMenuItems}
            </TextField>
            <TextField
              fullWidth
              label="Target Object*"
              value={this.state.target_object}
              onChange={this.handleInputChange("target_object")}
              variant="outlined"
              margin="normal"
            />
            <TextField
              select
              fullWidth
              label="Emote*"
              value={this.state.message}
              onChange={this.handleInputChange("message")}
              variant="outlined"
              margin="normal"
            >
              {emoteMenuItems}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <Grid container justify="flex-end">
              <Button
                type="submit"
                variant="contained"
                style={{ marginTop: 8 }}
                color="primary"
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    );
  }
}

export default withSnackbar(withStyles(styles)(CreateEmoteForm));
