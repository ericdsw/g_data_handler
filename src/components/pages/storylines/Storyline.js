import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { 
    Grid, 
    Typography, 
    TextField,
    Button
} from '@material-ui/core';
import { blue, red } from '@material-ui/core/colors';

import StorylineStepContainer from '../../containers/StorylineStepContainer';
import { GenericDialogue } from '../../elements';
import { useDialogueManager } from '../../../hooks';
import StorylineStepForm from './forms/StorylineStepForm';

const styles = theme => ({
    defaultButton: {
        color: blue[500]
    },
    deleteButton: {
        color: red[500]
    },
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        [theme.breakpoints.down('xs')]: {
            paddingLeft: 0,
            paddingRight: 0
        }
    }
});

const Storyline = props => {

    const { classes, storyline } = props;

    const { handleNameChange, handleAddStep } = props;

    const [dialogues, toggleDialogue] = useDialogueManager('createStepDialogue');

    const fileName = `${storyline.name}.json`;

    return (
        <Grid 
            className={classes.root}
            container
            spacing={16}
            alignItems='center'
        >
            <Grid item xs={8}>
                <Typography variant='h4' gutterBottom>
                    Current Storyline: {storyline.name}
                </Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography align='right'>
                    <Button 
                        className={classes.defaultButton}
                        onClick={() => toggleDialogue('createStepDialogue', 'show')}
                    >
                        Add Step
                    </Button>
                    <Button color='secondary'>
                        Export
                    </Button>
                    <Button className={classes.deleteButton}>
                        Clear Storyline
                    </Button>
                </Typography>
            </Grid>
            <Grid item xs={12} lg={6}>
                <TextField
                    id='storyline_name'
                    label='Storyline Name'
                    fullWidth
                    value={storyline.name}
                    variant='outlined'
                    margin='normal'
                    onChange={e => handleNameChange(e.target.value)}
                />
                
            </Grid>
            <Grid item xs={12} lg={6}>
                <TextField
                    id='file_name'
                    label='File Name'
                    fullWidth
                    value={fileName}
                    variant='outlined'
                    margin='normal'
                    disabled
                />
            </Grid>

            {storyline.steps && storyline.steps.map((stepId, index) => {
                return (<Grid item xs={12} key={stepId}>
                    <StorylineStepContainer
                        currentStepId={stepId}
                        stepOffset={index}
                    />
                </Grid>);
            })}

            <Grid item xs={12}>
                <Typography align='center'>
                    <Button 
                        className={classes.defaultButton}
                        onClick={() => toggleDialogue('createStepDialogue', 'show')}
                    >
                        Add Step
                    </Button>
                </Typography>
            </Grid>

            <GenericDialogue
                title='Add Step'
                maxWidth='sm'
                open={dialogues['createStepDialogue']}
                onClose={() => toggleDialogue('createStepDialogue', 'hide')}
            >
                <StorylineStepForm
                    handleSubmit={stepName => {
                        toggleDialogue('createStepDialogue', 'hide');
                        handleAddStep(stepName);
                    }} />
            </GenericDialogue>
        </Grid>
    );
}

export default withStyles(styles)(Storyline);
