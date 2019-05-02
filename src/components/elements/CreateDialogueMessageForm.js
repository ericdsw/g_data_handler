import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import {
    TextField,
    MenuItem,
    Grid,
    Button,
    FormControlLabel,
    Switch
} from '@material-ui/core';

import { speakerSchema } from '../../globals';

import CreateChoiceForm from './CreateChoiceForm';
import SimpleCollapse from './SimpleCollapse';
import DialogueImageSearcher from './DialogueImageSearcher';

const styles = theme => ({
    imagePreview: {
        backgroundColor: '#ccc',
        width: '100%',
        height: 105,
        marginTop: 12,
    },
    largeAvatar: {
        width: 70,
        height: 70,
    },
    choiceChipContainer: {
        marginTop: 12
    },
    choiceChip: {
        marginRight: 8,
        marginTop: 8,
    }
});

const DEFAULT_STATE = {
    isEdit: false,
    createAndContinue: false,
    freshStart: false,
    imagePreview: '',
    speaker: '',
    message: '',
    image: '',
    name: '',
    location: '',
    voice_file: '',
    control_level: '',
    autopilot_offset: '',
    choices: [],
};

class CreateDialogueMessageForm extends React.Component {

    constructor(props) {
        super(props);
        let stateData = Object.assign({}, DEFAULT_STATE);
        if (props.messageData) {
            stateData = Object.assign({}, stateData, props.messageData);
            if (props.messageData.image) {
                stateData['imagePreview'] = props.messageData.image;
            } else if (props.messageData.speaker) {
                const { speaker } = props.messageData;
                stateData['imagePreview'] = speakerSchema[speaker].image || ''
            }
        }
        this.state = stateData;
    }

    handleToggleAdvanced = () => {
        this.setState({
            showAdvanced: !this.state.showAdvanced
        });
    }

    handleToggleChoices = () => {
        this.setState({
            showChoices: !this.state.showChoices
        });
    }

    submitData = event => {

        event.preventDefault();
        event.stopPropagation();

        if (this.state.message === '') {
            this.props.enqueueSnackbar(
                'The message must be specified', { variant: 'error' }
            );
            return;
        } 
        if (this.state.control_level === 'autopilot') {
            if (this.state.autopilotOffset === '') {
                this.props.enqueueSnackbar(
                    'Specify autopilot offset', { variant: 'error' }
                );
                return;
            }
        }

        let messageData = {
            message: this.state.message
        }
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

        this.props.creationHandler(messageData, this.state.createAndContinue);

        if (this.state.freshStart) {
            this.setState(Object.assign({}, DEFAULT_STATE));
        } else {
            this.setState({ message: '' });
        }
    }

    handleInputChange = (inputIdentifier, isChecked = false) => event => {

        let value = event.target.value;

        if (isChecked) {
            value = event.target.checked;
        }

        const speakers = Object.keys(speakerSchema);

        if (inputIdentifier === 'image') {
            const { speaker } = this.state;
            let defaultImage = '';
            if (speaker && speakers.includes(speaker)) {
                defaultImage = speakerSchema[speaker].image || '';
            }
            this.setState({
                [inputIdentifier]: value,
                imagePreview: (value !== '') ? value : defaultImage
            }); 
        } else if (inputIdentifier === 'speaker') {
            const { image } = this.state;
            let defaultImage = '';
            if (value && speakers.includes(value)) {
                defaultImage = speakerSchema[value].image || '';
            }
            const newImagePreview = (image) ? image : defaultImage;
            this.setState({
                [inputIdentifier]: value,
                imagePreview: newImagePreview
            });
        } else {
            this.setState({
                [inputIdentifier]: value
            });
        }
    }

    handleImageChange = image => {
        this.setState({
            image: image,
            imagePreview: image
        });
    }

    addNewChoice = choiceData => {
        let currentChoices = [...this.state.choices];
        let choiceFound = false;
        currentChoices.forEach(curChoice => {
            if (curChoice.key === choiceData.key) {
                choiceFound = true;
            }
        });
        if (choiceFound) {
            this.props.enqueueSnackbar(
                `The choice ${choiceData.key} is already present`, 
                { variant: 'error' }
            );
        } else {
            currentChoices.push(choiceData);
            this.setState({choices: currentChoices});
        }
    }

    removeChoice = choiceKey => {
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
            choices: currentChoices
        });
    }

    render() {

        let speakerMenuItems = [
            <MenuItem key='---' value=''>---</MenuItem>
        ];
        for (const speakerId in speakerSchema) {
            const name = speakerSchema[speakerId].name
            speakerMenuItems.push(
                <MenuItem key={speakerId} value={speakerId}>
                    {speakerId} ({name || <em>No Name</em>})
                </MenuItem>
            );
        }

        return (
            <form onSubmit={this.submitData}>
                <Grid 
                    container 
                    spacing={16}
                >
                    <Grid item xs md={4}>
                        <DialogueImageSearcher
                            image={this.state.imagePreview}
                            updateImage={this.handleImageChange}
                        />
                    </Grid>
                    <Grid item xs md={8}>
                        <TextField
                            select fullWidth
                            label='Speaker'
                            onChange={this.handleInputChange('speaker')}
                            value={this.state.speaker}
                            variant='outlined'
                            margin='normal'
                        >
                            {speakerMenuItems}
                        </TextField>
                        <TextField
                            fullWidth
                            label='Name'
                            onChange={this.handleInputChange('name')}
                            value={this.state.name}
                            variant='outlined'
                            margin='normal'
                        />
                        <TextField
                            fullWidth
                            label='Image'
                            onChange={this.handleInputChange('image')}
                            value={this.state.image}
                            variant='outlined'
                            margin='normal'
                        />
                    </Grid>
                </Grid>
                <TextField
                    fullWidth
                    variant='outlined'
                    margin='normal'
                    label='Message'
                    multiline
                    rows='3'
                    value={this.state.message}
                    onChange={this.handleInputChange('message')}
                />
                <SimpleCollapse
                    collapsedMessage='Show Advanced Options'
                    openedMessage='Hide Advanced Options'
                >
                    <TextField
                        select fullWidth
                        label='Location'
                        onChange={this.handleInputChange('location')}
                        value={this.state.location}
                        variant='outlined'
                        margin='normal'
                    >
                        <MenuItem value=''>---</MenuItem>
                        <MenuItem value='top'>Top</MenuItem>
                        <MenuItem value='bottom'>Bottom</MenuItem>
                    </TextField>
                    <TextField
                        label='Voice File'
                        variant='outlined'
                        fullWidth
                        margin='normal'
                        onChange={this.handleInputChange('voice_file')}
                        value={this.state.voice_file} 
                    />
                    <TextField
                        select fullWidth
                        label='Control Level'
                        onChange={this.handleInputChange('control_level')}
                        value={this.state.control_level}
                        variant='outlined'
                        margin='normal'
                    >
                        <MenuItem value='' selected>Default</MenuItem>
                        <MenuItem value='autopilot'>Autopilot</MenuItem>
                        <MenuItem value='non_blocking'>Non Blocking</MenuItem>
                    </TextField>
                    <TextField
                        label='Autopilot Offset'
                        type='number'
                        variant='outlined'
                        fullWidth
                        margin='normal'
                        onChange={this.handleInputChange('autopilot_offset')}
                        value={this.state.autopilot_offset} 
                    />
                </SimpleCollapse>
                <CreateChoiceForm 
                    choices={this.state.choices}
                    creationHandler={this.addNewChoice}
                    deletionHandler={this.removeChoice}
                />
                <Grid 
                    container
                    alignItems='flex-end'
                >
                    <Grid item xs md={6}>
                        { ! this.props.isEdit &&
                            <Grid container justify='flex-start'>
                                <FormControlLabel
                                    label='Create and Continue'
                                    control={
                                        <Switch
                                            checked={this.state.createAndContinue}
                                            value={this.state.createAndContinue}
                                            onChange={this.handleInputChange(
                                                'createAndContinue', true
                                            )}
                                        />
                                    }
                                />
                                <FormControlLabel
                                    label='Start Fresh'
                                    control={
                                        <Switch
                                            checked={this.state.freshStart}
                                            value={this.state.freshStart}
                                            onChange={this.handleInputChange(
                                                'freshStart', true
                                            )}
                                        />
                                    }
                                />
                            </Grid>
                        }
                    </Grid>
                    <Grid item xs md={6}>
                        <Grid container justify='flex-end'>
                            <Button
                                type='submit'
                                variant='contained'
                                style={{ marginTop: 8 }}
                                color='primary'
                            >
                                {(this.props.isEdit) ? 'Edit' : 'Create'}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        );
    }
}

export default withSnackbar(withStyles(styles)(CreateDialogueMessageForm));
