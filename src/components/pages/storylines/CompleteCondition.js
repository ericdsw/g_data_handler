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
import createConditionDescription from './functions/createConditionDescription';

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
                        {createConditionDescription(completeCondition)}
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
                onClose={() => toggleDialogue('editDialogue', 'hide')}
                maxWidth='sm'
            >
                <CompleteConditionForm
                    completionType={completeCondition.type}
                    conditionParams={completeCondition.parameters}
                    name={completeCondition.unique_name}
                    buttonText='Update'
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
