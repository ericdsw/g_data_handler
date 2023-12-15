import React, { useState, useMemo, useCallback } from 'react';
import { makeStyles } from '@mui/styles';
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
  Tooltip,
} from '@mui/material';

import StepMapContainer from './StepMapContainer';
import CompletionBundleContainer from './CompletionBundleContainer';

import {
  GenericDialogue,
  ConfirmationDialogue,
  MenuIconButton,
  MenuButton,
} from '../../elements';
import { useDialogueManager } from '../../../hooks';
import { storylineEntityInputSchema } from '../../../globals';
import CreateMapEntityForm from './forms/CreateMapEntityForm';
import CompletionBundleForm from './forms/CompletionBundleForm';
import StorylineStepForm from './forms/StorylineStepForm';

import { styles } from './styles/StorylineStepStyle';

const useStyles = makeStyles(styles);

const StorylineStep = ({
  storylineStep,
  stepOffset,
  allSteps,
  completionDescription,
  configDescription,
  handleUpdateStepName,
  handleAddMapConfiguration,
  handleAddCompletionBundle,
  handleDeleteStep,
  handleDuplicateConfigs,
  draggableProps,
}) => {
  const classes = useStyles();

  const [dialogues, toggleDialogue] = useDialogueManager(
    'createCompletionBundle',
    'editName',
    'confirmDelete'
  );

  const [expanded, toggleExpanded] = useState(false);
  const [curEntityType, setCurEntityType] = useState('');

  const subHeader = useMemo(() => {
    const mapCount = storylineStep.configuration.length;
    const bundleCount = storylineStep.completion.length;
    return `Configure ${mapCount} maps, watch ${bundleCount} bundles`;
  }, [storylineStep]);

  const eTypeOptions = useMemo(() => {
    const result = {};
    for (const entityTypeKey in storylineEntityInputSchema) {
      const curEntity = storylineEntityInputSchema[entityTypeKey];
      result[entityTypeKey] = curEntity.name;
    }
    return result;
  }, []);

  const duplicateOptions = useMemo(() => {
    const result = {};
    for (const stepId in allSteps) {
      if (stepId !== storylineStep.id) {
        result[stepId] = allSteps[stepId].name;
      }
    }
    return result;
  }, [allSteps, storylineStep.id]);

  const fString = useMemo(
    () => (stepOffset === 0 ? '(Initial Step)' : ''),
    [stepOffset]
  );

  const shortMapEntityDescription = useCallback(
    (mapEntity) => {
      const entityName = <b className={classes.blueText}>{mapEntity.name}</b>;
      switch (mapEntity.type) {
        case 'create_npc':
          return <Typography>Create NPC {entityName}</Typography>;
        case 'configure_npc':
          return <Typography>Configure NPC {entityName}</Typography>;
        case 'create_area':
          return <Typography>Create area {entityName}</Typography>;
        case 'configure_group':
          return (
            <Typography>
              Configure GroupInteractionHandler {entityName}
            </Typography>
          );
        default:
          return entityName;
      }
    },
    [classes.blueText]
  );

  const createNewEntity = useCallback(
    (name, mapName, parameters) => {
      handleAddMapConfiguration(mapName, {
        name: name,
        type: curEntityType,
        parameters: parameters,
      });
    },
    [handleAddMapConfiguration, curEntityType]
  );

  const duplicateConfigurationInStep = useCallback(
    (stepId) => {
      handleDuplicateConfigs(stepId);
    },
    [handleDuplicateConfigs]
  );

  const configDescriptionText = useMemo(
    () =>
      configDescription.map((mapData) => (
        <li key={mapData.map.id}>
          <Typography>
            NPCs in map&nbsp;
            <span className={classes.greenText}>{mapData.map.map_name}:</span>
          </Typography>
          <ul>
            {mapData.entities.map((entity) => (
              <li key={entity.id}>{shortMapEntityDescription(entity)}</li>
            ))}
          </ul>
        </li>
      )),
    [classes.greenText, configDescription, shortMapEntityDescription]
  );

  const completionDescriptionText = useMemo(
    () =>
      completionDescription.map((data) => (
        <li key={data.bundle.id}>
          <Typography>
            Go to step&nbsp;
            <span className={classes.greenText}>
              {data.bundle.next_step}
            </span>{' '}
            after:
          </Typography>
          <ul>
            {data.conditions.length > 0 &&
              data.conditions.map((condition, index) => (
                <li className={classes.blueText} key={condition.id}>
                  <Typography className={classes.blueText}>
                    {condition.unique_name}
                  </Typography>
                </li>
              ))}
            {data.conditions.length <= 0 && (
              <li className={classes.greyText}>
                <Typography className={classes.greyText}>
                  <i>No conditions defined</i>
                </Typography>
              </li>
            )}
          </ul>
        </li>
      )),
    [classes, completionDescription]
  );

  /**
   * Provide the length to the dependency array to make sure this recalculates when
   * an entity is added/deleted
   */
  const mapConfData = useMemo(() => {
    if (storylineStep.configuration) {
      const result = storylineStep.configuration.map((stepMapId) => (
        <Grid item xs={12} key={stepMapId}>
          <StepMapContainer currentMapId={stepMapId} />
        </Grid>
      ));
      return result;
    }
    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storylineStep, storylineStep.configuration.length]);

  /**
   * Provide the length to the dependency array to make sure this recalculates when
   * a completion bundle is added/deleted
   */
  const completionData = useMemo(
    () =>
      storylineStep.completion &&
      storylineStep.completion.map((bundleId) => (
        <Grid item xs={12} key={bundleId}>
          <CompletionBundleContainer currentCompletionBundleId={bundleId} />
        </Grid>
      )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [storylineStep, storylineStep.completion.length]
  );

  return (
    <div style={{ paddingTop: 8, paddingBottom: 8 }}>
      <Card elevation={1}>
        <CardHeader
          avatar={
            <div
              {...draggableProps}
              style={{
                width: 30,
                height: 30,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon>drag_handle</Icon>
            </div>
          }
          title={
            <Typography variant="h6">
              {storylineStep.name} &nbsp;
              <small className={classes.headerSmall}>{fString}</small>
            </Typography>
          }
          subheader={subHeader}
        />

        <Divider />

        <CardContent>
          <Grid container spacing={2}>
            {storylineStep.configuration.length <= 0 &&
              storylineStep.completion <= 0 && (
                <Grid item xs={12}>
                  <Typography variant="body1" align="center">
                    <i>Empty step, will end storyline</i>
                  </Typography>
                </Grid>
              )}
            {(storylineStep.configuration.length > 0 ||
              storylineStep.completion.length > 0) && (
              <React.Fragment>
                <Grid item xs={12} md={6}>
                  {storylineStep.configuration.length > 0 && (
                    <ul className={classes.descriptionList}>
                      {configDescriptionText}
                    </ul>
                  )}
                  {storylineStep.configuration.length <= 0 && (
                    <Typography variant="body2">
                      <br />
                      <i>No entities defined for this step</i>
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  {storylineStep.completion.length > 0 && (
                    <ul className={classes.descriptionList}>
                      {completionDescriptionText}
                    </ul>
                  )}
                  {storylineStep.completion.length <= 0 && (
                    <Typography variant="body2">
                      <br />
                      <i>
                        No completion bundles configured,&nbsp; the storyline
                        will finish here
                      </i>
                    </Typography>
                  )}
                </Grid>
              </React.Fragment>
            )}
          </Grid>
        </CardContent>

        <Divider />

        <CardActions disableSpacing>
          <Tooltip title="Edit step name">
            <IconButton
              onClick={() => toggleDialogue('editName', 'show')}
              size="large"
            >
              <Icon>edit</Icon>
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete step">
            <IconButton
              onClick={() => toggleDialogue('confirmDelete', 'show')}
              size="large"
            >
              <Icon>delete</Icon>
            </IconButton>
          </Tooltip>
          <Typography variant="h5">&nbsp;-&nbsp;</Typography>
          <MenuIconButton
            elementId={`create_entity_menu_${storylineStep.id}`}
            icon="add_to_photos"
            tooltip="Create Entity"
            contentDictionary={eTypeOptions}
            handleClick={(key) => setCurEntityType(key)}
          />

          <Tooltip title="Add condition bundle">
            <IconButton
              onClick={() => {
                toggleDialogue('createConditionBundle', 'show');
              }}
              size="large"
            >
              <Icon>add_alert</Icon>
            </IconButton>
          </Tooltip>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={() => toggleExpanded(!expanded)}
            size="large"
          >
            <Icon>expand_more</Icon>
          </IconButton>
        </CardActions>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={8}>
                <Typography variant="h5" align="center" gutterBottom>
                  Configurations &nbsp;
                  <MenuButton
                    elementId={`duplicate-c-${storylineStep.id}`}
                    contentDictionary={duplicateOptions}
                    tooltip="Copy all of this step's configuratons to another step"
                    buttonText="Duplicate in Step"
                    handleClick={(key) => {
                      duplicateConfigurationInStep(key);
                    }}
                  />
                </Typography>
                <Grid container spacing={2}>
                  {mapConfData}
                </Grid>
              </Grid>
              <Grid item xs={12} lg={4}>
                <Typography variant="h5" align="center" gutterBottom>
                  Conditions
                </Typography>
                <Grid container spacing={2}>
                  {completionData}
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Collapse>

        {/* Add Entity Form */}
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
            curType={curEntityType}
            handleSubmit={(name, mapName, parameters) => {
              createNewEntity(name, mapName, parameters);
              setCurEntityType('');
            }}
          />
        </GenericDialogue>

        {/* Condition Bundle Creation Form */}
        <GenericDialogue
          title="Add Condition Bundle"
          open={dialogues['createConditionBundle']}
          onClose={() => toggleDialogue('createConditionBundle', 'hide')}
          maxWidth="sm"
        >
          <CompletionBundleForm
            handleSubmit={(data) => {
              toggleDialogue('createConditionBundle', 'hide');
              handleAddCompletionBundle(data);
            }}
          />
        </GenericDialogue>

        {/* Edit Step Name */}
        <GenericDialogue
          title="Edit step name"
          maxWidth="sm"
          open={dialogues['editName']}
          onClose={() => toggleDialogue('editName', 'hide')}
        >
          <StorylineStepForm
            stepName={storylineStep.name}
            buttonText="Update"
            handleSubmit={(newName) => {
              toggleDialogue('editName', 'hide');
              handleUpdateStepName(newName);
            }}
          />
        </GenericDialogue>

        {/* Delete Confirmation */}
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
    </div>
  );
};

export default StorylineStep;
