import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Paper,
    Typography,
    ButtonBase,
    Collapse,
    List,
    ListItem,
    IconButton,
    Icon,
    Divider
} from '@material-ui/core';
import { blue, green } from '@material-ui/core/colors';

import { 
    GenericDialogue, ConfirmationDialogue 
} from '../../elements';
import { useDialogueManager } from '../../../hooks';
import CompleteConditionForm from './forms/CompleteConditionForm';

const styles = theme => ({
    conditionContainer: {
        padding: 16,
        width: '100%'
    },
    interactionTypeText: {
        color: blue[400]
    },
    greenText: {
        color: green[400],
        fontWeight: 'bold'
    },
    summaryWrapper: {
        display: 'flex',
        width: '100%'
    },
});

const CompleteCondition = props => {

    function getTypeString(condition) {
        switch(condition.type) {
            case 'npc_interaction':
                return (
                    <React.Fragment>
                        Interact with&nbsp;
                        <span className={classes.greenText}>
                            {condition.parameters.target_npc}
                        </span>
                    </React.Fragment>
                );
            case 'npc_finished_dialogues':
                return (
                    <React.Fragment>
                        Exhaust&nbsp;
                        <span className={classes.greenText}>
                            {condition.parameters.target_npc}
                        </span> dialogues
                    </React.Fragment>
                );
            case 'enter_trigger_area':
                return (
                    <React.Fragment>
                        Enter Area&nbsp;
                        <span className={classes.greenText}>
                            {condition.parameters.target_area_name}
                        </span>
                    </React.Fragment>
                );
            case 'got_item':
                return 'Get Item';
            case 'choice_selected':
                return 'Select Choice in Dialogue';
            case 'advance_storyline':
                return 'Advance Storyline';
            case 'storyline_message':
                return 'Listen to Message';
            default:
                return condition;
        }
    }

    const { classes, completeCondition } = props;

    const { handleDeleteCondition, handleEditCondition } = props;

    const [dialogues, toggleDialogue] = useDialogueManager(
        'confirmDelete', 'editDialogue'
    );
    const [expanded, toggleExpand] = useState(false);

    const paramList = Object.keys(completeCondition.parameters).map((key, i) => (
        <ListItem key={key}>
            <Typography variant='caption'>
                <b>{key}</b>: <i>{completeCondition.parameters[key]}</i>
            </Typography>
        </ListItem>
    ));

    return (
        <div>
            <ButtonBase className={classes.summaryWrapper}>
                <Paper
                    square
                    elevation={0}
                    className={classes.conditionContainer}
                    onClick={e => toggleExpand(!expanded)}
                >
                    <Typography variant='caption'>
                        {completeCondition.unique_name}
                    </Typography>
                    <Typography 
                        variant='caption'
                        className={classes.interactionTypeText}
                    >
                        {getTypeString(completeCondition)}
                    </Typography>
                </Paper>
            </ButtonBase>
            <Collapse
                in={expanded}
                timeout='auto'
                unmountOnExit
            >
                <Divider />
                <Paper 
                    square 
                    elevation={0}
                    className={classes.conditionContainer}
                >
                    <List component='nav'>
                        {paramList}
                    </List>
                    <Typography align='left'>
                        <IconButton
                            onClick={() => toggleDialogue('editDialogue', 'show')}
                        >
                            <Icon>edit</Icon>
                        </IconButton>
                        <IconButton
                            onClick={() => toggleDialogue('confirmDelete', 'show')}
                        >
                            <Icon>delete</Icon>
                        </IconButton>
                    </Typography>
                </Paper>
            </Collapse>

            <ConfirmationDialogue
                message={`Delete the condition ${completeCondition.unique_name}?`}
                isOpen={dialogues['confirmDelete']}
                handleClose={() => toggleDialogue('confirmDelete', 'hide')}
                handleConfirm={() => {
                    toggleDialogue('confirmDelete', 'hide');
                    handleDeleteCondition();
                }}
            />

            <GenericDialogue
                title={`Edit the current condition`}
                open={dialogues['editDialogue']}
                handleClose={() => toggleDialogue('editDialogue', 'hide')}
            >
                <CompleteConditionForm
                    completionType={completeCondition.type}
                    conditionParams={completeCondition.parameters}
                    name={completeCondition.unique_name}
                    handleSubmit={(name, data) => {
                        toggleDialogue('editDialogue', 'hide');
                        handleEditCondition(name, data);
                    }}
                />
            </GenericDialogue>

        </div>
    )
}

export default withStyles(styles)(CompleteCondition);
