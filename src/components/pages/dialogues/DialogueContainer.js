import React, { useCallback } from 'react';
import { enqueueSnackbar } from 'notistack';
import { DragDropContext } from 'react-beautiful-dnd';

import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

import {
  updateDialogue,
  updateWithEmptyDialogue,
  updateDialogueFilename,
  addDialogueConversation,
  deleteCurrentDialogue,
  reorderConversations,
  reorderMessage,
  moveMessage,
  confirmConversationMerge,
  deleteConversationsToMerge,
  selectAllConversations,
  unselectAllConversations,
  exportDialogue,
} from '../../../actions/dialogueActions';
import { parseFile } from '../../../functions';
import NoDialogue from './elements/NoDialogue';
import { transformIn } from '../../../models/transformers/DialogueTransformer';
import Dialogue from './Dialogue';
import DialogueToolbar from './elements/DialogueToolbar';
import SystemUpdateAlt from '@mui/icons-material/SystemUpdateAlt';
import { FabAbsoluteContainer } from '../../elements';

const memoizedSelectCurrentDialogue = createSelector(
  (state) => state.dialogue.dialogues,
  (state) => state.dialogue.currentDialogue,
  (dialogueData, currentDialogue) => dialogueData[currentDialogue]
);

const DialogueContainer = () => {
  const dispatch = useDispatch();
  const fileName = useSelector((state) => state.dialogue.fileName);
  const conversationsToMerge = useSelector(
    (state) => state.dialogue.conversationsToMerge
  );
  const currentDialogueId = useSelector(
    (state) => state.dialogue.currentDialogue
  );

  const dialogueData = useSelector((state) =>
    memoizedSelectCurrentDialogue(state)
  );

  const handleDeleteDialogue = useCallback(
    () => dispatch(deleteCurrentDialogue()),
    [dispatch]
  );
  const handleUpdateWithEmptyDialogue = useCallback(
    () => dispatch(updateWithEmptyDialogue('file_name.json')),
    [dispatch]
  );
  const handleUpdateDialogueFromFile = useCallback(
    (targetFile) => {
      parseFile(targetFile, 'application/json')
        .then((json) => {
          const { result, entities } = transformIn(json);

          // Inject type if not found
          Object.keys(entities.messages).forEach((mId) => {
            if (!entities.messages[mId].type) {
              if (!entities.messages[mId].is_emote) {
                entities.messages[mId].type = 'message';
              } else {
                entities.messages[mId].type = 'emote';
              }
            }
          });

          dispatch(updateDialogue(targetFile.name, result, entities));
        })
        .catch((e) => {
          console.log(e);
          enqueueSnackbar('Error parsing file', { variant: 'error' });
        });
    },
    [dispatch]
  );
  const handleAddConversation = useCallback(
    (conversationName) =>
      dispatch(addDialogueConversation(currentDialogueId, conversationName)),
    [dispatch, currentDialogueId]
  );
  const handleFileNameChange = useCallback(
    (newFileName) => dispatch(updateDialogueFilename(newFileName)),
    [dispatch]
  );
  const handleImportAndMerge = useCallback(
    (dialoguesToMerge) => {
      let compositeDialogue = {};
      for (let i = 0; i < Object.keys(dialoguesToMerge).length; i++) {
        const key = Object.keys(dialoguesToMerge)[i];
        const usedJson = dialoguesToMerge[key];
        compositeDialogue = {
          ...compositeDialogue,
          ...usedJson,
        };
      }

      const { result, entities } = transformIn(compositeDialogue);

      // Inject type if not found
      Object.keys(entities.messages).forEach((mId) => {
        if (!entities.messages[mId].type) {
          if (!entities.messages[mId].is_emote) {
            entities.messages[mId].type = 'message';
          } else {
            entities.messages[mId].type = 'emote';
          }
        }
      });
      dispatch(updateDialogue('Amalgamation.json', result, entities));
    },
    [dispatch]
  );
  const handleDragEnd = useCallback(
    (result) => {
      const { source, destination, draggableId } = result;
      // If no destination is defined or no movement needs to be made, skip
      if (
        !destination ||
        (destination.droppableId === source.droppableId &&
          destination.index === source.index)
      ) {
        return;
      }

      if (result.type === 'conversations') {
        dispatch(
          reorderConversations(
            source.index,
            destination.index,
            currentDialogueId,
            draggableId
          )
        );
      } else {
        if (source.droppableId === destination.droppableId) {
          // Move inside
          dispatch(
            reorderMessage(
              source.index,
              destination.index,
              source.droppableId,
              draggableId
            )
          );
        } else {
          // Move outside
          dispatch(
            moveMessage(
              source.index,
              destination.index,
              source.droppableId,
              destination.droppableId,
              draggableId
            )
          );
        }
      }
    },
    [dispatch, currentDialogueId]
  );
  const handleConfirmMerge = useCallback(
    () => dispatch(confirmConversationMerge()),
    [dispatch]
  );
  const handleConfirmBulkDelete = useCallback(
    () => dispatch(deleteConversationsToMerge()),
    [dispatch]
  );
  const handleSelectAllConversations = useCallback(
    () => dispatch(selectAllConversations()),
    [dispatch]
  );
  const handleUnselectAllConversations = useCallback(
    () => dispatch(unselectAllConversations()),
    [dispatch]
  );

  const handleExport = useCallback(() => {
    if (dialogueData.conversations.length <= 0) {
      enqueueSnackbar('Cannot export an empty dialogue file', {
        variant: 'error',
      });
    } else {
      dispatch(exportDialogue());
    }
  }, [dispatch, dialogueData]);

  return (
    <>
      {currentDialogueId !== '' && (
        <>
          <DialogueToolbar
            handleExport={handleExport}
            handleClear={handleDeleteDialogue}
            handleAddConversation={handleAddConversation}
          />
          <DragDropContext onDragEnd={handleDragEnd}>
            <Dialogue
              fileName={fileName}
              dialogueData={dialogueData}
              conversationsToMerge={conversationsToMerge}
              handleFileNameChange={handleFileNameChange}
              handleAddConversation={handleAddConversation}
              handleDragEnd={handleDragEnd}
              handleConfirmMerge={handleConfirmMerge}
              handleConfirmBulkDelete={handleConfirmBulkDelete}
              handleSelectAll={handleSelectAllConversations}
              handleUnselectAll={handleUnselectAllConversations}
            />
          </DragDropContext>
          <FabAbsoluteContainer
            buttonMetadata={[
              {
                title: 'Export',
                icon: <SystemUpdateAlt />,
                onClick: handleExport,
              },
            ]}
          />
        </>
      )}
      {currentDialogueId === '' && (
        <NoDialogue
          handleEmptyDialogue={handleUpdateWithEmptyDialogue}
          handleUpdateFromFile={handleUpdateDialogueFromFile}
          handleMerge={handleImportAndMerge}
        />
      )}
    </>
  );
};

export default DialogueContainer;
