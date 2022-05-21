import React, { useState, useMemo } from "react";
import withStyles from '@mui/styles/withStyles';
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
} from "@mui/material";

import { interactionInputSchema } from "../../../globals";
import NPCInteractionContainer from "../../containers/NPCInteractionContainer";
import StepMapEntityParameterList from "./elements/StepMapEntityParameterList";
import CreateNPCInteractionForm from "./forms/CreateNPCInteractionForm";
import {
  GenericDialogue,
  ConfirmationDialogue,
  MenuIconButton,
} from "../../elements";
import { useDialogueManager } from "../../../hooks";
import CreateMapEntityForm from "./forms/CreateMapEntityForm";
import ItemDependentInteractionInstructions from "./elements/ItemDependentInteractionInstructions";

import { styles } from "./styles/StepMapEntityStyle";

const StepMapEntity = (props) => {
  // Properties
  const { classes, stepMapEntity, curMapName } = props;

  // Methods
  const {
    handleAddParameter,
    handleEditParameter,
    handleDeleteParameter,
    handleAddInteraction,
    handleUpdateEntity,
    handleDeleteEntity,
  } = props;

  const [dialogues, toggleDialogue] = useDialogueManager(
    "viewParameters",
    "viewInteractions",
    "confirmDelete",
    "editEntity",
    "confirmParameterDelete",
    "addInteraction"
  );
  const [curInteractionType, setCurInteractionType] = useState("");
  const [paramsExpanded, toggleParamsExpanded] = useState(false);

  const interactionTypes = {};
  for (const key in interactionInputSchema) {
    interactionTypes[key] = interactionInputSchema[key].name;
  }

  const paramKeys = Object.keys(stepMapEntity.parameters);
  const paramAmount = paramKeys.length;
  const paramList = paramKeys.map((key, index) => (
    <ListItem key={key}>
      <Tooltip title={`${stepMapEntity.parameters[key]}`}>
        <Typography variant="caption">
          {typeof stepMapEntity.parameters[key] === "boolean" && (
            <React.Fragment>
              <b>{key}</b>:{" "}
              <i>{stepMapEntity.parameters[key] ? `True` : `False`}</i>
            </React.Fragment>
          )}
          {typeof stepMapEntity.parameters[key] !== "boolean" && (
            <React.Fragment>
              <b>{key}</b>: <i>{stepMapEntity.parameters[key]}</i>
            </React.Fragment>
          )}
        </Typography>
      </Tooltip>
    </ListItem>
  ));

  let inAmount = 0;
  if (typeof stepMapEntity.configurator_data !== "undefined") {
    inAmount = stepMapEntity.configurator_data.length;
  }

  function getEntityType(entity) {
    switch (entity.type) {
      case "create_npc":
        return "Create NPC";
      case "configure_npc":
        return "Configure NPC";
      case "configure_group":
        return "Configure Group";
      case "create_area":
        return "Create Notification Area";
      case "create_dialogue_area":
        return "Create Dialogue Area";
      case "create_cutscene_area":
        return "Create Cutscene Area";
      case "remove_entity":
        return "Remove Entity";
      default:
        return entity.type;
    }
  }

  const usedHelpContent = useMemo(() => {
    if (
      ["item_dialogue_interaction", "item_cutscene_interaction"].includes(
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
          <Typography variant="subtitle1">{stepMapEntity.name}</Typography>
        }
        subheader={
          <Typography variant="caption" className={classes.typeSubheader}>
            {getEntityType(stepMapEntity)}
          </Typography>
        }
      />

      <Divider />
      {stepMapEntity.type !== "remove_entity" && (
        <React.Fragment>
          <ButtonBase
            className={classes.descriptionWrapper}
            onClick={() => toggleParamsExpanded(!paramsExpanded)}
          >
            <Paper elevation={0} className={classes.descriptionElement}>
              {paramsExpanded ? "Hide" : "Show"} parameters
            </Paper>
          </ButtonBase>
          <Collapse in={paramsExpanded} timeout="auto" unmountOnExit>
            {paramAmount <= 0 && (
              <Typography variant="caption" align="center">
                No parameters configured
              </Typography>
            )}
            <Paper square elevation={0}>
              <List component="nav">{paramList}</List>
            </Paper>
          </Collapse>
          <Divider />
          <ButtonBase
            className={classes.descriptionWrapper}
            onClick={() => toggleDialogue("viewInteractions", "show")}
          >
            <Paper elevation={0} className={classes.descriptionElement}>
              Contains {inAmount} interaction{inAmount === 1 ? "" : "s"}
            </Paper>
          </ButtonBase>
        </React.Fragment>
      )}
      {stepMapEntity.type === "remove_entity" && (
        <Paper elevation={0} className={classes.descriptionWrapper}>
          <Typography variant="caption" className={classes.descriptionElement}>
            Remove Entity has no parameters and no interactions
          </Typography>
        </Paper>
      )}
      <Divider />

      <CardActions className={classes.actions}>
        <Tooltip title="Edit entity name">
          <IconButton onClick={() => toggleDialogue("editEntity", "show")} size="large">
            <Icon fontSize="small">edit</Icon>
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete entity">
          <IconButton onClick={() => toggleDialogue("confirmDelete", "show")} size="large">
            <Icon fontSize="small">delete</Icon>
          </IconButton>
        </Tooltip>
      </CardActions>

      <GenericDialogue
        title="Edit Current Entity"
        open={dialogues["editEntity"]}
        onClose={() => toggleDialogue("editEntity", "hide")}
        maxWidth="sm"
      >
        <CreateMapEntityForm
          data={Object.assign({}, stepMapEntity.parameters, {
            name: stepMapEntity.name,
            map_name: curMapName,
          })}
          curType={stepMapEntity.type}
          disabledInputs={["map_name"]}
          handleSubmit={(name, _mapName, parameters) => {
            toggleDialogue("editEntity", "hide");
            handleUpdateEntity(name, parameters);
          }}
          buttonText="Edit"
        />
      </GenericDialogue>

      <GenericDialogue
        title="Add Parameters"
        open={dialogues["viewParameters"]}
        onClose={() => toggleDialogue("viewParameters", "hide")}
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
            <Grid item xs={9}>
              <Typography variant="h5">Interactions</Typography>
            </Grid>
            <Grid item xs={3}>
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
        open={dialogues["viewInteractions"]}
        onClose={() => toggleDialogue("viewInteractions", "hide")}
        maxWidth="md"
      >
        <Grid container spacing={2}>
          {stepMapEntity.configurator_data.length <= 0 && (
            <Grid item xs="12">
              <Typography variant="body2" align="center" gutterBottom>
                <i>No interactions found</i>
              </Typography>
            </Grid>
          )}
          {stepMapEntity.configurator_data.map((id, index) => (
            <Grid key={id} item xs={12} md={6}>
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
        open={curInteractionType !== ""}
        onClose={() => setCurInteractionType("")}
        maxWidth="sm"
        helpComponent={usedHelpContent}
      >
        <CreateNPCInteractionForm
          interactionType={curInteractionType}
          handleSubmit={(data) => {
            handleAddInteraction(curInteractionType, data);
            setCurInteractionType("");
          }}
        />
      </GenericDialogue>

      <ConfirmationDialogue
        message={`Delete the entity ${stepMapEntity.name}?`}
        isOpen={dialogues["confirmDelete"]}
        handleClose={() => toggleDialogue("confirmDelete", "hide")}
        handleConfirm={() => {
          toggleDialogue("confirmDelete", "hide");
          handleDeleteEntity();
        }}
      />
    </Card>
  );
};

export default withStyles(styles)(StepMapEntity);
