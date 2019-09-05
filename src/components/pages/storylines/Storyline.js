import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography, TextField } from '@material-ui/core';

import StorylineStepContainer from '../../containers/StorylineStepContainer';

const styles = theme => ({
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

    const { handleNameChange } = props;

    const fileName = `${storyline.name}.json`;

    return (
        <Grid 
            className={classes.root}
            container
            spacing={16}
            alignItems="center"
        >
            <Grid item xs={12}>
                <Typography variant='h4' gutterBottom>
                    Current Storyline: {storyline.name}
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
            
        </Grid>
    );
}

export default withStyles(styles)(Storyline);
