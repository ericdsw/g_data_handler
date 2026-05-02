import React, { useMemo, useCallback } from 'react';
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
} from '@mui/material';
import { useSelector } from 'react-redux';

import { ConfirmationDialogue, GenericDialogue } from '@/components/elements';
import { useDialogueManager } from '@/hooks';
import { interactionInputSchema } from '@/globals';
import CreateNPCInteractionForm from './forms/CreateNPCInteractionForm';

const NPCInteraction = ({ npcInteraction, handleEdit, handleDelete }) => {
  const { darkMode } = useSelector((state) => state.app);
  const cardBackground = useMemo(() => darkMode ? '#463f47' : '#fafafa', [darkMode]);

  const paramKeys = useMemo(
    () => Object.keys(npcInteraction.parameters),
    [npcInteraction]
  );

  const [dialogues, toggleDialogue] = useDialogueManager(
    'confirmDelete',
    'edit'
  );

  const header = useMemo(() => {
    const { name, icon } = interactionInputSchema[npcInteraction.type];
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
            <IconButton
              onClick={() => toggleDialogue('edit', 'show')}
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
          </React.Fragment>
        }
      />
    );
  }, [toggleDialogue, npcInteraction.type]);

  const getParameterDescription = useCallback((value) => {
    if (Array.isArray(value)) {
      return value.map((curValue) => (
        <React.Fragment key={curValue}>
          <b>-</b>&nbsp; <i>{curValue}</i>
          <br />
        </React.Fragment>
      ));
    } else {
      return <i>{value}</i>;
    }
  }, []);

  return (
    <Card sx={{ background: cardBackground }}>
      {header}
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
                <Typography variant="caption">
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
        open={dialogues['edit']}
        onClose={() => toggleDialogue('edit', 'hide')}
        maxWidth="sm"
      >
        <CreateNPCInteractionForm
          interactionType={npcInteraction.type}
          data={npcInteraction.parameters}
          buttonText="Edit"
          handleSubmit={(data) => {
            toggleDialogue('edit', 'hide');
            handleEdit(data);
          }}
        />
      </GenericDialogue>

      <ConfirmationDialogue
        message="Delete the current NPC Interaction?"
        isOpen={dialogues['confirmDelete']}
        handleClose={() => toggleDialogue('confirmDelete', 'hide')}
        handleConfirm={() => {
          toggleDialogue('confirmDelete', 'hide');
          handleDelete();
        }}
      />
    </Card>
  );
};

export default NPCInteraction;
