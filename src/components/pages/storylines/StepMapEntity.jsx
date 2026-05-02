import React, { useState, useMemo } from 'react';
import {
  Card,
  CardHeader,
  CardActions,
  Typography,
  IconButton,
  Icon,
  Divider,
  ButtonBase,
  Paper,
  Tooltip,
  Grid,
  List,
  ListItem,
  Collapse,
} from '@mui/material';
import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate';
import { blue } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

import { interactionInputSchema } from '@/globals';
import NPCInteractionContainer from './NPCInteractionContainer';
import StepMapEntityParameterList from './elements/StepMapEntityParameterList';
import CreateNPCInteractionForm from './forms/CreateNPCInteractionForm';
import {
  GenericDialogue,
  ConfirmationDialogue,
  MenuIconButton,
} from '@/components/elements';
import { useDialogueManager } from '@/hooks';
import CreateMapEntityForm from './forms/CreateMapEntityForm';
import ItemDependentInteractionInstructions from './elements/ItemDependentInteractionInstructions';
import DuplicateMapEntityForm from './forms/DuplicateMapEntityForm';

const StyledDescriptionElementButton = styled(ButtonBase)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  paddingLeft: 16,
  paddingRight: 16,
  backgroundColor: 'transparent',
}));
const StyledDescriptionElementPaper = styled(Paper)(({ theme }) => ({
  padding: 16,
  cursor: 'pointer',
  width: '100%',
  fontSize: 14,
  backgroundColor: 'transparent',
color: theme.palette.text.primary,
}));
const NoParametersGridText = styled(Grid)(({ theme }) => ({
color: theme.palette.text.primary,
backgroundColor: theme.palette.background.paper,
  padding: 10,
  paddingTop: 16,
  paddingBottom: 0,
}))

const StepMapEntity = ({
  stepMapEntity,
  curMapName,
  handleAddParameter,
  handleEditParameter,
  handleDeleteParameter,
  handleAddInteraction,
  handleUpdateEntity,
  handleDeleteEntity,
  handleDuplicateInMaps,
}) => {
  const [dialogues, toggleDialogue] = useDialogueManager(
    'viewParameters',
    'viewInteractions',
    'confirmDelete',
    'editEntity',
    'confirmParameterDelete',
    'addInteraction',
    'duplicate'
  );
  const [curInteractionType, setCurInteractionType] = useState('');
  const [paramsExpanded, toggleParamsExpanded] = useState(false);

  const interactionTypes = useMemo(() => {
    const result = {};
    for (const key in interactionInputSchema) {
      result[key] = interactionInputSchema[key].name;
    }
    return result;
  }, []);

  const paramKeys = useMemo(
    () => Object.keys(stepMapEntity.parameters),
    [
      stepMapEntity,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      Object.keys(stepMapEntity.parameters).length,
    ]
  );

  const paramAmount = useMemo(() => paramKeys.length, [paramKeys.length]);

  const paramList = useMemo(
    () =>
      paramKeys.map((key) => (
        <ListItem key={key}>
          <Tooltip title={`${stepMapEntity.parameters[key]}`}>
            <Typography variant="caption">
              {typeof stepMapEntity.parameters[key] === 'boolean' && (
                <React.Fragment>
                  <b>{key}</b>:{' '}
                  <i>{stepMapEntity.parameters[key] ? `True` : `False`}</i>
                </React.Fragment>
              )}
              {typeof stepMapEntity.parameters[key] !== 'boolean' && (
                <React.Fragment>
                  <b>{key}</b>: <i>{stepMapEntity.parameters[key]}</i>
                </React.Fragment>
              )}
            </Typography>
          </Tooltip>
        </ListItem>
      )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [paramKeys, paramKeys.length, stepMapEntity.parameters]
  );

  const inAmount = useMemo(
    () =>
      typeof stepMapEntity.configurator_data !== 'undefined'
        ? stepMapEntity.configurator_data.length
        : 0,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [stepMapEntity.configurator_data, stepMapEntity.configurator_data.length]
  );

  const entityType = useMemo(() => {
    switch (stepMapEntity.type) {
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
        return stepMapEntity.type;
    }
  }, [stepMapEntity]);

  const usedHelpContent = useMemo(() => {
    if (
      ['item_dialogue_interaction', 'item_cutscene_interaction'].includes(
        curInteractionType
      )
    ) {
      return <ItemDependentInteractionInstructions />;
    }
    return undefined;
  }, [curInteractionType]);

  return (
    <Card>
      <CardHeader
        title={
          <Tooltip title={stepMapEntity.name} arrow>
            <Typography variant="subtitle1">{stepMapEntity.name}</Typography>
          </Tooltip>
        }
        subheader={
          <Typography variant="caption" sx={{ color: blue[400] }}>
            {entityType}
          </Typography>
        }
      />
      <Divider />
      {stepMapEntity.type !== 'remove_entity' && (
        <React.Fragment>
          <StyledDescriptionElementButton
            onClick={() => toggleParamsExpanded(!paramsExpanded)}
          >
            <StyledDescriptionElementPaper elevation={0}>
              <Typography variant="body2">
                {paramsExpanded ? 'Hide' : 'Show'} parameters
              </Typography>
            </StyledDescriptionElementPaper>
          </StyledDescriptionElementButton>
          <Collapse in={paramsExpanded} timeout="auto" unmountOnExit>
            {paramAmount <= 0 && (
              <NoParametersGridText
                container
                sx={{
                  justifyContent: "center",
                  alignItems: "center"
                }}>
                <Typography variant="caption" align="center">
                  No parameters configured
                </Typography>
              </NoParametersGridText>
            )}
            <Paper square elevation={0}>
              <List component="nav">{paramList}</List>
            </Paper>
          </Collapse>
          <Divider />
          <StyledDescriptionElementButton
            onClick={() => toggleDialogue('viewInteractions', 'show')}
          >
            <StyledDescriptionElementPaper elevation={0}>
              <Typography variant="body2">
                Contains {inAmount} interaction{inAmount === 1 ? '' : 's'}
              </Typography>
            </StyledDescriptionElementPaper>
          </StyledDescriptionElementButton>
        </React.Fragment>
      )}
      {stepMapEntity.type === 'remove_entity' && (
        <Paper
          elevation={0}
          sx={{
            display: 'flex',
            width: '100%',
            paddingLeft: 16,
            paddingRight: 16,
            backgroundColor: 'transparent',
          }}
        >
          <Typography
            variant="caption"
            sx={theme => ({
              padding: 16,
              cursor: 'pointer',
              width: '100%',
              fontSize: 14,
              backgroundColor: 'transparent',
              color: theme.palette.text.primary,
            })}
          >
            Remove Entity has no parameters and no interactions
          </Typography>
        </Paper>
      )}
      <Divider />
      <CardActions sx={{ display: 'flex' }}>
        <Tooltip title="Edit entity name">
          <IconButton
            onClick={() => toggleDialogue('editEntity', 'show')}
            size="large"
          >
            <Icon fontSize="small">edit</Icon>
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete entity">
          <IconButton
            onClick={() => toggleDialogue('confirmDelete', 'show')}
            size="large"
          >
            <Icon fontSize="small">delete</Icon>
          </IconButton>
        </Tooltip>
        <Tooltip title="duplicate in another map/step">
          <IconButton
            size="large"
            onClick={() => toggleDialogue('duplicate', 'show')}
          >
            <ControlPointDuplicateIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
      <GenericDialogue
        title="Edit Current Entity"
        open={dialogues['editEntity']}
        onClose={() => toggleDialogue('editEntity', 'hide')}
        maxWidth="sm"
      >
        <CreateMapEntityForm
          data={Object.assign({}, stepMapEntity.parameters, {
            name: stepMapEntity.name,
            map_name: curMapName,
          })}
          curType={stepMapEntity.type}
          disabledInputs={['map_name']}
          handleSubmit={(name, _mapName, parameters) => {
            toggleDialogue('editEntity', 'hide');
            handleUpdateEntity(name, parameters);
          }}
          buttonText="Edit"
        />
      </GenericDialogue>
      <GenericDialogue
        title="Add Parameters"
        open={dialogues['viewParameters']}
        onClose={() => toggleDialogue('viewParameters', 'hide')}
        maxWidth="md"
      >
        <StepMapEntityParameterList
          entityParams={stepMapEntity.parameters}
          handleAddParameter={(name, val) => {
            handleAddParameter(name, val);
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
            <Grid size={9}>
              <Typography variant="h5">Interactions</Typography>
            </Grid>
            <Grid size={3}>
              <Typography align="right">
                <MenuIconButton
                  elementId={`add_inter_${stepMapEntity.id}`}
                  contentDictionary={interactionTypes}
                  tooltip="Add new Interaction"
                  icon="add_circle_outline"
                  handleClick={(key) => setCurInteractionType(key)}
                />
              </Typography>
            </Grid>
          </Grid>
        }
        open={dialogues['viewInteractions']}
        onClose={() => toggleDialogue('viewInteractions', 'hide')}
        maxWidth="md"
      >
        <Grid container spacing={2}>
          {stepMapEntity.configurator_data.length <= 0 && (
            <Grid size={12}>
              <Typography variant="body2" align="center" gutterBottom>
                <i>No interactions found</i>
              </Typography>
            </Grid>
          )}
          {stepMapEntity.configurator_data.map((id, index) => (
            <Grid
              key={id}
              size={{
                xs: 12,
                md: 6
              }}>
              <NPCInteractionContainer
                currentInteractionId={id}
                handleSubmit={(data) => console.log(data)}
              />
            </Grid>
          ))}
        </Grid>
      </GenericDialogue>
      <GenericDialogue
        title="Create Interaction"
        open={curInteractionType !== ''}
        onClose={() => setCurInteractionType('')}
        maxWidth="sm"
        helpComponent={usedHelpContent}
      >
        <CreateNPCInteractionForm
          interactionType={curInteractionType}
          handleSubmit={(data) => {
            handleAddInteraction(curInteractionType, data);
            setCurInteractionType('');
          }}
        />
      </GenericDialogue>
      <GenericDialogue
        title="Duplicate in map or step"
        open={dialogues['duplicate']}
        onClose={() => toggleDialogue('duplicate', 'hide')}
      >
        <DuplicateMapEntityForm
          entityToDuplicate={stepMapEntity.id}
          onDuplicateAccepted={(entityToDuplicate, selectedMaps) => {
            toggleDialogue('duplicate', 'hide');
            handleDuplicateInMaps(entityToDuplicate, selectedMaps);
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
};

export default StepMapEntity;
