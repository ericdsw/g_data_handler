import React, { useState } from 'react';
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
    Tooltip,
    Grid,
    Menu,
    MenuItem
} from '@material-ui/core';
import { blue, red } from '@material-ui/core/colors';

import { interactionInputSchema } from '../../../globals';
import NPCInteractionContainer from '../../containers/NPCInteractionContainer';
import StepMapEntityParameterList from './elements/StepMapEntityParameterList';
import EditEntityNameForm from './forms/EditEntityNameForm';
import CreateNPCInteractionForm from './forms/CreateNPCInteractionForm';
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

    // const interactionMap = {
    //     'cutscene_interaction': 'Cutscene Interaction',
    //     'dialogue_interaction': 'Dialogue Interaction',
    //     'give_item_interaction': 'Give Item Interaction',
    //     'item_cutscene_interaction': 'Item Cutscene Interaction',
    //     'item_dialogue_interaction': 'Item Dialogue Interaction',
    //     'remove_item_interaction': 'Remove Item Interaction'
    // }

    // Properties
    const { classes, stepMapEntity } = props;

    // Methods
    const {
        handleAddParameter, handleEditParameter, handleDeleteParameter,
        handleAddInteraction,
        handleUpdateName, handleDeleteEntity
    } = props;

    const [dialogues, toggleDialogue] = useDialogueManager(
        'viewParameters', 'viewInteractions', 'editName', 'confirmDelete',
        'confirmParameterDelete', 'addInteraction'
    );

    const [curInteractionType, setCurInteractionType] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);

    const interactionTypes = Object.keys(interactionInputSchema);
    const createMenuContent = interactionTypes.map((key, index) => {
        const name = interactionInputSchema[key].name;
        return (
            <MenuItem key={key} onClick={() => handleMenuClick(key)}>
                {name}
            </MenuItem>
        );
    });

    const paramKeys = Object.keys(stepMapEntity.parameters)
    const paramAmount = paramKeys.length;

    let inAmount = 0;
    if (typeof(stepMapEntity.configurator_data) !== 'undefined') {
        inAmount = stepMapEntity.configurator_data.length;
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

    function handleMenuClick(menuValue) {
        setCurInteractionType(menuValue);
        setAnchorEl(null);
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
                        Has {paramAmount} parameter{paramAmount === 1 ? '' : 's'}
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
                        Contains {inAmount} interaction{inAmount === 1 ? '' : 's'}
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
                title={
                    <Grid container>
                        <Grid item xs={9}>
                            <Typography variant='h5'>
                                Interactions
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography align='right'>
                                <IconButton
                                    aria-owns={anchorEl ? 'add_menu' : undefined}
                                    aria-haspopup='true'
                                    onClick={e => setAnchorEl(e.currentTarget)}
                                >
                                    <Icon>add_circle_outline</Icon>
                                </IconButton>
                                <Menu
                                    id='add_menu'
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={() => setAnchorEl(null)}
                                >
                                    {createMenuContent}
                                </Menu>
                            </Typography>
                        </Grid>
                    </Grid>
                }
                open={dialogues['viewInteractions']}
                onClose={() => toggleDialogue('viewInteractions', 'hide')}
                maxWidth='md'
            >
                <Grid container spacing={16}>
                    {stepMapEntity.configurator_data.length <= 0 &&
                        <Grid item xs='12'>
                            <Typography 
                                variant='body2'
                                align='center' 
                                gutterBottom 
                            >
                                <i>No interactions found</i>
                            </Typography>
                        </Grid>
                    }
                    {stepMapEntity.configurator_data.map((id, index) => (
                        <Grid key={id} item xs={12} md={6}> 
                            <NPCInteractionContainer
                                currentInteractionId={id}
                                handleSubmit={data => console.log(data)}
                            />
                        </Grid>
                    ))}
                </Grid>
            </GenericDialogue>

            <GenericDialogue
                title='Create Interaction'
                open={curInteractionType !== ''}
                onClose={() => {
                    setCurInteractionType('');
                }}
            >
                <CreateNPCInteractionForm
                    interactionType={curInteractionType}
                    handleSubmit={data => {
                        handleAddInteraction(curInteractionType, data);
                        setCurInteractionType('');
                    }}
                />
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
