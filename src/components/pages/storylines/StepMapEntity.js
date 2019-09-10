import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Typography,
    IconButton,
    Icon,
    Divider,
    ButtonBase,
    Paper,
    Tooltip
} from '@material-ui/core';
import { blue, red } from '@material-ui/core/colors';

import StepMapEntityParameterList from './elements/StepMapEntityParameterList';
import EditEntityNameForm from './forms/EditEntityNameForm';
import { GenericDialogue, ConfirmationDialogue } from '../../elements';
import { useDialogueManager } from '../../../hooks';

const styles = theme => ({
    typeSubheader: {
        color: blue[400]
    },
    blueText: {
        color: blue[400]
    },
    actions: {
        display: 'flex'
    },
    descriptionWrapper: {
        display: 'flex',
        width: '100%',
    },
    descriptionElement: {
        padding: 16,
        cursor: 'pointer',
        color: '#fff',
        width: '100%',
        fontSize: 14
    },
    redButton: {
        color: '#fff',
        backgroundColor: red[500]
    }
});

const StepMapEntity = props => {

    // Properties
    const { classes, stepMapEntity } = props;

    // Methods
    const {
        handleAddParameter, handleEditParameter, handleDeleteParameter,
        handleAddInteraction, handleEditInteraction, handleDeleteInteraction,
        handleUpdateName, handleDeleteEntity
    } = props;

    const [dialogues, toggleDialogue] = useDialogueManager(
        'viewParameters', 'viewInteractions', 'editName', 'confirmDelete',
        'confirmParameterDelete'
    );

    const paramKeys = Object.keys(stepMapEntity.parameters)
    const paramAmount = paramKeys.length;
    let interactAmount = 0;
    if (typeof(stepMapEntity.configurator_data) !== 'undefined') {
        interactAmount = stepMapEntity.configurator_data.length;
    }

    function getEntityType(entity) {
        switch(entity.type) {
            case 'create_npc':
                return 'Create NPC';
            case 'configure_npc':
                return 'Configure NPC';
            case 'create_area':
                return 'Create Area';
            default:
                return entity.type;
        }
    }

    return (
        <Card>
            <CardHeader
                title={
                    <Typography variant='subtitle1'>
                        {stepMapEntity.name}
                    </Typography>
                }
                subheader={
                    <Typography 
                        variant='caption'
                        className={classes.typeSubheader}
                    >
                        {getEntityType(stepMapEntity)}
                    </Typography>
                }
            />

            <CardContent>
                <ButtonBase 
                    className={classes.descriptionWrapper}
                    onClick={() => toggleDialogue('viewParameters', 'show')}
                >
                    <Paper 
                        elevation={0}
                        className={classes.descriptionElement}
                    >
                        Has {paramAmount} parameters
                    </Paper>
                </ButtonBase>
                <Divider />
                <ButtonBase
                    className={classes.descriptionWrapper}
                    onClick={() => toggleDialogue('viewInteractions', 'show')}
                >
                    <Paper
                        elevation={0}
                        className={classes.descriptionElement}
                    >
                        Contains {interactAmount} interactions
                    </Paper>
                </ButtonBase>
            </CardContent>

            <CardActions className={classes.actions}>
                <Tooltip title='Edit entity name'>
                    <IconButton
                        onClick={() => toggleDialogue('editName', 'show')}
                    >
                        <Icon fontSize='small'>edit</Icon>
                    </IconButton>
                </Tooltip>
                <Tooltip title='Delete entity'>
                    <IconButton
                        onClick={() => toggleDialogue('confirmDelete', 'show')}
                    >
                        <Icon fontSize='small'>delete</Icon>
                    </IconButton>
                </Tooltip>
            </CardActions>

            <GenericDialogue
                title='Edit entity name'
                open={dialogues['editName']}
                onClose={() => toggleDialogue('editName', 'hide')}
                maxWidth='sm'
            >
                <EditEntityNameForm
                    curName={stepMapEntity.name}
                    handleSubmit={newName => {
                        toggleDialogue('editName', 'hide');
                        handleUpdateName(newName);
                    }}
                />
            </GenericDialogue>

            <GenericDialogue
                title='Add Parameters'
                open={dialogues['viewParameters']}
                onClose={() => toggleDialogue('viewParameters', 'hide')}
                maxWidth='md'
            >
                <StepMapEntityParameterList
                    entityParams={stepMapEntity.parameters}
                    handleAddParameter={(name, val) => {
                        handleAddParameter(name, val)
                    }}
                    handleEditParameter={(name, val) => {
                        handleEditParameter(name, val);
                    }}
                    handleDeleteParameter={(name) => handleDeleteParameter(name)}
                />
            </GenericDialogue>

            <GenericDialogue
                title='Interactions'
                open={dialogues['viewInteractions']}
                onClose={() => toggleDialogue('viewInteractions', 'hide')}
                maxWidth='sm'
            >
                {JSON.stringify(stepMapEntity.configurator_data)}
            </GenericDialogue>

            <ConfirmationDialogue
                message={`Delete the entity ${stepMapEntity.name}?`}
                isOpen={dialogues['confirmDelete']}
                handleClose={() => toggleDialogue('confirmDelete', 'hide')}
                handleConfirm={() => {
                    toggleDialogue('confirmDelete', 'hide');
                    handleDeleteEntity();
                }}
            />

        </Card>
    );
}

export default withStyles(styles)(StepMapEntity);
