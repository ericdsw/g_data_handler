import React from "react";
import withStyles from '@mui/styles/withStyles';
import {
  Typography,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Avatar,
  Icon,
  IconButton,
} from "@mui/material";
import { ConfirmationDialogue, GenericDialogue } from "../../elements";
import { useDialogueManager } from "../../../hooks";
import CreateNPCInteractionForm from "./forms/CreateNPCInteractionForm";
import { interactionInputSchema } from "../../../globals";

const styles = (theme) => ({
  interactionCard: {
    background: "#555",
  },
});

const NPCInteraction = (props) => {
  // Properties
  const { npcInteraction, classes } = props;

  // Methods
  const { handleEdit, handleDelete } = props;

  const paramKeys = Object.keys(npcInteraction.parameters);

  const [dialogues, toggleDialogue] = useDialogueManager(
    "confirmDelete",
    "edit"
  );

  function getHeader(type) {
    const { name, icon } = interactionInputSchema[type];

    return (
      <CardHeader
        title={<Typography variant="h6">{name}</Typography>}
        avatar={
          <Avatar>
            <Icon>{icon}</Icon>
          </Avatar>
        }
        action={
          <React.Fragment>
            <IconButton onClick={() => toggleDialogue("edit", "show")} size="large">
              <Icon>edit</Icon>
            </IconButton>
            <IconButton onClick={() => toggleDialogue("confirmDelete", "show")} size="large">
              <Icon>delete</Icon>
            </IconButton>
          </React.Fragment>
        }
      />
    );
  }

  function getParameterDescription(value) {
    if (Array.isArray(value)) {
      return value.map((curValue, index) => (
        <React.Fragment key={curValue}>
          <b>-</b>&nbsp; <i>{curValue}</i>
          <br />
        </React.Fragment>
      ));
    } else {
      return <i>{value}</i>;
    }
  }

  return (
    <Card className={classes.interactionCard}>
      {getHeader(npcInteraction.type)}
      <Table>
        <TableBody>
          {paramKeys.map((key, index) => (
            <TableRow key={key}>
              <TableCell padding="checkbox">
                <Typography>
                  <b>&nbsp;&nbsp;{key}:</b>
                </Typography>
              </TableCell>
              <TableCell>
                <Typography>
                  {getParameterDescription(npcInteraction.parameters[key])}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <br />

      <GenericDialogue
        title="Edit Interaction"
        open={dialogues["edit"]}
        onClose={() => toggleDialogue("edit", "hide")}
        maxWidth="sm"
      >
        <CreateNPCInteractionForm
          interactionType={npcInteraction.type}
          data={npcInteraction.parameters}
          buttonText="Edit"
          handleSubmit={(data) => {
            toggleDialogue("edit", "hide");
            handleEdit(data);
          }}
        />
      </GenericDialogue>

      <ConfirmationDialogue
        message="Delete the current NPC Interaction?"
        isOpen={dialogues["confirmDelete"]}
        handleClose={() => toggleDialogue("confirmDelete", "hide")}
        handleConfirm={() => {
          toggleDialogue("confirmDelete", "hide");
          handleDelete();
        }}
      />
    </Card>
  );
};

export default withStyles(styles)(NPCInteraction);
