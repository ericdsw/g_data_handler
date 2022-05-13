import React from "react";
import {
  TableRow,
  TableCell,
  IconButton
} from "@material-ui/core"

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import { useDialogueManager } from "../../../../hooks";
import { GenericDialogue, ConfirmationDialogue } from "../../../elements";
import { JumpForm } from "../forms";

const JumpTableRow = ({
  jumpName,
  jumpPath,
  handleDeleteJump,
  handleEditJump
}) => {

  const [dialogues, toggleDialogue] = useDialogueManager("edit")

  return (
    <TableRow key={jumpName}>

      <GenericDialogue
        title="Edit Jump"
        open={dialogues["edit"]}
        onClose={() => toggleDialogue("edit", "hide")}
        maxWidth="sm"
      >
        <JumpForm
          data={{
            jump_name: jumpName,
            jump_file: jumpPath
          }}
          isEdit
          buttonText="Edit Jump"
          handleSubmit={data => {
            toggleDialogue("edit", "hide");
            handleEditJump(data);
          }}
        />
      </GenericDialogue>

      <TableCell><b>{jumpName}</b></TableCell>
      <TableCell style={{ width: '100%' }}>
        <i>{jumpPath}</i>
      </TableCell>
      
      <TableCell style={{ width: 50 }} padding="dense">
        <IconButton
          onClick={() => handleDeleteJump(jumpName)}
          aria-label="Delete"
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>

      <TableCell style={{ width: 50 }} padding="dense">
        <IconButton
          onClick={() => toggleDialogue("edit", "show")}
          aria-label="Delete"
        >
          <EditIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

export default JumpTableRow;
