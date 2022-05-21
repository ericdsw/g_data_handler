import React, { useState } from "react";
import withStyles from '@mui/styles/withStyles';
import {
  Paper,
  Typography,
  ButtonBase,
  Collapse,
  List,
  ListItem,
  IconButton,
  Icon,
  Divider,
} from "@mui/material";

import { GenericDialogue, ConfirmationDialogue } from "../../elements";
import { useDialogueManager } from "../../../hooks";
import CompleteConditionForm from "./forms/CompleteConditionForm";
import createConditionDescription from "./functions/createConditionDescription";

import { styles } from "./styles/CompleteConditionStyle";

const CompleteCondition = (props) => {
  const { classes, completeCondition } = props;

  const { handleDeleteCondition, handleEditCondition } = props;

  const [dialogues, toggleDialogue] = useDialogueManager(
    "confirmDelete",
    "editDialogue"
  );
  const [expanded, toggleExpand] = useState(false);

  const paramList = Object.keys(completeCondition.parameters).map((key) => (
    <ListItem key={key}>
      <Typography variant="caption">
        <b>{key}</b>: <i>{completeCondition.parameters[key]}</i>
      </Typography>
    </ListItem>
  ));

  return (
    <div>
      <ButtonBase className={classes.summaryWrapper}>
        <Paper
          square
          elevation={0}
          className={classes.conditionContainer}
          onClick={(e) => toggleExpand(!expanded)}
        >
          <Typography variant="caption">
            {completeCondition.unique_name}
          </Typography>
          <Typography variant="caption" className={classes.interactionTypeText}>
            {createConditionDescription(completeCondition)}
          </Typography>
        </Paper>
      </ButtonBase>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Divider />
        <Paper square elevation={0} className={classes.conditionContainer}>
          <List component="nav">{paramList}</List>
          <Typography align="left">
            <IconButton onClick={() => toggleDialogue("editDialogue", "show")} size="large">
              <Icon>edit</Icon>
            </IconButton>
            <IconButton onClick={() => toggleDialogue("confirmDelete", "show")} size="large">
              <Icon>delete</Icon>
            </IconButton>
          </Typography>
        </Paper>
      </Collapse>

      <ConfirmationDialogue
        message={`Delete the condition ${completeCondition.unique_name}?`}
        isOpen={dialogues["confirmDelete"]}
        handleClose={() => toggleDialogue("confirmDelete", "hide")}
        handleConfirm={() => {
          toggleDialogue("confirmDelete", "hide");
          handleDeleteCondition();
        }}
      />

      <GenericDialogue
        title={`Edit the current condition`}
        open={dialogues["editDialogue"]}
        onClose={() => toggleDialogue("editDialogue", "hide")}
        maxWidth="sm"
      >
        <CompleteConditionForm
          completionType={completeCondition.type}
          conditionParams={completeCondition.parameters}
          name={completeCondition.unique_name}
          buttonText="Update"
          handleSubmit={(name, data) => {
            toggleDialogue("editDialogue", "hide");
            handleEditCondition(name, data);
          }}
        />
      </GenericDialogue>
    </div>
  );
};

export default withStyles(styles)(CompleteCondition);
