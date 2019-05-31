import React from 'react';
// import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Button, Divider, Paper, Grid } from '@material-ui/core';
// import { updateCutscene } from '../../../actions/cutsceneActions';
// import { eventSchema } from '../../../globals';
import { DragAndDrop } from '../../elements';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
        marginBottom: 24,
    },
    dragCapturer: {
        padding: 16,
        marginTop: 24,
    },
    gridContainer: {
        minHeight: 300,
    }
});

const NoCutscene = props => {
    
    const { classes } = props;
    const { handleEmptyCutscene, handleUpdateFromFile } = props;

    return (
        <div>
            <Button 
                variant='contained' 
                color='primary' 
                onClick={() => handleEmptyCutscene()}
                className={classes.button}
            >
                New Cutscene
            </Button>
            <Divider /> 
            <DragAndDrop handleDrop={files => handleUpdateFromFile(files[0])}>
                <Paper elevation={1} className={classes.dragCapturer}>
                    <Grid container
                        direction='row'
                        justify='center'
                        alignItems='center'
                        className={classes.gridContainer}>
                        <Grid item xs>
                            <Typography 
                                color='textSecondary' 
                                align='center' 
                                variant='h4'>
                                Drag a <code>.json</code> here to edit 
                                an existing cutscene
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </DragAndDrop>
        </div>
    );
}

export default withStyles(styles)(NoCutscene);
