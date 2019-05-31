import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { 
    Paper, Grid, Typography, IconButton, Tooltip
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
// import InputIcon from '@material-ui/icons/Input';

import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom';
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';

import CutsceneEventContainer from '../../containers/CutsceneEventContainer';
import { CreateEventForm } from './forms';
import { GenericDialogue, ConfirmationDialogue } from '../../elements';
import { useDialogueManager } from '../../../hooks';

const styles = theme => ({
    cutsceneRow: {
        margin: `${theme.spacing.unit}px auto`,
        padding: 16,
        paddingBottom: 24,
    }
});

const CutsceneRow = props => {

    const { classes, rowData, rowNumber } = props;
    const { 
        handleAddRowBelow, handleAddRowAbove, handleDeleteRow, handleAddEvent 
    } = props;

    const [dialogues, toggleDialogue] = useDialogueManager(
        'confirmDelete', 'createEvent'
    );

    let data = rowData;

    const cutsceneArray = data.map((cutsceneData, index) => {
        return (
            <CutsceneEventContainer
                key={index}
                rowNumber={rowNumber}
                eventNumber={index}
                cutsceneEventData={cutsceneData}
            />
        );
    })

    return (
        <Grid item xs={12}>
            <Paper className={classes.cutsceneRow} elevation={1}>
                <Grid container alignItems='center'>
                    <Grid item xs={4}>
                        <Typography variant='h6' gutterBottom align='left'>
                            {rowNumber}
                        </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography variant='h6' gutterBottom align='right'>
                            <Tooltip
                                title='Add row above'
                                enterDelay={200}
                            >
                                <IconButton
                                    onClick={() => handleAddRowAbove()}
                                    aria-label='add-row-above'
                                >
                                    <VerticalAlignTopIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip
                                title='Add row below'
                                enterDelay={200}
                            >
                                <IconButton
                                    onClick={() => handleAddRowBelow()}
                                    aria-label='add-row-below'
                                >
                                    <VerticalAlignBottomIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip 
                                title='Add Cutscene Event' 
                                enterDelay={200}
                            >
                                <IconButton 
                                    onClick={() => {
                                        toggleDialogue('createEvent', 'show')
                                    }}
                                    aria-label='add'
                                >
                                    <AddIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip 
                                title='Delete Row'
                                enterDelay={200}
                            >
                                <IconButton 
                                    onClick={() => {
                                        toggleDialogue('confirmDelete', 'show')
                                    }}
                                    aria-label='delete'
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                        </Typography>
                    </Grid>
                </Grid>
                <Grid 
                    container 
                    direction="row"
                    justify="center" 
                    spacing={16}
                >
                    {cutsceneArray}
                </Grid>
            </Paper>

            <GenericDialogue
                title="Create Cutscene Event"
                open={dialogues['createEvent']}
                onClose={() => toggleDialogue('createEvent', 'hide')}
            >
                <CreateEventForm 
                    creationHandler={eventData => {
                        handleAddEvent(eventData);
                        toggleDialogue('createEvent', 'hide')
                    }} 
                />
            </GenericDialogue>

            <ConfirmationDialogue
                message="Delete the cutscene row?"
                isOpen={dialogues['confirmDelete']}
                handleClose={() => toggleDialogue('confirmDelete', 'hide')}
                handleConfirm={() => {
                    handleDeleteRow();
                    toggleDialogue('confirmDelete', 'hide');
                }}
            />

        </Grid>
    );
}

export default withStyles(styles)(CutsceneRow);

