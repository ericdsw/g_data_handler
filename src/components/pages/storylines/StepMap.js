import React, { useState, useMemo, useCallback } from 'react';
import { makeStyles } from '@mui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Icon,
  Avatar,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import { useSelector } from 'react-redux';

import { useDialogueManager } from '../../../hooks';

import StepMapEntityContainer from './StepMapEntityContainer';
import { GenericDialogue, MenuIconButton } from '../../elements';
import { storylineEntityInputSchema } from '../../../globals';
import CreateMapEntityForm from './forms/CreateMapEntityForm';
import EditStepMapNameForm from './forms/EditStepMapNameForm';

const useStyles = makeStyles(() => ({
  mapCard: {
    background: (props) => props.cardBackground,
  },
}));

const StepMap = ({
  stepMap,
  handleAddEntity,
  handleUpdateName
}) => {
  const { darkMode } = useSelector((state) => state.app);
  const classes = useStyles({
    cardBackground: darkMode ? '#463f47' : '#eee',
  });
  const [dialogues, toggleDialogue] = useDialogueManager('editName');

  const [curEntityType, setCurEntityType] = useState('');

  const eTypeOptions = useMemo(() => {
    const result = {};
    for (const entityTypeKey in storylineEntityInputSchema) {
      const curEntity = storylineEntityInputSchema[entityTypeKey];
      result[entityTypeKey] = curEntity.name;
    }
    return result;
  }, []);

  const createEntity = useCallback(
    (name, _, parameters) => {
      handleAddEntity({
        name: name,
        type: curEntityType,
        parameters: parameters,
      });
    },
    [curEntityType, handleAddEntity]
  );

  /**
   * Provide the length to the dependency array to make sure this recalculates when
   * the entity_nodes changes.
   */
  const content = useMemo(
    () =>
      stepMap.entity_nodes &&
      stepMap.entity_nodes.map((id) => (
        <Grid item xs={12} md={4} key={id}>
          <StepMapEntityContainer
            currentMapEntityId={id}
            curMapName={stepMap.map_name}
          />
        </Grid>
      )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [stepMap, stepMap.entity_nodes.length]
  );

  return (
    <Card className={classes.mapCard}>
      <CardHeader
        avatar={
          <Avatar>
            <Icon>map</Icon>
          </Avatar>
        }
        title={<Typography variant="h6">{stepMap.map_name}</Typography>}
        action={
          <>
            <Tooltip title="Edit map name">
              <IconButton
                onClick={() => toggleDialogue('editName', 'show')}
              >
                <Icon fontSize='large'>edit</Icon>
              </IconButton>
            </Tooltip>
            <MenuIconButton
              elementId={`create_entity_menu_${stepMap.id}`}
              icon="add_to_photos"
              tooltip="Add entity to current map"
              contentDictionary={eTypeOptions}
              handleClick={(key) => setCurEntityType(key)}
            />
          </>
        }
      />
      <CardContent>
        <Grid container spacing={2}>
          {content}
        </Grid>
      </CardContent>

      {/* Edit Name Form */}
      <GenericDialogue
        title="Edit Map Name"
        open={dialogues["editName"]}
        maxWidth='sm'
        onClose={() => toggleDialogue('editName', 'hide')}
      >
        <EditStepMapNameForm
          data={{ map_name: stepMap.map_name }}
          handleSubmit={newData => {
            toggleDialogue('editName', 'hide');
            handleUpdateName(newData.map_name)
          }}
        />
      </GenericDialogue>

      {/* Create entity form */}
      <GenericDialogue
        title={
          curEntityType !== ''
            ? storylineEntityInputSchema[curEntityType].name
            : 'Add Entity'
        }
        open={curEntityType !== ''}
        onClose={() => setCurEntityType('')}
        maxWidth="sm"
      >
        <CreateMapEntityForm
          data={{ map_name: stepMap.map_name }}
          curType={curEntityType}
          disabledInputs={['map_name']}
          handleSubmit={(name, mapName, parameters) => {
            createEntity(name, mapName, parameters);
            setCurEntityType('');
          }}
        />
      </GenericDialogue>

    </Card>
  );
};

export default StepMap;
