import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Card,
    CardHeader,
    CardContent,
    Grid,
    IconButton,
    Icon,
    Avatar,
    Typography,
    Tooltip
} from '@material-ui/core';

import StepMapEntityContainer from '../../containers/StepMapEntityContainer';
import { GenericDialogue } from '../../elements';
import { useDialogueManager } from '../../../hooks';
import CreateMapEntityForm from './forms/CreateMapEntityForm';

const styles = theme => ({
    mapCard: {
        background: '#555',
    }
});

const StepMap = props => {

    // Parameters
    const { classes, stepMap } = props;

    // Methods
    const { handleAddEntity } = props;

    const [dialogues, toggleDialogue] = useDialogueManager(
        'CreateMapEntity'
    );

    function createEntity(data) {
        handleAddEntity({
            name: data.name,
            type: data.type,
            parameters: data.parameters
        });
    }

    const content = (
        stepMap.entity_nodes && stepMap.entity_nodes.map((id, index) => (
            <Grid item xs={12} md={4} key={id}>
                <StepMapEntityContainer
                    currentMapEntityId={id}
                />
            </Grid>
        ))
    );

    return (
        <Card className={classes.mapCard}>
            <CardHeader
                avatar={
                    <Avatar>
                        <Icon>map</Icon>
                    </Avatar>
                }
                title={
                    <Typography variant='h6'>
                        {stepMap.map_name}
                    </Typography>
                }
                action={
                    <Tooltip title='Add entity to current map'>
                        <IconButton
                            onClick={() => toggleDialogue('createMapEntity', 'show')}
                        >
                            <Icon>add_to_photos</Icon>
                        </IconButton>
                    </Tooltip>
                }
            />
            <CardContent>
                <Grid 
                    container
                    spacing={16}
                >
                    {content}
                </Grid>
            </CardContent>

            <GenericDialogue
                title='Add Entity'
                open={dialogues['createMapEntity']}
                onClose={() => toggleDialogue('createMapEntity', 'hide')}
            >
                <CreateMapEntityForm 
                    mapName={stepMap.map_name}
                    handleSubmit={data => {
                        toggleDialogue('createMapEntity', 'hide')
                        createEntity(data);
                    }}
                />
            </GenericDialogue>
        </Card>
    );
}

export default withStyles(styles)(StepMap);
