import React from 'react';
import { TableRow, TableCell, IconButton } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { useDialogueManager } from '../../../../hooks';
import { GenericDialogue, ConfirmationDialogue } from '../../../elements';
import { JumpForm } from '../forms';

const JumpTableRow = ({
  jumpName,
  jumpPath,
  handleDeleteJump,
  handleEditJump,
}) => {
  const [dialogues, toggleDialogue] = useDialogueManager(
    'edit',
    'confirmDelete'
  );

  return (
    <TableRow key={jumpName}>
      {/* Edit Form */}
      <GenericDialogue
        title="Edit Jump"
        open={dialogues['edit']}
        onClose={() => toggleDialogue('edit', 'hide')}
        maxWidth="sm"
      >
        <JumpForm
          data={{
            jump_name: jumpName,
            jump_file: jumpPath,
          }}
          isEdit
          buttonText="Edit Jump"
          handleSubmit={(data) => {
            toggleDialogue('edit', 'hide');
            handleEditJump(data);
          }}
        />
      </GenericDialogue>

      {/* Delete Confirmation */}
      <ConfirmationDialogue
        isOpen={dialogues['confirmDelete']}
        message={`Delete the cutscene jump "${jumpName}"?`}
        handleClose={() => {
          toggleDialogue('confirmDelete', 'hide');
        }}
        handleConfirm={() => {
          toggleDialogue('confirmDelete', 'hide');
          handleDeleteJump(jumpName);
        }}
      />

      <TableCell>
        <b>{jumpName}</b>
      </TableCell>
      <TableCell style={{ width: '100%' }}>
        <i>{jumpPath}</i>
      </TableCell>

      <TableCell style={{ width: 50 }} padding="dense">
        <IconButton
          onClick={() => {
            toggleDialogue('confirmDelete', 'show');
          }}
          aria-label="Delete"
          size="large"
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>

      <TableCell style={{ width: 50 }} padding="dense">
        <IconButton
          onClick={() => toggleDialogue('edit', 'show')}
          aria-label="Delete"
          size="large"
        >
          <EditIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default JumpTableRow;
