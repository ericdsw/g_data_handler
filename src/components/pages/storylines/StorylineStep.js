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
    Icon
} from '@material-ui/core';

import StepMapContainer from '../../containers/StepMapContainer';
import CompletionBundleContainer from '../../containers/CompletionBundleContainer';

import { GenericDialogue } from '../../elements';
import { useDialogueManager } from '../../../hooks';
import CreateMapEntityForm from './forms/CreateMapEntityForm';

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
    }
});

const StorylineStep = props => {

    const { classes, storylineStep, stepOffset } = props;

    const [dialogues, toggleDialogue] = useDialogueManager(
        'createMapEntity'
    );

    const [expanded, toggleExpanded] = useState(false);

    const mapCount = storylineStep.configuration.length
    const bundleCount = storylineStep.completion.length
    const subHeader = `Configure ${mapCount} maps, watch ${bundleCount} bundles`;

    let fString = '';
    if (stepOffset === 0) {
        fString = '(First Step)';
    }

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
            <CardActions
                disableActionSpacing
            >
                <IconButton>
                    <Icon>edit</Icon>
                </IconButton>
                <IconButton
                    onClick={() => toggleDialogue('createMapEntity', 'show')}
                >
                    <Icon>add_to_photos</Icon>
                </IconButton>
                <IconButton>
                    <Icon>add_alert</Icon>
                </IconButton>
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
                        <Grid
                            item xs={12} lg={9}
                        >
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
                        <Grid
                            item xs={12} lg={3}
                        >
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
                open={dialogues['createMapEntity']}
                onClose={() => toggleDialogue('createMapEntity', 'hide')}
            >
                <CreateMapEntityForm />
            </GenericDialogue>

        </Card>
    );

}

export default withStyles(styles)(StorylineStep);
