import { useCallback, useMemo, useEffect } from 'react';
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
import { ConfirmationDialogue, FabAbsoluteContainer } from '../../elements';
import { ClearAll, Delete, MergeType, SelectAll } from '@mui/icons-material';
import { useDialogueManager } from '../../../hooks';

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
  
  const conversationAmount = useMemo(() => dialogueData ? dialogueData.conversations.length : 0, [dialogueData]);
  const mergeAmount = useMemo(() => conversationsToMerge ? conversationsToMerge.length : 0, [conversationsToMerge]);

  const [dialogues, toggleDialogue] = useDialogueManager('confirmMerge', 'confirmBulkDelete');

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
  const handleModifySelect = useCallback(
    () => {
      if (conversationAmount > mergeAmount) {
        dispatch(selectAllConversations());
      } else {
        dispatch(unselectAllConversations());
      }
    },
    [dispatch, mergeAmount, conversationAmount]
  )

  const handleExport = useCallback(() => {
    if (dialogueData.conversations.length <= 0) {
      enqueueSnackbar('Cannot export an empty dialogue file', {
        variant: 'error',
      });
    } else {
      dispatch(exportDialogue());
    }
  }, [dispatch, dialogueData]);


  useEffect(() => {
    window.exportDialogue = () => handleExport();
  }, [handleExport])

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
              handleFileNameChange={handleFileNameChange}
              handleAddConversation={handleAddConversation}
              handleDragEnd={handleDragEnd}
            />
          </DragDropContext> 
        </>
      )}
      {currentDialogueId === '' && (
        <NoDialogue
          handleEmptyDialogue={handleUpdateWithEmptyDialogue}
          handleUpdateFromFile={handleUpdateDialogueFromFile}
          handleMerge={handleImportAndMerge}
        />
      )}

      <FabAbsoluteContainer
        buttonMetadata={[
          {
            title: conversationAmount > mergeAmount ? 'Select All' : 'Unselect All',
            icon: conversationAmount > mergeAmount ? <SelectAll /> : <ClearAll />,
            color: 'default',
            hidden: conversationsToMerge.length <= 0,
            onClick: handleModifySelect
          },
          {
            title: 'Merge Selected',
            icon: <MergeType />,
            color: 'secondary',
            hidden: conversationsToMerge.length <= 0,
            onClick: () => toggleDialogue('confirmMerge', 'show')
          },
          {
            title: 'Delete Selected',
            icon: <Delete />,
            color: 'error',
            hidden: conversationsToMerge <= 0,
            onClick: () => toggleDialogue('confirmBulkDelete', 'show')
          }, 
          {
            title: 'Export',
            icon: <SystemUpdateAlt />,
            hidden: currentDialogueId === '',
            onClick: handleExport,
          },
        ]}
      />

      {/* Merge Confirmation Form */}
      <ConfirmationDialogue
        message={`Merge selected conversations?`}
        descriptionText={`${conversationsToMerge.length} conversations will be merged`}
        isOpen={dialogues['confirmMerge']}
        handleClose={() => toggleDialogue('confirmMerge', 'hide')}
        handleConfirm={() => {
          handleConfirmMerge();
          toggleDialogue('confirmMerge', 'hide');
        }}
      />

      {/* Bulk Delete Confirmation Form */}
      <ConfirmationDialogue
        message="Delete selected conversations?"
        descriptionText={`${conversationsToMerge.length} conversations will be deleted`}
        isOpen={dialogues['confirmBulkDelete']}
        handleClose={() => toggleDialogue('confirmBulkDelete', 'hide')}
        handleConfirm={() => {
          handleConfirmBulkDelete();
          toggleDialogue('confirmBulkDelete', 'hide');
        }}
      />
    </>
  );
};

export default DialogueContainer;
