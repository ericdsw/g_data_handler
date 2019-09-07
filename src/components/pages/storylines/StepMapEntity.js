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
} from '@material-ui/core';
import { blue, red } from '@material-ui/core/colors';

import StepMapEntityParameterList from './elements/StepMapEntityParameterList';
import { GenericDialogue } from '../../elements';
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
        handleAddInteraction, handleEditInteraction, handleDeleteInteraction
    } = props;

    const [dialogues, toggleDialogue] = useDialogueManager(
        'viewParameters', 'viewInteractions'
    );

    const paramKeys = Object.keys(stepMapEntity.parameters)
    const paramAmount = paramKeys.length;
    const interactAmount = stepMapEntity.configurator_data.length;

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
                <IconButton>
                    <Icon fontSize='small'>edit</Icon>
                </IconButton>
                <IconButton>
                    <Icon fontSize='small'>delete</Icon>
                </IconButton>
            </CardActions>

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
                    handleEditParameter={() => handleEditParameter()}
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

        </Card>
    );
}

export default withStyles(styles)(StepMapEntity);
