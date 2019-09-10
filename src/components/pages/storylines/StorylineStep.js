import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import {
    Grid,
    Typography, 
    Card, 
    CardHeader,
    CardContent,
    CardActions,
    Collapse,
    IconButton,
    Icon,
    Divider,
    Tooltip
} from '@material-ui/core';
import { blue, green, grey } from '@material-ui/core/colors';

import StepMapContainer from '../../containers/StepMapContainer';
import CompletionBundleContainer from '../../containers/CompletionBundleContainer';

import { GenericDialogue, ConfirmationDialogue } from '../../elements';
import { useDialogueManager } from '../../../hooks';
import CreateMapEntityForm from './forms/CreateMapEntityForm';
import CompletionBundleForm from './forms/CompletionBundleForm';
import StorylineStepForm from './forms/StorylineStepForm';

const styles = theme => ({
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)'
    },
    headerSmall: {
        color: '#aaa',
        fontSize: '0.7em'
    },
    descriptionList: {
        color: '#fff',
        lineHeight: '200%'
    },
    blueText: {
        color: blue[400]
    },
    greenText: {
        color: green[400]
    },
    greyText: {
        color: grey[400]
    }
});

const StorylineStep = props => {

    // Properties
    const { 
        classes, storylineStep, stepOffset,
        completionDescription, configDescription
    } = props;

    // Methods
    const { 
        handleUpdateStepName, handleAddMapConfiguration, handleAddCompletionBundle,
        handleDeleteStep
    } = props;

    const [dialogues, toggleDialogue] = useDialogueManager(
        'createMapEntity', 'createCompletionBundle', 'editName', 'confirmDelete'
    );

    const [expanded, toggleExpanded] = useState(false);

    const mapCount = storylineStep.configuration.length
    const bundleCount = storylineStep.completion.length
    const subHeader = `Configure ${mapCount} maps, watch ${bundleCount} bundles`;

    let fString = '';
    if (stepOffset === 0) {
        fString = '(Initial Step)';
    }

    function shortMapEntityDescription(mapEntity) {
        const entityName = <b className={classes.blueText}>{mapEntity.name}</b>;
        switch(mapEntity.type) {
            case 'create_npc':
                return <Typography>Create NPC {entityName}</Typography>;
            case 'configure_npc':
                return <Typography>Configure NPC {entityName}</Typography>;
            case 'create_area':
                return <Typography>Create area {entityName}</Typography>;
            default:
                return entityName;
        }
    }

    function createNewEntity(data) {
        handleAddMapConfiguration(data.mapName, {
            name: data.name,
            type: data.type,
            parameters: data.parameters
        });
    }

    const configDescriptionText = (
        configDescription.map((mapData, index) => (
            <li key={mapData.map.id}>
                <Typography>
                    NPCs in map&nbsp;
                    <span className={classes.greenText}>
                        {mapData.map.map_name}:
                    </span>
                </Typography>
                <ul>
                    {mapData.entities.map((entity, index) => (
                        <li key={entity.id}>
                            {shortMapEntityDescription(entity)}
                        </li>
                    ))}
                </ul>
            </li>
        ))
    );

    const completionDescriptionText = (
        completionDescription.map((data, index) => (
            <li key={data.bundle.id}>
                <Typography>
                    Go to step&nbsp;
                    <span className={classes.greenText}>
                        {data.bundle.next_step}
                    </span>
                </Typography>
                <ul>
                    {
                        data.conditions.length > 0 &&
                        data.conditions.map((condition, index) => (
                            <li className={classes.greenText} key={condition.id}>
                                <Typography className={classes.greenText}>
                                    {condition.unique_name}
                                </Typography>
                            </li>
                        ))
                    }
                    {data.conditions.length <= 0 &&
                        <li className={classes.greyText}>
                            <Typography className={classes.greyText}>
                                <i>No conditions defined</i>
                            </Typography>
                        </li>
                    }
                </ul>
            </li>
        ))
    );

    const mapConfData = (
        storylineStep.configuration && 
        storylineStep.configuration.map((stepMapId, index) => (
            <Grid item xs={12} key={stepMapId}>
                <StepMapContainer 
                    currentMapId={stepMapId}
                />
            </Grid>
        ))
    );

    const completionData = (
        storylineStep.completion &&
        storylineStep.completion.map((bundleId, index) => (
            <Grid item xs={12} key={bundleId}>
                <CompletionBundleContainer
                    currentCompletionBundleId={bundleId}
                />
            </Grid>
        ))
    );

    return (
        <Card>
            <CardHeader
                title={
                    <React.Fragment>
                        <Typography variant='h6'>
                            {storylineStep.name} &nbsp;
                            <small className={classes.headerSmall}>
                                {fString}
                            </small>
                        </Typography>
                    </React.Fragment>
                }
                subheader={subHeader}
            />

            <Divider />

            <CardContent>
                <Grid container spacing={16}>
                    {(storylineStep.configuration.length <= 0 && storylineStep.completion <= 0) &&
                        <Grid item xs={12}>
                            <Typography variant='body1' align='center'>
                                <i>Empty step</i>
                            </Typography>
                        </Grid>
                    }
                    {(storylineStep.configuration.length > 0 || storylineStep.completion.length > 0) &&
                        <React.Fragment>
                            <Grid item xs={12} md={6}>
                                {storylineStep.configuration.length > 0 &&
                                    <ul className={classes.descriptionList}>
                                        {configDescriptionText} 
                                    </ul>
                                }
                                {storylineStep.configuration.length <= 0 &&
                                    <Typography variant='body2'>
                                        <br />
                                        <i>No entities defined for this step</i>
                                    </Typography>
                                }
                            </Grid>
                            <Grid item xs={12} md={6}>
                                {storylineStep.completion.length > 0 &&
                                    <ul className={classes.descriptionList}>
                                        {completionDescriptionText}
                                    </ul>
                                }
                                {storylineStep.completion.length <= 0 &&
                                    <Typography variant='body2'>
                                        <br />
                                        <i>No completion bundles configured, the storyline will finish here</i>
                                    </Typography>
                                }
                            </Grid>
                        </React.Fragment>
                    }
                </Grid>
            </CardContent>

            <Divider />

            <CardActions disableActionSpacing>
                <Tooltip title='Edit step name'>
                    <IconButton
                        onClick={() => toggleDialogue('editName', 'show')}
                    >
                        <Icon>edit</Icon>
                    </IconButton>
                </Tooltip>
                <Tooltip title='Delete step'>
                    <IconButton
                        onClick={() => toggleDialogue('confirmDelete', 'show')}
                    >
                        <Icon>delete</Icon>
                    </IconButton>
                </Tooltip>
                <Typography variant='h5'>&nbsp;-&nbsp;</Typography>
                <Tooltip title='Create Entity'>
                    <IconButton
                        onClick={() => toggleDialogue('createMapEntity', 'show')}
                    >
                        <Icon>add_to_photos</Icon>
                    </IconButton>
                </Tooltip>
                <Tooltip title='Add condition bundle'>
                    <IconButton
                        onClick={() => toggleDialogue('createConditionBundle', 'show')}
                    >
                        <Icon>add_alert</Icon>
                    </IconButton>
                </Tooltip>
                <IconButton
                    className={classnames(classes.expand, {
                        [classes.expandOpen]: expanded
                    })}
                    onClick={() => toggleExpanded(!expanded)}
                >
                    <Icon>expand_more</Icon>
                </IconButton>
            </CardActions>
            <Collapse
                in={expanded}
                timeout='auto'
                unmountOnExit
            >
                <CardContent>
                    <Grid
                        container
                        spacing={16}
                    >
                        <Grid item xs={12} lg={9} >
                            <Typography 
                                variant='h5'
                                align='center'
                                gutterBottom
                            >
                                Configurations
                            </Typography>
                            <br />
                            <Grid container spacing={16}>
                                {mapConfData}
                            </Grid>
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <Typography 
                                variant='h5'
                                align='center'
                                gutterBottom
                            >
                                Conditions
                            </Typography>
                            <br />
                            <Grid container spacing={16}>
                                {completionData}
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Collapse>

            <GenericDialogue
                title='Add Entity'
                open={
                    typeof(dialogues['createMapEntity']) === 'undefined' ?
                        false : dialogues['createMapEntity']
                }
                onClose={() => toggleDialogue('createMapEntity', 'hide')}
            >
                <CreateMapEntityForm
                    handleSubmit={data => {
                        toggleDialogue('createMapEntity', 'hide');
                        createNewEntity(data);
                    }}
                />
            </GenericDialogue>

            <GenericDialogue
                title='Add Condition Bundle'
                open={
                    typeof(dialogues['createConditionBundle']) === 'undefined' ?
                        false : dialogues['createConditionBundle']
                }
                onClose={() => toggleDialogue('createConditionBundle', 'hide')}
            >
                <CompletionBundleForm 
                    handleSubmit={data => {
                        toggleDialogue('createConditionBundle', 'hide');
                        handleAddCompletionBundle(data);
                    }}
                />
            </GenericDialogue>

            <GenericDialogue
                title='Edit step name'
                maxWidth='sm'
                open={dialogues['editName']}
                onClose={() => toggleDialogue('editName', 'hide')}
            >
                <StorylineStepForm 
                    stepName={storylineStep.name}
                    handleSubmit={newName => {
                        toggleDialogue('editName', 'hide');
                        handleUpdateStepName(newName);
                    }}
                />
            </GenericDialogue>

            <ConfirmationDialogue
                message={`Delete the step ${storylineStep.name}?`}
                isOpen={dialogues['confirmDelete']}
                handleClose={() => toggleDialogue('confirmDelete', 'hide')}
                handleConfirm={() => {
                    toggleDialogue('confirmDelete', 'hide');
                    handleDeleteStep();
                }}
            />

        </Card>
    );

}

export default withStyles(styles)(StorylineStep);
