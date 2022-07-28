import React, { useState, useCallback, useMemo } from 'react';
import { useSnackbar } from 'notistack';

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
} from '@mui/material';

import { speakerSchema } from '../../../../globals';
import { SimpleCollapse } from '../../../elements';

import {
  DialogueMessageInstructions,
  SpeakerNameSearchForm,
} from '../elements';

import CreateChoiceForm from './CreateChoiceForm';
import DialogueImageSearcher from './DialogueImageSearcher';

const EMPTY_MESSAGE_DATA = {
  speaker: '',
  message: '',
  image: '',
  name: '',
  location: '',
  voice_file: '',
  control_level: '',
  autopilot_offset: '',
  choices: [],
  interrupts: false,
  target_object: '',
  is_emote: false,
  enter_sound: '',
  exit_sound: '',
};

function initialImagePreview(data) {
  if (data.image) {
    return data.image;
  } else if (data.speaker) {
    return speakerSchema[data.speaker].image || '';
  }
}

const CreateDialogueMessageForm = ({
  creationHandler,
  isEdit = false,
  messageData = EMPTY_MESSAGE_DATA,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const [speakerNameSearchOpen, toggleSpeakerNameSearchOpen] = useState(false);
  const [instructionsDialogueOpen, toggleInstructionsDialogueOpen] =
    useState(false);
  const [imagePreview, updateImagePreview] = useState(
    initialImagePreview(messageData)
  );

  const [createAndContinue, toggleCreateAndContinue] = useState(false);
  const [freshStart, toggleFreshStart] = useState(false);

  const [curMessageData, updateCurMessageData] = useState(
    Object.assign({}, EMPTY_MESSAGE_DATA, messageData)
  );

  /**
   * Submits the data
   */
  const submitData = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();

      // Validation
      if (!curMessageData.message) {
        enqueueSnackbar('The message must be specified', { variant: 'error' });
        return;
      }
      if (curMessageData.control_level === 'autopilot') {
        if (
          Number.isNaN(curMessageData.autopilot_offset) ||
          curMessageData.autopilot_offset === ''
        ) {
          enqueueSnackbar('Specify an autopilot offset', { variant: 'error' });
          return;
        }
      }

      const returningMessageData = {
        message: curMessageData.message,
        interrupts: curMessageData.interrupts,
        type: 'message',
      };

      Object.keys(EMPTY_MESSAGE_DATA).forEach((messageDataKey) => {
        if (curMessageData[messageDataKey]) {
          returningMessageData[messageDataKey] = curMessageData[messageDataKey];
        }
      });

      creationHandler(returningMessageData, createAndContinue);

      if (freshStart) {
        updateCurMessageData(EMPTY_MESSAGE_DATA);
      } else {
        updateCurMessageData({
          ...curMessageData,
          message: '',
        });
      }
    },
    [
      curMessageData,
      enqueueSnackbar,
      creationHandler,
      createAndContinue,
      freshStart,
    ]
  );

  /**
   * Abstracts input change in a single method
   */
  const handleInputChange = useCallback(
    (identifier, event, isBoolean = false) => {
      let value = event.target.value;
      if (isBoolean) {
        value = event.target.checked;
      }

      const speakers = Object.keys(speakerSchema);
      let defaultImage = '';

      switch (identifier) {
        case 'image':
          const { speaker } = curMessageData;
          if (speaker && speakers.includes(speaker)) {
            defaultImage = speakerSchema[speaker].image || '';
          }
          updateImagePreview(value || defaultImage);
          break;

        case 'speaker':
          const { image } = curMessageData;
          if (value && speakers.includes(value)) {
            defaultImage = speakerSchema[value].image || '';
          }
          const newImagePreview = image ? image : defaultImage;
          updateImagePreview(newImagePreview);
          break;

        default:
          break;
      }

      updateCurMessageData({
        ...curMessageData,
        [identifier]: value,
      });
    },
    [curMessageData]
  );

  /**
   * Updates the image and the imagePreview.
   */
  const handleImageChange = useCallback(
    (image) => {
      updateCurMessageData({
        ...curMessageData,
        image,
      });
      updateImagePreview(image);
    },
    [curMessageData]
  );

  // Choices

  const addNewChoice = useCallback(
    (choiceData) => {
      const filteredChoices = curMessageData.choices.filter(
        (choice) => choice.key !== choiceData.key
      );
      filteredChoices.push(choiceData);
      updateCurMessageData({
        ...curMessageData,
        choices: filteredChoices,
      });
    },
    [curMessageData]
  );

  const removeChoice = useCallback(
    (choiceKey) => {
      const filteredChoices = curMessageData.choices.filter(
        (choice) => choice.key !== choiceKey
      );
      updateCurMessageData({
        ...curMessageData,
        choices: filteredChoices,
      });
    },
    [curMessageData]
  );

  /**
   * Memoized speaker dropdown
   */
  const speakerDropdown = useMemo(() => {
    const parsedSpeakers = Object.keys(speakerSchema).map((speakerKey) => (
      <MenuItem key={speakerKey} value={speakerKey}>
        {speakerKey} ({speakerSchema[speakerKey].name || <em>No Name</em>})
      </MenuItem>
    ));
    const elements = [
      <MenuItem key="---" value="">
        {' '}
        ---{' '}
      </MenuItem>,
      ...parsedSpeakers,
    ];
    return (
      <TextField
        select
        fullWidth
        label="Speaker"
        value={curMessageData.speaker}
        onChange={(e) => handleInputChange('speaker', e)}
        variant="outlined"
        margin="normal"
      >
        {elements}
      </TextField>
    );
  }, [curMessageData, handleInputChange]);

  return (
    <form onSubmit={submitData}>
      <Grid container spacing={3}>
        {/* Speaker Image */}
        <Grid item xs={12} md={4}>
          <DialogueImageSearcher
            image={imagePreview}
            updateImage={handleImageChange}
            selectedSpeaker={curMessageData.speaker}
          />
          <TextField
            fullWidth
            label="Image"
            onChange={(e) => handleInputChange('image', e)}
            value={curMessageData.image}
            variant="outlined"
            margin="normal"
          />
        </Grid>

        {/* Additional Data */}
        <Grid item xs={12} md={8}>
          {speakerDropdown}
          <TextField
            fullWidth
            label="Name"
            onChange={(e) => handleInputChange('name', e)}
            value={curMessageData.name}
            placeholder="The name that will be displayed on top of the Dialogue"
            variant="outlined"
            margin="normal"
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => toggleSpeakerNameSearchOpen(true)}>
                  <Icon>search</Icon>
                </IconButton>
              ),
            }}
          />
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Enter Sound"
                value={curMessageData.enter_sound}
                onChange={(e) => handleInputChange('enter_sound', e)}
                variant="outlined"
                margin="normal"
                placeholder="Sound when dialogue enters"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Exit Sound"
                value={curMessageData.exit_sound}
                onChange={(e) => handleInputChange('exit_sound', e)}
                variant="outlined"
                margin="normal"
                placeholder="Sound when dialogue exits"
              />
            </Grid>
          </Grid>
          <TextField
            fullWidth
            label="Target Object"
            onChange={(e) => handleInputChange('target_object', e)}
            value={curMessageData.target_object}
            variant="outlined"
            margin="normal"
            placeholder="Object that the dialogue will attach to (node name only)"
          />
        </Grid>
      </Grid>

      <br />
      <Divider />
      <br />

      {/* Message */}
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
            value={curMessageData.message}
            onChange={(e) => handleInputChange('message', e)}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <FormControlLabel
            key="interrupts"
            label="Interrupts Previous"
            control={
              <Switch
                checked={curMessageData.interrupts}
                value={curMessageData.interrupts}
                onChange={(e) => handleInputChange('interrupts', e, true)}
              />
            }
          />
          <br />
          <br />
          <Grid container justifyContent="center">
            <IconButton
              onClick={() =>
                toggleInstructionsDialogueOpen(!instructionsDialogueOpen)
              }
              size="large"
            >
              <Icon>help</Icon>
            </IconButton>
          </Grid>
        </Grid>
      </Grid>

      <br />
      <Divider />
      <br />

      {/* Advanced Options */}
      <SimpleCollapse
        collapsedMessage="Show Advanced Options"
        openedMessage="Hide Advanced Options"
      >
        <TextField
          select
          fullWidth
          label="Location"
          onChange={(e) => handleInputChange('location', e)}
          value={curMessageData.location}
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
          onChange={(e) => handleInputChange('voice_file', e)}
          value={curMessageData.voice_file}
        />
        <TextField
          select
          fullWidth
          label="Control Level"
          onChange={(e) => handleInputChange('control_level', e)}
          value={curMessageData.control_level}
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
          inputProps={{ step: 'any' }}
          onChange={(e) => handleInputChange('autopilot_offset', e)}
          value={curMessageData.autopilot_offset}
        />
      </SimpleCollapse>

      {/* Choices */}
      <CreateChoiceForm
        choices={curMessageData.choices}
        creationHandler={addNewChoice}
        deletionHandler={removeChoice}
      />

      {/* Submit */}
      <Grid container alignItems="flex-end">
        <Grid item xs md={6}>
          {!isEdit && (
            <Grid container justifyContent="flex-start">
              <FormControlLabel
                label="Create and Continue"
                control={
                  <Switch
                    checked={createAndContinue}
                    value={createAndContinue}
                    onChange={(e) =>
                      toggleCreateAndContinue(e.target.checked, true)
                    }
                  />
                }
              />
              <FormControlLabel
                label="Start Fresh"
                control={
                  <Switch
                    checked={freshStart}
                    value={freshStart}
                    onChange={(e) => toggleFreshStart(e.target.checked, true)}
                  />
                }
              />
            </Grid>
          )}
        </Grid>
        <Grid item xs md={6}>
          <Grid container justifyContent="flex-end">
            <Button
              type="submit"
              variant="contained"
              style={{ marginTop: 8 }}
              color="primary"
            >
              {isEdit ? 'Edit' : 'Create'}
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {/* Tag Instructions */}
      <Dialog
        open={instructionsDialogueOpen}
        onClose={() => toggleInstructionsDialogueOpen(false)}
        fullWidth
        maxWidth="xl"
      >
        <DialogTitle>Available Tags</DialogTitle>
        <DialogContent>
          <DialogueMessageInstructions />
        </DialogContent>
      </Dialog>

      {/* Speaker Search */}
      <Dialog
        open={speakerNameSearchOpen}
        onClose={() => toggleSpeakerNameSearchOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Speaker Name Search</DialogTitle>
        <DialogContent>
          <br />
          <SpeakerNameSearchForm
            onSpeakerSelected={(translationKey) => {
              updateCurMessageData({
                ...curMessageData,
                name: translationKey,
              });
              toggleSpeakerNameSearchOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </form>
  );
};

export default CreateDialogueMessageForm;
