import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, Divider, Paper, Grid, Typography } from '@material-ui/core';
import { DragAndDrop } from '../../../elements';

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

const NoDialogue = props => {

    const { classes } = props;
    const { handleEmptyDialogue, handleUpdateFromFile } = props;

    return (
        <div>
            <Button
                variant='contained' 
                color='primary' 
                onClick={() => handleEmptyDialogue()}
                className={classes.button}>
                New Dialogue
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
                                an existing dialogue file
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>

            </DragAndDrop>
        </div>
    );
}

export default withStyles(styles)(NoDialogue);

