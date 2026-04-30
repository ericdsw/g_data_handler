import React, { useState, useMemo } from 'react';
import { makeStyles } from '@mui/styles';
import {
  Typography,
  ButtonBase,
  Collapse,
  List,
  ListItem,
  IconButton,
  Icon,
  Card,
} from '@mui/material';

import { GenericDialogue, ConfirmationDialogue } from '../../elements';
import { useDialogueManager } from '../../../hooks';
import CompleteConditionForm from './forms/CompleteConditionForm';
import createConditionDescription from './functions/createConditionDescription';

import { styles } from './styles/CompleteConditionStyle';

const useStyles = makeStyles(styles);

const CompleteCondition = ({
  completeCondition,
  handleDeleteCondition,
  handleEditCondition,
}) => {
  const classes = useStyles();

  const [dialogues, toggleDialogue] = useDialogueManager(
    'confirmDelete',
    'editDialogue'
  );
  const [expanded, toggleExpand] = useState(false);

  const paramList = useMemo(
    () =>
      Object.keys(completeCondition.parameters).map((key) => (
        <ListItem key={key}>
          <Typography variant="caption">
            <b>{key}</b>: <i>{completeCondition.parameters[key]}</i>
          </Typography>
        </ListItem>
      )),
    [completeCondition.parameters]
  );

  return (
    <div>
      <ButtonBase className={classes.summaryWrapper}>
        <Card
          square
          className={classes.conditionContainer}
          onClick={() => toggleExpand(!expanded)}
        >
          <Typography variant="caption">
            [unique name: {completeCondition.unique_name}]
          </Typography>
          <br />
          <Typography variant="caption" className={classes.interactionTypeText}>
            {createConditionDescription(completeCondition)}
          </Typography>
        </Card>
      </ButtonBase>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {/* <Divider /> */}
        <Card square className={classes.conditionContainer}>
          <List component="nav">{paramList}</List>
          <Typography align="left">
            <IconButton
              onClick={() => toggleDialogue('editDialogue', 'show')}
              size="large"
            >
              <Icon>edit</Icon>
            </IconButton>
            <IconButton
              onClick={() => toggleDialogue('confirmDelete', 'show')}
              size="large"
            >
              <Icon>delete</Icon>
            </IconButton>
          </Typography>
        </Card>
      </Collapse>

      <ConfirmationDialogue
        message={`Delete the condition ${completeCondition.unique_name}?`}
        isOpen={dialogues['confirmDelete']}
        handleClose={() => toggleDialogue('confirmDelete', 'hide')}
        handleConfirm={() => {
          toggleDialogue('confirmDelete', 'hide');
          handleDeleteCondition();
        }}
      />

      <GenericDialogue
        title={`Edit the current condition`}
        open={dialogues['editDialogue']}
        onClose={() => toggleDialogue('editDialogue', 'hide')}
        maxWidth="sm"
      >
        <CompleteConditionForm
          completionType={completeCondition.type}
          conditionParams={completeCondition.parameters}
          name={completeCondition.unique_name}
          buttonText="Update"
          handleSubmit={(name, data) => {
            toggleDialogue('editDialogue', 'hide');
            handleEditCondition(name, data);
          }}
        />
      </GenericDialogue>
    </div>
  );
};

export default CompleteCondition;
