import React from 'react';
import withStyles from '@mui/styles/withStyles';
import { withSnackbar } from 'notistack';
import {
  TextField,
  Grid,
  Button,
  Chip,
  Tooltip,
  Typography,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { SimpleCollapse } from '../../../elements';

const styles = () => ({
  container: {
    marginTop: 8,
  },
  dataContainer: {
    marginTop: 12,
  },
  choiceChip: {
    margin: 4,
  },
  submitButton: {
    marginTop: 8,
  },
});

class CreateChoiceForm extends React.Component {
  state = {
    newChoiceKey: '',
    newChoiceValue: '',
    newChoiceMessage: '',
    newChoiceIsDefaultCancel: false,
  };

  /**
   * Returns true if the data for a new choice matches an already existing choice
   * (more specifically, that the keys match)
   */
  isOnEditMode = () => {
    const choiceKeyArray = this.props.choices.map(
      (currentChoice) => currentChoice.key
    );
    return choiceKeyArray.includes(this.state.newChoiceKey);
  };

  /**
   * Attempts to create a new choice with the provided data.
   * Will report any validation error that it encounters
   */
  handleAddChoice = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const { creationHandler, enqueueSnackbar } = this.props;
    const {
      newChoiceKey,
      newChoiceValue,
      newChoiceMessage,
      newChoiceIsDefaultCancel,
    } = this.state;

    if (newChoiceKey === '') {
      enqueueSnackbar('Choice key is required', { variant: 'error' });
    } else if (newChoiceValue === '') {
      enqueueSnackbar('Value is required', { variant: 'error' });
    } else {
      const data = {
        key: newChoiceKey,
        value: newChoiceValue,
        isDefaultCancel: newChoiceIsDefaultCancel,
      };
      if (newChoiceMessage) {
        data['next_message'] = newChoiceMessage;
      }
      creationHandler(data);
    }
  };

  /**
   * Removes the choice from the array
   */
  handleDeleteChoice = (choiceKey) => () => {
    const { deletionHandler } = this.props;
    deletionHandler(choiceKey);
  };

  /**
   * Generic input handler
   */
  handleInputChange = (identifier) => (event) => {
    this.setState({ [identifier]: event.target.value });
  };

  /**
   * Input handler for actions that update checkboxes
   */
  handleCheckboxChange = (identifier) => (event) => {
    this.setState({ [identifier]: event.target.checked });
  };

  /**
   * Opens/closes the choice section
   */
  handleToggleVisibility = () => {
    this.setState({ shown: !this.state.shown });
  };

  /**
   * Depending on whether the choice already exists or not, the button will
   * display "Edit" or "Add"
   */
  getButtonName = () => {
    return this.isOnEditMode() ? 'Edit' : 'Add';
  };

  render() {
    const { classes, choices } = this.props;

    // Create choice elements
    const choiceElements = choices.map((currentChoice) => {
      const onClick = () => {
        this.setState({
          ...this.state,
          newChoiceKey: currentChoice.key,
          newChoiceValue: currentChoice.value,
          newChoiceMessage: currentChoice.next_message,
          newChoiceIsDefaultCancel: currentChoice.isDefaultCancel,
        });
        this.props.enqueueSnackbar('Editing the selected choice', {
          variant: 'info',
        });
      };
      if (currentChoice.next_message) {
        return (
          <Tooltip
            key={currentChoice.key}
            title={`To: ${currentChoice.next_message}`}
          >
            <Chip
              color="secondary"
              className={classes.choiceChip}
              label={`${currentChoice.key}:${currentChoice.value}`}
              onDelete={this.handleDeleteChoice(currentChoice.key)}
              onClick={onClick}
              style={{
                order: currentChoice.isDefaultCancel ? '1px solid red' : 'none',
              }}
            />
          </Tooltip>
        );
      } else {
        return (
          <Chip
            key={currentChoice.key}
            color="default"
            className={classes.choiceChip}
            label={`${currentChoice.key}:${currentChoice.value}`}
            onDelete={this.handleDeleteChoice(currentChoice.key)}
            onClick={onClick}
            style={{
              border: currentChoice.isDefaultCancel ? '1px solid red' : 'none',
            }}
          />
        );
      }
    });

    return (
      <SimpleCollapse
        collapsedMessage={`Show Choices (${choices.length})`}
        openedMessage={`Hide Choices (${choices.length})`}
      >
        <Grid container spacing={1} alignItems="stretch">
          <Grid item xs md={6}>
            <TextField
              label="Choice Key*"
              variant="outlined"
              fullWidth
              margin="normal"
              value={this.state.newChoiceKey}
              onChange={this.handleInputChange('newChoiceKey')}
            />
            <TextField
              label="Value*"
              variant="outlined"
              fullWidth
              margin="normal"
              value={this.state.newChoiceValue}
              onChange={this.handleInputChange('newChoiceValue')}
            />
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={8}>
                <TextField
                  label="Next Message"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={this.state.newChoiceMessage}
                  onChange={this.handleInputChange('newChoiceMessage')}
                />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel
                  label="Default Cancel"
                  control={
                    <Checkbox
                      checked={this.state.newChoiceIsDefaultCancel}
                      value={this.state.newChoiceIsDefaultCancel}
                      onChange={this.handleCheckboxChange(
                        'newChoiceIsDefaultCancel'
                      )}
                    />
                  }
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="secondary"
              margin="normal"
              fullWidth
              onClick={this.handleAddChoice}
              className={classes.submitButton}
            >
              {this.getButtonName()}
            </Button>
          </Grid>
          <Grid item xs md={6}>
            {choices.length <= 0 && (
              <Grid container justifyContent="center" alignItems="center">
                <Typography align="center" color="textSecondary">
                  <em>No Choices Found</em>
                </Typography>
              </Grid>
            )}
            {choiceElements}
          </Grid>
        </Grid>
      </SimpleCollapse>
    );
  }
}

export default withSnackbar(withStyles(styles)(CreateChoiceForm));
