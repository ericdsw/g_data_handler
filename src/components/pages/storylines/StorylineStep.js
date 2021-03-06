import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
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
} from "@material-ui/core";

import StepMapContainer from "../../containers/StepMapContainer";
import CompletionBundleContainer from "../../containers/CompletionBundleContainer";

import {
  GenericDialogue,
  ConfirmationDialogue,
  MenuIconButton,
  MenuButton,
} from "../../elements";
import { useDialogueManager } from "../../../hooks";
import { storylineEntityInputSchema } from "../../../globals";
import CreateMapEntityForm from "./forms/CreateMapEntityForm";
import CompletionBundleForm from "./forms/CompletionBundleForm";
import StorylineStepForm from "./forms/StorylineStepForm";

import { styles } from "./styles/StorylineStepStyle";

const StorylineStep = (props) => {
  // Properties
  const {
    classes,
    storylineStep,
    stepOffset,
    allSteps,
    completionDescription,
    configDescription,
  } = props;

  // Methods
  const {
    handleUpdateStepName,
    handleAddMapConfiguration,
    handleAddCompletionBundle,
    handleDeleteStep,
    handleDuplicateConfigs,
  } = props;

  const [dialogues, toggleDialogue] = useDialogueManager(
    "createCompletionBundle",
    "editName",
    "confirmDelete"
  );

  const [expanded, toggleExpanded] = useState(false);
  const [curEntityType, setCurEntityType] = useState("");

  const mapCount = storylineStep.configuration.length;
  const bundleCount = storylineStep.completion.length;
  const subHeader = `Configure ${mapCount} maps, watch ${bundleCount} bundles`;

  const eTypeOptions = {};
  for (const entityTypeKey in storylineEntityInputSchema) {
    const curEntity = storylineEntityInputSchema[entityTypeKey];
    eTypeOptions[entityTypeKey] = curEntity.name;
  }

  const duplicateOptions = {};
  for (const stepId in allSteps) {
    if (stepId !== storylineStep.id) {
      duplicateOptions[stepId] = allSteps[stepId].name;
    }
  }

  let fString = "";
  if (stepOffset === 0) {
    fString = "(Initial Step)";
  }

  function shortMapEntityDescription(mapEntity) {
    const entityName = <b className={classes.blueText}>{mapEntity.name}</b>;
    switch (mapEntity.type) {
      case "create_npc":
        return <Typography>Create NPC {entityName}</Typography>;
      case "configure_npc":
        return <Typography>Configure NPC {entityName}</Typography>;
      case "create_area":
        return <Typography>Create area {entityName}</Typography>;
      case "configure_group":
        return (
          <Typography>
            Configure GroupInteractionHandler {entityName}
          </Typography>
        );
      default:
        return entityName;
    }
  }

  function createNewEntity(name, mapName, parameters) {
    handleAddMapConfiguration(mapName, {
      name: name,
      type: curEntityType,
      parameters: parameters,
    });
  }

  function duplicateConfigurationInStep(stepId) {
    handleDuplicateConfigs(stepId);
  }

  const configDescriptionText = configDescription.map((mapData, index) => (
    <li key={mapData.map.id}>
      <Typography>
        NPCs in map&nbsp;
        <span className={classes.greenText}>{mapData.map.map_name}:</span>
      </Typography>
      <ul>
        {mapData.entities.map((entity, index) => (
          <li key={entity.id}>{shortMapEntityDescription(entity)}</li>
        ))}
      </ul>
    </li>
  ));

  const completionDescriptionText = completionDescription.map((data, index) => (
    <li key={data.bundle.id}>
      <Typography>
        Go to step&nbsp;
        <span className={classes.greenText}>{data.bundle.next_step}</span>{" "}
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
  ));

  const mapConfData =
    storylineStep.configuration &&
    storylineStep.configuration.map((stepMapId, index) => (
      <Grid item xs={12} key={stepMapId}>
        <StepMapContainer currentMapId={stepMapId} />
      </Grid>
    ));

  const completionData =
    storylineStep.completion &&
    storylineStep.completion.map((bundleId, index) => (
      <Grid item xs={12} key={bundleId}>
        <CompletionBundleContainer currentCompletionBundleId={bundleId} />
      </Grid>
    ));

  return (
    <Card>
      <CardHeader
        title={
          <React.Fragment>
            <Typography variant="h6">
              {storylineStep.name} &nbsp;
              <small className={classes.headerSmall}>{fString}</small>
            </Typography>
          </React.Fragment>
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
                      No completion bundles configured,&nbsp; the storyline will
                      finish here
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
          <IconButton onClick={() => toggleDialogue("editName", "show")}>
            <Icon>edit</Icon>
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete step">
          <IconButton onClick={() => toggleDialogue("confirmDelete", "show")}>
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
              toggleDialogue("createConditionBundle", "show");
            }}
          >
            <Icon>add_alert</Icon>
          </IconButton>
        </Tooltip>
        <IconButton
          className={classnames(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={() => toggleExpanded(!expanded)}
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
              <br />
              <Grid container spacing={2}>
                {mapConfData}
              </Grid>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Typography variant="h5" align="center" gutterBottom>
                Conditions
              </Typography>
              <br />
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
          curEntityType !== ""
            ? storylineEntityInputSchema[curEntityType].name
            : "Add Entity"
        }
        open={curEntityType !== ""}
        onClose={() => setCurEntityType("")}
        maxWidth="sm"
      >
        <CreateMapEntityForm
          curType={curEntityType}
          handleSubmit={(name, mapName, parameters) => {
            createNewEntity(name, mapName, parameters);
            setCurEntityType("");
          }}
        />
      </GenericDialogue>

      {/* Condition Bundle Creation Form */}
      <GenericDialogue
        title="Add Condition Bundle"
        open={dialogues["createConditionBundle"]}
        onClose={() => toggleDialogue("createConditionBundle", "hide")}
        maxWidth="sm"
      >
        <CompletionBundleForm
          handleSubmit={(data) => {
            toggleDialogue("createConditionBundle", "hide");
            handleAddCompletionBundle(data);
          }}
        />
      </GenericDialogue>

      {/* Edit Step Name */}
      <GenericDialogue
        title="Edit step name"
        maxWidth="sm"
        open={dialogues["editName"]}
        onClose={() => toggleDialogue("editName", "hide")}
      >
        <StorylineStepForm
          stepName={storylineStep.name}
          buttonText="Update"
          handleSubmit={(newName) => {
            toggleDialogue("editName", "hide");
            handleUpdateStepName(newName);
          }}
        />
      </GenericDialogue>

      {/* Delete Confirmation */}
      <ConfirmationDialogue
        message={`Delete the step ${storylineStep.name}?`}
        isOpen={dialogues["confirmDelete"]}
        handleClose={() => toggleDialogue("confirmDelete", "hide")}
        handleConfirm={() => {
          toggleDialogue("confirmDelete", "hide");
          handleDeleteStep();
        }}
      />
    </Card>
  );
};

export default withStyles(styles)(StorylineStep);
