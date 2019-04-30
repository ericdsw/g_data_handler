import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import {
    TextField,
    MenuItem,
    Grid,
    Button,
    IconButton,
    Menu,
    Avatar,
    Typography,
    Icon,
    Chip,
    Tooltip,
    FormControlLabel,
    Switch
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import { speakerSchema } from '../../globals';
import { speakerImages } from '../../globals/speakerSchema';

const ITEM_HEIGHT = 48;

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

class CreateDialogueMessageForm extends React.Component {

    

    constructor(props) {
        super(props);
        if (props.messageData) {

            const data = props.messageData;

            this.state = {
                anchorEl: null,
                showAdvanced: false,
                showChoices: false,
                isEdit: true,
                createAndContinue: false,

                speaker: data.speaker ? data.speaker : '',
                message: data.message ? data.message : '',
                image: data.image ? data.image : '',

                name: data.name ? data.name : '',
                location: data.location ? data.location : '',
                voice: data.voice_file ? data.voice_file : '',
                controlLevel: data.control_level ? data.control_level : '',
                autopilotOffset: data.autopilot_offset ? data.autopilot_offset : '',

                choices: data.choices ? data.choices : [],

                newChoiceKey: '',
                newChoiceValue: '',
                newChoiceMessage: '',
            }
        } else {
            this.state = {
                anchorEl: null,
                showAdvanced: false,
                showChoices: false,
                isEdit: false,
                createAndContinue: false,

                speaker: '',
                message: '',
                image: '',

                name: '',
                location: '',
                voice: '',
                controlLevel: '',
                autopilotOffset: '',

                choices: [],

                newChoiceKey: '',
                newChoiceValue: '',
                newChoiceMessage: '',
            }
        }
    }

    submitData = event => {

        event.preventDefault();
        event.stopPropagation();

        if (this.state.message === '') {
            this.props.enqueueSnackbar(
                'The message must be specified',
                {variant:'error'}
            );
            return;
        } 
        if (this.state.controlLevel === 'autopilot') {
            if (this.state.autopilotOffset === '') {
                this.props.enqueueSnackbar(
                    'If the control level is Auto Pilot, the Auto Pilot \
                    Offset must be specified',
                    {variant: 'error'}
                );
                return;
            }
        }

        let messageData = {
            message: this.state.message
        }
        if (this.state.speaker) { messageData.speaker = this.state.speaker; }
        if (this.state.image) { messageData.image = this.state.image; }
        if (this.state.name) { messageData.name = this.state.name; }
        if (this.state.location) { messageData.location = this.state.location; }
        if (this.state.voice) { messageData.voice_file = this.state.voice; }
        if (this.state.controlLevel) { 
            messageData.control_level = this.state.controlLevel; 
        }
        if (this.state.autopilotOffset) {
            messageData.autopilot_offset = this.state.autopilotOffset
        }
        if (this.state.choices.length > 0) {
            messageData.choices = this.state.choices;
        }
        this.props.creationHandler(messageData, this.state.createAndContinue);
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

    handleInputChange = (inputIdentifier, isChecked = false) => event => {
        let value = event.target.value;
        if (isChecked) {
            value = event.target.checked;
        }
        this.setState({
            [inputIdentifier]: value
        });
    }

    handleSearchImageShow = event => {
        this.setState({anchorEl: event.currentTarget});
    }

    handleSearchImageClose = () => {
        this.setState({anchorEl: null})
    }

    updateSpeakerImage = speakerImage => event => {
        this.setState({
            anchorEl: null,
            image: speakerImage
        });
    }

    addNewChoice = () => {

        if (this.state.newChoiceKey === '' || this.state.newChoiceValue === '') {
            this.props.enqueueSnackbar(
                'The key and value properties are required',
                {variant: 'error'}
            );
        } else {
            let currentChoices = [...this.state.choices];
            currentChoices.push({
                key: this.state.newChoiceKey,
                value: this.state.newChoiceValue,
                next_message: this.state.newChoiceMessage
            });
            this.setState({
                choices: currentChoices,
                newChoiceKey: '',
                newChoiceValue: '',
                newChoiceMessage: ''
            });
        }
    }

    removeChoice = choice => event => {
        let deleteIndex = -1;
        let currentChoices = [...this.state.choices];
        currentChoices.forEach((curChoice, index) => {
            if (curChoice.key === choice.key) {
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

        const { classes } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        const advancedButton = (
            <Button style={{marginTop: 8}}onClick={this.handleToggleAdvanced} >
                {!this.state.showAdvanced ? 
                    <React.Fragment>
                        Show Advanced Options
                        <Icon>expand_more</Icon>
                    </React.Fragment> :
                    <React.Fragment>
                        Hide Advanced Options
                        <Icon>expand_less</Icon>
                    </React.Fragment>
                }
            </Button>
        );

        const choicesButton = (
            <Button style={{marginTop:8}} onClick={this.handleToggleChoices}>
                {!this.state.showChoices ?
                    <React.Fragment>
                        Show Choices ({this.state.choices.length})
                        <Icon>expand_more</Icon>
                    </React.Fragment> :
                    <React.Fragment>
                        Hide Choices ({this.state.choices.length})
                        <Icon>expand_less</Icon>
                    </React.Fragment>
                }
            </Button>
        );

        let speakerMenuItems = [
            <MenuItem key='---' value=''>---</MenuItem>
        ];
        for (const speakerId in speakerSchema) {
            speakerMenuItems.push(
                <MenuItem key={speakerId} value={speakerId}>
                    {speakerId}
                </MenuItem>
            );
        }

        const showSearchImageButton = (
            this.state.image === '' ||
            ! speakerImages.includes(this.state.image)
        )

        return (
            <form onSubmit={this.submitData}>
                <Grid container spacing={8}>
                    <Grid item xs md={3}>
                        <Grid 
                            container
                            justify='center'
                            alignItems='center'
                            className={classes.imagePreview}>
                            {showSearchImageButton &&
                            
                                <div>
                                    <IconButton 
                                        aria-label='Select image'
                                        aria-owns={open ? 'image-menu' : undefined}
                                        onClick={this.handleSearchImageShow}
                                        aria-haspopup='true'>
                                        <SearchIcon />
                                    </IconButton>
                                    <Menu
                                        id='image-menu'
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={this.handleSearchImageClose}
                                        PaperProps={{
                                            style: {
                                                maxHeight: ITEM_HEIGHT * 4.5,
                                                width: 200
                                            },
                                        }}>
                                        {speakerImages.map(image => (
                                            <MenuItem 
                                                key={image}
                                                onClick={
                                                    this.updateSpeakerImage(image)
                                                }>
                                                    <Avatar src={`images/${image}`} />
                                                    <Typography variant='body2'>
                                                        {image}
                                                    </Typography>
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </div>
                            }
                            {!showSearchImageButton &&
                                <Avatar 
                                    className={classes.largeAvatar} 
                                    src={`images/${this.state.image}`} />
                            }
                        </Grid>
                        <TextField
                            id='image'
                            fullWidth
                            label='Image'
                            margin='normal'
                            variant='outlined'
                            onChange={this.handleInputChange('image')}
                            value={this.state.image} />
                    </Grid>
                    <Grid item xs md={9}>
                        <TextField
                            id='speaker_select'
                            select fullWidth
                            label='Speaker'
                            variant='outlined'
                            margin='normal'
                            onChange={this.handleInputChange('speaker')}
                            value={this.state.speaker}>
                            {speakerMenuItems}
                        </TextField>
                        <TextField
                            id='message'
                            label='Message*'
                            variant='outlined'
                            multiline fullWidth rows={3}
                            margin='normal'
                            onChange={this.handleInputChange('message')}
                            value={this.state.message} />
                    </Grid>
                </Grid>

                <div>
                    {advancedButton}
                </div>

                <div style={{
                    display: this.state.showAdvanced ? 'block' : 'none',
                    padding: '10 0'
                }}>
                    <TextField
                        id='name'
                        fullWidth
                        label='Name'
                        onChange={this.handleInputChange('name')}
                        value={this.state.name}
                        variant='outlined'
                        margin='normal' />
                    <TextField
                        id='location'
                        select fullWidth
                        label='Location'
                        onChange={this.handleInputChange('location')}
                        value={this.state.location}
                        variant='outlined'
                        margin='normal'>
                        <MenuItem value=''>---</MenuItem>
                        <MenuItem value='top'>Top</MenuItem>
                        <MenuItem value='bottom'>Bottom</MenuItem>
                    </TextField>
                    <TextField
                        id='voice'
                        label='Voice File'
                        variant='outlined'
                        fullWidth
                        margin='normal'
                        onChange={this.handleInputChange('voice')}
                        value={this.state.voice} />
                    <TextField
                        id='controlLevel'
                        select fullWidth
                        label='Control Level'
                        onChange={this.handleInputChange('controlLevel')}
                        value={this.state.controlLevel}
                        variant='outlined'
                        margin='normal'>
                        <MenuItem value='' selected>Default</MenuItem>
                        <MenuItem value='autopilot'>Autopilot</MenuItem>
                        <MenuItem value='non_blocking'>Non Blocking</MenuItem>
                    </TextField>
                    <TextField
                        id='autopilotOffset'
                        label='Autopilot Offset'
                        type='number'
                        variant='outlined'
                        fullWidth
                        margin='normal'
                        onChange={this.handleInputChange('autopilotOffset')}
                        value={this.state.autopilotOffset} />
                </div>

                <div>
                    {choicesButton}
                </div>

                <Grid
                    container
                    spacing={8}
                    style={{
                        display: this.state.showChoices ? 'flex' : 'none',
                        padding: '10 0'
                    }}>
                    <Grid item xs md={6}>
                        <TextField
                            id='newChoiceKey'
                            label='Choice Key*'
                            variant='outlined'
                            fullWidth
                            margin='normal'
                            onChange={this.handleInputChange('newChoiceKey')}
                            value={this.state.newChoiceKey} />
                        <TextField
                            id='newChoiceValue'
                            label='Value*'
                            variant='outlined'
                            fullWidth
                            margin='normal'
                            onChange={this.handleInputChange('newChoiceValue')}
                            value={this.state.newChoiceValue} />
                        <TextField
                            id='newChoiceNextMessage'
                            label='Next Message'
                            variant='outlined'
                            fullWidth
                            margin='normal'
                            onChange={this.handleInputChange('newChoiceMessage')}
                            value={this.state.newChoiceMessage} />
                        <Button
                            variant='contained'
                            color='secondary'
                            margin='normal'
                            fullWidth
                            onClick={this.addNewChoice}>
                            Add Choice
                        </Button>
                    </Grid>

                    <Grid
                        item xs md={6}
                        className={classes.choiceChipContainer}>

                        {this.state.choices.length <= 0 &&
                            <Typography align='center' color='textSecondary'>
                                <em>No Choices found</em>
                            </Typography>
                        }

                        {this.state.choices.map(choice => {
                            if (choice.next_message) {
                                return (
                                    <Tooltip 
                                        key={choice.key}
                                        title={`To: ${choice.next_message}`}>
                                        <Chip
                                            onDelete={this.removeChoice(choice)}
                                            color='primary'
                                            className={classes.choiceChip}
                                            label={`${choice.key}: ${choice.value}`} />
                                    </Tooltip>
                                );
                            } else {
                                return (
                                    <Chip
                                        key={choice.key}
                                        onDelete={this.removeChoice(choice)}
                                        color='default'
                                        className={classes.choiceChip}
                                        label={`${choice.key}: ${choice.value}`} />
                                );
                            }
                        })}

                    </Grid>
                </Grid>
                
                <Grid justify='flex-end' container>
                    { (!this.state.isEdit) ? 
                        <React.Fragment>
                            <FormControlLabel
                                key='createAndContinue'
                                label='Create and Continue'
                                control={
                                    <Switch
                                        checked={this.state.createAndContinue}
                                        onChange={
                                            this.handleInputChange(
                                                'createAndContinue', true
                                            )
                                        }
                                        value={this.state.createAndContinue} />
                                }
                            />
                            <Button
                                type='submit'
                                variant='contained'
                                style={{marginTop:8}}
                                color='primary'>
                                Add Message
                            </Button>
                        </React.Fragment>
                            :
                            <Button
                                type='submit'
                                variant='contained'
                                style={{marginTop:8}}
                                color='primary'>
                            Edit Message
                        </Button>
                    }
                </Grid>
            </form>
        );
    }

}

export default withSnackbar(withStyles(styles)(CreateDialogueMessageForm));
