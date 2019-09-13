import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Card,
    CardHeader,
    CardContent,
    Grid,
    Icon,
    Avatar,
    Typography,
} from '@material-ui/core';

import StepMapEntityContainer from '../../containers/StepMapEntityContainer';
import { GenericDialogue, MenuIconButton } from '../../elements';
import { storylineEntityInputSchema } from '../../../globals';
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

    const [curEntityType, setCurEntityType] = useState('');

    const eTypeOptions = {};
    for (const entityTypeKey in storylineEntityInputSchema) {
        const curEntity = storylineEntityInputSchema[entityTypeKey]
        eTypeOptions[entityTypeKey] = curEntity.name;
    }

    function createEntity(name, mapName, parameters) {
        handleAddEntity({
            name: name, 
            type: curEntityType, 
            parameters: parameters
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
                    <MenuIconButton
                        elementId={`create_entity_menu_${stepMap.id}`}
                        icon='add_to_photos'
                        tooltip='Add entity to current map'
                        contentDictionary={eTypeOptions}
                        handleClick={key => setCurEntityType(key)}
                    />
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
                open={curEntityType !== ''}
                onClose={() => setCurEntityType('')}
                maxWidth='sm'
            >
                <CreateMapEntityForm 
                    data={Object.assign({}, stepMap.parameters, {
                        name: stepMap.name,
                        map_name: stepMap.map_name
                    })}
                    curType={curEntityType}
                    disabledInputs={['map_name']}
                    handleSubmit={(name, mapName, parameters) => {
                        setCurEntityType('');
                        createEntity(name, mapName, parameters);
                    }}
                />
            </GenericDialogue>
        </Card>
    );
}

export default withStyles(styles)(StepMap);
