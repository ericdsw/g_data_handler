import React from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import {
    Button,
    Divider,
    Paper,
    Grid,
    Typography
} from '@material-ui/core';
import DragAndDrop from './DragAndDrop';
import { updateDialogue } from '../../actions/dialogueActions';
import { parseFile } from '../../functions';

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

class NoDialogue extends React.Component {

    handleDrop = files => {

        const firstFile = files[0];
        parseFile(firstFile, 'application/json')
            .then(json => {
                const fileName = firstFile.name;
                this.props.updateDialogue({
                    dialogueData: json,
                    fileName
                });
            })
            .catch(error => {
                this.props.enqueueSnackbar(error.message, {variant:'error'})
            });
    }

    handleNewEmptyDialogue = () => {
        this.props.updateDialogue({
            dialogueData: {},
            fileName: 'file_name.json'
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button 
                    variant='contained' 
                    color='primary' 
                    onClick={this.handleNewEmptyDialogue}
                    className={classes.button}>
                    New Dialogue
                </Button>
                <Divider /> 
                <DragAndDrop handleDrop={this.handleDrop}>

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
}

export default connect(null, {
    updateDialogue
})(
    withSnackbar(
        withStyles(styles)(NoDialogue)
    )
);
