import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid, Typography } from '@material-ui/core';
import { CutsceneRowToolbar } from './elements';
import { CreateEventForm } from './forms';
import CutsceneEventContainer from '../../containers/CutsceneEventContainer';
import { GenericDialogue, ConfirmationDialogue } from '../../elements';
import { useDialogueManager } from '../../../hooks';

import { styles } from './styles/CutsceneRowStyle';

const CutsceneRow = props => {

    const { classes, rowData, rowNumber } = props;
    const { 
        handleAddRowBelow, handleAddRowAbove, handleDeleteRow, handleAddEvent 
    } = props;

    const [dialogues, toggleDialogue] = useDialogueManager(
        'confirmDelete', 'createEvent'
    );

    return (
        <Grid item xs={12}>
            <Paper className={classes.cutsceneRow} elevation={1}>
                <Grid container alignItems='center'>
                    <Grid item xs={4}>
                        <Typography variant='h6' gutterBottom align='left'>
                            &nbsp;{rowNumber}
                        </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <CutsceneRowToolbar
                            addAboveClick={() => handleAddRowAbove()}
                            addBelowClick={() => handleAddRowBelow()}
                            addEventClick={() => {
                                toggleDialogue('createEvent', 'show')
                            }}
                            deleteRowClick={() => {
                                toggleDialogue('confirmDelete', 'show')
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid 
                    container 
                    direction="row"
                    justify="center" 
                    spacing={16}
                >
                    {rowData.map((cutsceneData, index) => (
                        <CutsceneEventContainer
                            key={index}
                            rowNumber={rowNumber}
                            eventNumber={index}
                            cutsceneEventData={cutsceneData}
                        />
                    ))}
                </Grid>
            </Paper>

            <GenericDialogue
                title="Create Cutscene Event"
                open={dialogues['createEvent']}
                maxWidth='sm'
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

