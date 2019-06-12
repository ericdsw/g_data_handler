import React, { useState } from 'react';
import { 
    Grid, Card, CardHeader, CardContent,
    CardActions, Collapse, IconButton, Avatar, Icon,
    Table, TableBody, TableCell, TableRow
} from '@material-ui/core';
import { blue, grey } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useDialogueManager } from '../../../hooks';
import { GenericDialogue, ConfirmationDialogue } from '../../elements';
import { CreateEventForm } from './forms';
import { eventSchema } from '../../../globals';
import { createEventDescription } from '../../../functions';

const styles = theme => ({
    eventCard: {
        width: 300,
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: blue[500]
    },
    avatarNonImportant: {
        backgroundColor: grey[300],
        opacity: 0.7
    }
});

function parseParameter(parameter) {
    switch (typeof parameter) {
        case 'boolean':
            return (parameter ? 'True' : 'False');
        case 'object':
            return JSON.stringify(parameter);
        default:
            return parameter;
    }
}

const CutsceneEvent = props => {

    // Extract value properties
    const { classes, cutsceneEventData, rowNumber, eventNumber } = props;

    // Extract method properties
    const { handleEditEvent, handleDeleteEvent } = props;

    // Dialogue management
    const [dialogues, toggleDialogue] = useDialogueManager(
        'editEvent', 'confirmDelete'
    );

    // Expand/collapse management
    const [expanded, toggleExpand] = useState(false);

    // Render props
    const { name, icon } = eventSchema[cutsceneEventData.type];
    const important = cutsceneEventData.parameters.is_important;

    const paramNames = Object.keys(cutsceneEventData.parameters);
    const listParams = paramNames.map((paramName, index) => ( 
        <TableRow key={index}>
            <TableCell 
                align='left'
                padding='none'
                size='small'
            >
                <b>{paramName}</b>
            </TableCell>
            <TableCell align='left'>
                {parseParameter(cutsceneEventData.parameters[paramName])}
            </TableCell>
        </TableRow>
    ));

    return (
        <Grid item>
            <Card className={classes.eventCard} elevation={2}>
                <CardHeader
                    avatar={
                        <Avatar aria-label='Type' className={
                            (typeof important !== 'undefined' && !important) ?
                                classes.avatarNonImportant : classes.avatar
                        }>
                            <Icon>{icon}</Icon>
                        </Avatar>
                    }
                    title={name}
                    subheader={
                        createEventDescription(
                            cutsceneEventData.type,
                            cutsceneEventData.parameters
                        )
                    }
                />
                <CardActions className={classes.actions} disableActionSpacing>
                    <IconButton aria-label='Edit'
                        onClick={() => toggleDialogue('editEvent', 'show')}
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label='Delete'
                        onClick={() => toggleDialogue('confirmDelete', 'show')}
                    >
                        <DeleteIcon />
                    </IconButton>
                    <IconButton
                        className={classnames(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={() => toggleExpand(!expanded)}
                        aria-expanded={expanded}
                        aria-label='More Info'
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout='auto' unmountOnExit>
                    <CardContent>
                        <Table>
                            <TableBody>
                                {listParams}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Collapse>
            </Card>

            <GenericDialogue
                title='Edit Cutscene Event'
                open={dialogues['editEvent']}
                onClose={() => toggleDialogue('editEvent', 'hide')}
            >
                <CreateEventForm
                    existingData={cutsceneEventData}
                    creationHandler={cutsceneData => {
                        handleEditEvent(cutsceneData);
                        toggleDialogue('editEvent', 'hide');
                    }}
                />
            </GenericDialogue>

            <ConfirmationDialogue
                message='Delete the cutscene event?'
                isOpen={dialogues['confirmDelete']}
                handleClose={() => toggleDialogue('confirmDelete', 'hide')}
                handleConfirm={() => {
                    handleDeleteEvent(rowNumber, eventNumber);
                    toggleDialogue('confirmDelete', 'hide');
                }}
            />

        </Grid>
    );
}

export default withStyles(styles)(CutsceneEvent);

