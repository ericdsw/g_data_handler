import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { Button, Card, Grid, Typography } from '@mui/material';
import { blue, green } from '@mui/material/colors';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const selectStepMapEntities = (state) => state.storyline.stepMapEntities;
const selectStorylineSteps = (state) => state.storyline.storylineSteps;
const selectStepMaps = (state) => state.storyline.stepMaps;

const memoizedSelector = createSelector(
  [selectStepMapEntities, selectStorylineSteps, selectStepMaps],
  (stepMapEntities, storylineSteps, stepMaps) => ({
    stepMapEntities,
    storylineSteps,
    stepMaps,
  })
);

const DuplicateMapEntityForm = ({ entityToDuplicate, onDuplicateAccepted }) => {
  const { stepMapEntities, storylineSteps, stepMaps } = useSelector((state) =>
    memoizedSelector(state)
  );

  const [selectedMaps, setSelectedMaps] = useState([]);

  const currentEntity = useMemo(
    () => stepMapEntities[entityToDuplicate],
    [stepMapEntities, entityToDuplicate]
  );

  const toggleSelectedMap = (mapId) => {
    if (!selectedMaps.includes(mapId)) {
      setSelectedMaps([...selectedMaps, mapId]);
    } else {
      const newMaps = [...selectedMaps];
      newMaps.splice(newMaps.indexOf(mapId), 1);
      setSelectedMaps(newMaps);
    }
  };

  const entityType = useMemo(() => {
    switch (currentEntity.type) {
      case 'create_npc':
        return 'Create NPC';
      case 'configure_npc':
        return 'Configure NPC';
      case 'configure_group':
        return 'Configure Group';
      case 'create_area':
        return 'Create Notification Area';
      case 'create_dialogue_area':
        return 'Create Dialogue Area';
      case 'create_cutscene_area':
        return 'Create Cutscene Area';
      case 'remove_entity':
        return 'Remove Entity';
      default:
        return currentEntity.type;
    }
  }, [currentEntity]);

  return (
    <Grid container>
      <Grid item>
        <Card elevation={1} style={{ padding: 16, minWidth: 180, height: 80 }}>
          <Typography variant="body1">{currentEntity.name}</Typography>
          <Typography variant="caption" style={{ color: blue[400] }}>
            {entityType}
          </Typography>
        </Card>
        <div style={{ padding: 8 }}>
          <Typography variant="body2">
            Will duplicate in {selectedMaps.length}{' '}
            {selectedMaps.length === 1 ? 'map' : 'maps'}
          </Typography>
        </div>

        <Button
          fullWidth
          variant="contained"
          onClick={() => {
            onDuplicateAccepted(entityToDuplicate, selectedMaps);
          }}
        >
          Duplicate
        </Button>
      </Grid>
      <Grid item>
        <div
          style={{
            height: 80,
            width: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <DoubleArrowIcon />
        </div>
      </Grid>
      <Grid item xs>
        {Object.keys(storylineSteps).map((stepId) => (
          <Card key={stepId} style={{ padding: 16, marginBottom: 16 }}>
            <Typography variant="h6" gutterBottom>
              {storylineSteps[stepId].name}
            </Typography>
            {storylineSteps[stepId].configuration.map((mapId) => {
              const currentMap = stepMaps[mapId];

              if (currentMap.entity_nodes.includes(entityToDuplicate)) {
                return <></>;
              }
              const isSelected = selectedMaps.includes(mapId);

              return (
                <Card
                  onClick={() => toggleSelectedMap(mapId)}
                  elevation={4}
                  variant={!isSelected ? 'elevation' : 'outlined'}
                  style={{
                    padding: 16,
                    width: 180,
                    height: 100,
                    display: 'inline-block',
                    margin: 8,
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'visible',
                  }}
                >
                  <Typography variant="body2" gutterBottom>
                    <b>{currentMap.map_name}</b>
                  </Typography>
                  <Typography variant="caption">
                    Contains {currentMap.entity_nodes.length}{' '}
                    {stepMaps[mapId].entity_nodes.length === 1
                      ? 'interaction'
                      : 'interactions'}
                  </Typography>
                  {isSelected && (
                    <CheckCircleOutlineIcon
                      style={{
                        position: 'absolute',
                        bottom: -10,
                        right: -10,
                        color: green[400],
                      }}
                      fontSize="large"
                    />
                  )}
                </Card>
              );
            })}
          </Card>
        ))}
      </Grid>
    </Grid>
  );
};

export default DuplicateMapEntityForm;
