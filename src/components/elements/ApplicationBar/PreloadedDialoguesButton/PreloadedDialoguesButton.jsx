import { useMemo } from 'react';
import { Tooltip, IconButton, Badge } from '@mui/material';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import Inventory2Icon from '@mui/icons-material/Inventory2';

import { useDialogueManager } from '@/hooks';
import { GenericDialogue } from '@/components/elements';
import PreloadedDialoguesContent from './PreloadedDialoguesContent';

const selectLoadedFileData = (state) => state.dialogue.preUploadedFiles;
const selectLoadedCutsceneFileData = (state) =>
  state.cutscene.preloadedCutsceneFileNames;

const selectData = createSelector(
  [selectLoadedFileData, selectLoadedCutsceneFileData],
  (preUploadedFiles) => ({
    preUploadedFiles,
  })
);

const PreloadedDialoguesButton = () => {

  const { preUploadedFiles } = useSelector((state) =>
    selectData(state)
  );
  const fileAmount = useMemo(
    () => Object.keys(preUploadedFiles).length,
    [preUploadedFiles]
  );

  const [dialogues, toggleDialogue] = useDialogueManager('preloadedDialoguesDialogue');

  const iconButtonClick = () => toggleDialogue('preloadedDialoguesDialogue', 'show');
  const closeDialogue = () => toggleDialogue('preloadedDialoguesDialogue', 'hide');

  return (
    <>
      <Tooltip title="Preloaded Dialogues">
        <IconButton
          size="large"
          color='inherith'
          onClick={iconButtonClick}
        >
          {fileAmount > 0 && (
            <Badge badgeContent={fileAmount} color="primary">
              <Inventory2Icon />
            </Badge>
          )}
          {fileAmount <= 0 && <Inventory2Icon />}
        </IconButton>
      </Tooltip>
      <GenericDialogue
        open={dialogues['preloadedDialoguesDialogue']}
        onClose={closeDialogue}
        maxWidth="md"
      >
        <PreloadedDialoguesContent />
      </GenericDialogue>
    </>
  );
}

export default PreloadedDialoguesButton;