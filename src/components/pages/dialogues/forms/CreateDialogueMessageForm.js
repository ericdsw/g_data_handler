import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { withSnackbar } from "notistack";
import {
  TextField,
  MenuItem,
  Grid,
  Button,
  FormControlLabel,
  Switch,
  Divider,
  IconButton,
  Icon,
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";

import { speakerSchema } from "../../../../globals";
import { SimpleCollapse } from "../../../elements";

import CreateChoiceForm from "./CreateChoiceForm";
import DialogueImageSearcher from "./DialogueImageSearcher";

const styles = () => ({
  imagePreview: {
    backgroundColor: "#ccc",
    width: "100%",
    height: 125,
    marginTop: 12,
  },
});

const DEFAULT_STATE = {

  // Control Variables
  isEdit: false,
  createAndContinue: false,
  freshStart: false,

  // Tag instructions
  instructionsDialogueOpen: false,

  // Type
  type: "message",

  // Message variables
  imagePreview: "",
  speaker: "",
  message: "",
  image: "",
  name: "",
  location: "",
  voice_file: "",
  control_level: "",
  autopilot_offset: "",
  choices: [],
  interrupts: false,
  target_object: "",
  is_emote: false,
  enter_sound: "",
  exit_sound: "",
};

class CreateDialogueMessageForm extends React.Component {
  constructor(props) {
    super(props);
    let stateData = Object.assign({}, DEFAULT_STATE);
    if (props.messageData) {
      stateData = Object.assign({}, stateData, props.messageData);
      if (props.messageData.image) {
        stateData["imagePreview"] = props.messageData.image;
      } else if (props.messageData.speaker) {
        const { speaker } = props.messageData;
        stateData["imagePreview"] = speakerSchema[speaker].image || "";
      }
    }
    this.state = stateData;
  }

  handleToggleAdvanced = () => {
    this.setState({
      showAdvanced: !this.state.showAdvanced,
    });
  };

  handleToggleChoices = () => {
    this.setState({
      showChoices: !this.state.showChoices,
    });
  };

  handleInstructionsDialogueToggle = () => {
    this.setState({
      instructionsDialogueOpen: !this.state.instructionsDialogueOpen
    })
  }

  submitData = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (this.state.message === "") {
      this.props.enqueueSnackbar("The message must be specified", {
        variant: "error",
      });
      return;
    }
    if (this.state.control_level === "autopilot") {
      if (this.state.autopilotOffset === "") {
        this.props.enqueueSnackbar("Specify autopilot offset", {
          variant: "error",
        });
        return;
      }
    }

    let messageData = {
      message: this.state.message,
      interrupts: this.state.interrupts,
      type: "message",
    };

    // Filters
    if (this.state.speaker) {
      messageData.speaker = this.state.speaker;
    }
    if (this.state.image) {
      messageData.image = this.state.image;
    }
    if (this.state.name) {
      messageData.name = this.state.name;
    }
    if (this.state.location) {
      messageData.location = this.state.location;
    }
    if (this.state.voice_file) {
      messageData.voice_file = this.state.voice_file;
    }
    if (this.state.control_level) {
      messageData.control_level = this.state.control_level;
    }
    if (this.state.autopilot_offset) {
      messageData.autopilot_offset = parseFloat(this.state.autopilot_offset);
    }
    if (this.state.choices.length > 0) {
      messageData.choices = this.state.choices;
    }
    if (this.state.target_object) {
      messageData.target_object = this.state.target_object;
    }
    if (this.state.enter_sound) {
      messageData.enter_sound = this.state.enter_sound;
    }
    if (this.state.exit_sound) {
      messageData.exit_sound = this.state.exit_sound;
    }

    this.props.creationHandler(messageData, this.state.createAndContinue);

    if (this.state.freshStart) {
      this.setState(Object.assign({}, DEFAULT_STATE));
    } else {
      this.setState({ message: "" });
    }
  };

  handleInputChange = (inputIdentifier, isChecked = false) => (event) => {
    let value = event.target.value;

    if (isChecked) {
      value = event.target.checked;
    }

    const speakers = Object.keys(speakerSchema);

    if (inputIdentifier === "image") {
      const { speaker } = this.state;
      let defaultImage = "";
      if (speaker && speakers.includes(speaker)) {
        defaultImage = speakerSchema[speaker].image || "";
      }
      this.setState({
        [inputIdentifier]: value,
        imagePreview: value !== "" ? value : defaultImage,
      });
    } else if (inputIdentifier === "speaker") {
      const { image } = this.state;
      let defaultImage = "";
      if (value && speakers.includes(value)) {
        defaultImage = speakerSchema[value].image || "";
      }
      const newImagePreview = image ? image : defaultImage;
      this.setState({
        [inputIdentifier]: value,
        imagePreview: newImagePreview,
      });
    } else {
      this.setState({
        [inputIdentifier]: value,
      });
    }
  };

  handleImageChange = (image) => {
    this.setState({
      image: image,
      imagePreview: image,
    });
  };

  addNewChoice = (choiceData) => {
    let currentChoices = [...this.state.choices];
    let choiceFound = false;
    currentChoices.forEach((curChoice) => {
      if (curChoice.key === choiceData.key) {
        choiceFound = true;
      }
    });
    if (choiceFound) {
      this.props.enqueueSnackbar(
        `The choice ${choiceData.key} is already present`,
        { variant: "error" }
      );
    } else {
      currentChoices.push(choiceData);
      this.setState({ choices: currentChoices });
    }
  };

  removeChoice = (choiceKey) => {
    let deleteIndex = -1;
    let currentChoices = [...this.state.choices];
    currentChoices.forEach((curChoice, index) => {
      if (curChoice.key === choiceKey) {
        deleteIndex = index;
      }
    });
    if (deleteIndex !== -1) {
      currentChoices.splice(deleteIndex, 1);
    }
    this.setState({
      choices: currentChoices,
    });
  };

  render() {
    let speakerMenuItems = [
      <MenuItem key="---" value="">
        ---
      </MenuItem>,
    ];
    for (const speakerId in speakerSchema) {
      const name = speakerSchema[speakerId].name;
      speakerMenuItems.push(
        <MenuItem key={speakerId} value={speakerId}>
          {speakerId} ({name || <em>No Name</em>})
        </MenuItem>
      );
    }

    return (
      <form onSubmit={this.submitData}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <DialogueImageSearcher
              image={this.state.imagePreview}
              updateImage={this.handleImageChange}
            />
            <TextField
              fullWidth
              label="Image"
              onChange={this.handleInputChange("image")}
              value={this.state.image}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={8}>
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
              label="Name"
              onChange={this.handleInputChange("name")}
              value={this.state.name}
              placeholder="The name that will be displayed on top of the Dialogue"
              variant="outlined"
              margin="normal"
            />
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Enter Sound"
                  onChange={this.handleInputChange("enter_sound")}
                  value={this.state.enter_sound}
                  variant="outlined"
                  margin="normal"
                  placeholder="Sound when dialogue enters"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Exit Sound"
                  onChange={this.handleInputChange("exit_sound")}
                  value={this.state.exit_sound}
                  variant="outlined"
                  margin="normal"
                  placeholder="Sound when dialogue exits"
                />
              </Grid>
            </Grid>

            <TextField
              fullWidth
              label="Target Object"
              onChange={this.handleInputChange("target_object")}
              value={this.state.target_object}
              variant="outlined"
              margin="normal"
              placeholder="Object that the dialogue will attach to (node name only)"
            />
          </Grid>
        </Grid>

        <br />
        <Divider />
        <br />

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={10}>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              label="Message*"
              multiline
              rows="5"
              autoFocus
              value={this.state.message}
              onChange={this.handleInputChange("message")}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControlLabel
              key="interrupts"
              label="Interrupts Previous"
              control={
                <Switch
                  checked={this.state.interrupts}
                  onChange={this.handleInputChange("interrupts", true)}
                  value={this.state.interrupts}
                />
              }
            />
            <br />
            <br />
            <Grid container justify="center">
              <IconButton onClick={this.handleInstructionsDialogueToggle}>
                <Icon>help</Icon>
              </IconButton>
            </Grid>
            
          </Grid>
        </Grid>

        <br />
        <Divider />
        <br />

        <SimpleCollapse
          collapsedMessage="Show Advanced Options"
          openedMessage="Hide Advanced Options"
        >
          <TextField
            select
            fullWidth
            label="Location"
            onChange={this.handleInputChange("location")}
            value={this.state.location}
            variant="outlined"
            margin="normal"
          >
            <MenuItem value="">---</MenuItem>
            <MenuItem value="top">Top</MenuItem>
            <MenuItem value="bottom">Bottom</MenuItem>
          </TextField>
          <TextField
            label="Voice File"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={this.handleInputChange("voice_file")}
            value={this.state.voice_file}
          />
          <TextField
            select
            fullWidth
            label="Control Level"
            onChange={this.handleInputChange("control_level")}
            value={this.state.control_level}
            variant="outlined"
            margin="normal"
          >
            <MenuItem value="" selected>
              Default
            </MenuItem>
            <MenuItem value="autopilot">Autopilot</MenuItem>
            <MenuItem value="non_blocking">Non Blocking</MenuItem>
          </TextField>
          <TextField
            label="Autopilot Offset"
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={this.handleInputChange("autopilot_offset")}
            value={this.state.autopilot_offset}
          />
        </SimpleCollapse>
        <CreateChoiceForm
          choices={this.state.choices}
          creationHandler={this.addNewChoice}
          deletionHandler={this.removeChoice}
        />
        <Grid container alignItems="flex-end">
          <Grid item xs md={6}>
            {!this.props.isEdit && (
              <Grid container justify="flex-start">
                <FormControlLabel
                  label="Create and Continue"
                  control={
                    <Switch
                      checked={this.state.createAndContinue}
                      value={this.state.createAndContinue}
                      onChange={this.handleInputChange(
                        "createAndContinue",
                        true
                      )}
                    />
                  }
                />
                <FormControlLabel
                  label="Start Fresh"
                  control={
                    <Switch
                      checked={this.state.freshStart}
                      value={this.state.freshStart}
                      onChange={this.handleInputChange("freshStart", true)}
                    />
                  }
                />
              </Grid>
            )}
          </Grid>
          <Grid item xs md={6}>
            <Grid container justify="flex-end">
              <Button
                type="submit"
                variant="contained"
                style={{ marginTop: 8 }}
                color="primary"
              >
                {this.props.isEdit ? "Edit" : "Create"}
              </Button>
            </Grid>
          </Grid>
        </Grid>

        {/* Tag instructions */}
        <Dialog
          open={this.state.instructionsDialogueOpen}
          onBackdropClick={this.handleInstructionsDialogueToggle}
          fullWidth
          maxWidth="xl"
        >
          <DialogTitle>
            Available tags
          </DialogTitle>
          <DialogContent>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Tag</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Example</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                <TableRow>
                  <TableCell><code>{'{p=%d}'}</code></TableCell>
                  <TableCell>Pauses typing for %d seconds</TableCell>
                  <TableCell><code>{'Hello,{p=0.5} good to see you here'}</code></TableCell>
                </TableRow>

                <TableRow>
                  <TableCell><code>{'{s=%s}'}</code></TableCell>
                  <TableCell>Emits the provided %s message as a signal at the position</TableCell>
                  <TableCell><code>{'I will {s=random_signal}emit something'}</code></TableCell>
                </TableRow>

                <TableRow>
                  <TableCell><code>{'{a=%s}'}</code></TableCell>
                  <TableCell>
                    If the message has a follower, they will play the %s animation. Will return to the previous
                    animation when it finishes (and if it is not set to looping)
                  </TableCell>
                  <TableCell><code>{'I will {a=stab}murder you'}</code></TableCell>
                </TableRow>

                <TableRow>
                  <TableCell><code>{'{a=%s[F]}'}</code></TableCell>
                  <TableCell>
                    Basically the same as the previous one, but freezes the animationon the last frame. Note that
                    the target animation must not have looping enabled, otherwise it will not work
                  </TableCell>
                  <TableCell><code>{'Hello {a=deep_dab[F]}world'}</code></TableCell>
                </TableRow>

                <TableRow>
                  <TableCell><code>{'{a=%s[N=%s2]}'}</code></TableCell>
                  <TableCell>
                    Plays the animation %s, then the animation %s2 as soon as %s finishes. Note that %s must not have
                    looping enabled. The %s2 animation can have any looping strategy, just take into account that
                    non-looping %s2 will freeze at the last frame.
                  </TableCell>
                  <TableCell><code>{'Hello {a=deep_dab[N=hate_crime]} world'}</code></TableCell>
                </TableRow>

                <TableRow>
                  <TableCell><code>{'{v=%d}...{/v}'}</code></TableCell>
                  <TableCell>
                    Modifies the typing speed for the text between the tags. Note that you can skip the closing tag, and
                    the speed will be applied to the rest of the sentence. The %d parameter will be used as the wait_time
                    for the letter type timer.
                  </TableCell>
                  <TableCell><code>{'I will {v=0.05}talk really fast here{/v} but slower here'}</code></TableCell>
                </TableRow>

                <TableRow>
                  <TableCell><code>{'{g}...{/g}'}</code></TableCell>
                  <TableCell>
                    Modifies the font between the tags to the gibberish variant. They show as glitchy text, and will
                    randomly change to other characters on random intervals
                  </TableCell>
                  <TableCell><code>{'The text is {g}cursed{/g}'}</code></TableCell>
                </TableRow>

                <TableRow>
                  <TableCell><code>{'{w}...{/w}'}</code></TableCell>
                  <TableCell>
                    Applies the wave bbcode tag with the parameters of amp=25 and freq=6, and applies it to the text
                    between the tags.
                  </TableCell>
                  <TableCell><code>{'The text will be {w}wavy{/w}'}</code></TableCell>
                </TableRow>

              </TableBody>
            </Table>
          </DialogContent>
        </Dialog>

      </form>
    );
  }
}

export default withSnackbar(withStyles(styles)(CreateDialogueMessageForm));
