import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import {
    TextField,
    Grid,
    Button,
    Chip,
    Tooltip,
    Typography,
} from '@material-ui/core';
import { SimpleCollapse } from '../../../elements';

const styles = theme => ({
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
    }
});

class CreateChoiceForm extends React.Component {

    state = {
        newChoiceKey: '',
        newChoiceValue: '',
        newChoiceMessage: '',
    }

    handleAddChoice = event => {

        event.preventDefault();
        event.stopPropagation();

        const { creationHandler, enqueueSnackbar } = this.props;
        const { newChoiceKey, newChoiceValue, newChoiceMessage } = this.state;

        if (newChoiceKey === '') {
            enqueueSnackbar('Choice key is required', {variant: 'error'});
        } else if (newChoiceValue === '') {
            enqueueSnackbar('Value is required', {variant: 'error'});
        } else {
            const data = {
                key: newChoiceKey,
                value: newChoiceValue
            };
            if (newChoiceMessage) {
                data['next_message'] = newChoiceMessage;
            }
            creationHandler(data);
        }
    }

    handleDeleteChoice = choiceKey => event => {
        const { deletionHandler } = this.props;
        deletionHandler(choiceKey);
    }

    handleInputChange = identifier => event => {
        this.setState({[identifier]: event.target.value});
    }

    handleToggleVisibility = () => {
        this.setState({shown: !this.state.shown});
    }

    render() {

        const { classes, choices } = this.props;

        // Create choice elements
        const choiceElements = choices.map(currentChoice => {
            if (currentChoice.next_message) {
                return (
                    <Tooltip 
                        key={currentChoice.key}
                        title={`To: ${currentChoice.next_message}`}
                    >
                        <Chip
                            color='primary'
                            className={classes.choiceChip}
                            label={`${currentChoice.key}:${currentChoice.value}`} 
                            onDelete={this.handleDeleteChoice(currentChoice.key)}
                        />
                    </Tooltip>
                );
            } else {
                return (
                    <Chip 
                        key={currentChoice.key}
                        color='default'
                        className={classes.choiceChip}
                        label={`${currentChoice.key}:${currentChoice.value}`} 
                        onDelete={this.handleDeleteChoice(currentChoice.key)}
                    />
                );
            }
        });

        return (
            <SimpleCollapse
                collapsedMessage={`Show Choices (${choices.length})`}
                openedMessage={`Hide Choices (${choices.length})`}
            >
                <Grid container 
                    spacing={8}
                    alignItems='stretch'
                >
                    <Grid item xs md={6}>
                        <TextField
                            label='Choice Key*'
                            variant='outlined'
                            fullWidth
                            margin='normal'
                            value={this.state.newChoiceKey}
                            onChange={this.handleInputChange('newChoiceKey')}
                        />
                        <TextField
                            label='Value*'
                            variant='outlined'
                            fullWidth
                            margin='normal' 
                            value={this.state.newChoiceValue}
                            onChange={this.handleInputChange('newChoiceValue')}
                        />
                        <TextField
                            label='Next Message'
                            variant='outlined'
                            fullWidth
                            margin='normal' 
                            value={this.state.newChoiceMessage}
                            onChange={this.handleInputChange('newChoiceMessage')}
                        />
                        <Button
                            variant='contained'
                            color='secondary'
                            margin='normal'
                            fullWidth
                            onClick={this.handleAddChoice}
                            className={classes.submitButton}
                        >
                            Add
                        </Button>
                    </Grid>
                    <Grid item xs md={6}>
                        {choices.length <= 0 &&
                            <Grid 
                                container 
                                justify='center' 
                                alignItems='center'
                            >
                                <Typography align='center' color='textSecondary'>
                                    <em>No Choices Found</em>
                                </Typography>
                            </Grid>
                        }
                        {choiceElements}
                    </Grid>
                </Grid>
            </SimpleCollapse>
        );
    }
}

export default withSnackbar(withStyles(styles)(CreateChoiceForm));
