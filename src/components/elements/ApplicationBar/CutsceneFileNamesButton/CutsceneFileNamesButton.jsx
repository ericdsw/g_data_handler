import { useMemo } from 'react';
import { Tooltip, IconButton, Badge } from '@mui/material';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import AllInboxIcon from '@mui/icons-material/AllInbox';

import { useDialogueManager } from '@/hooks';
import { GenericDialogue } from '@/components/elements';
import PreLoadedCutscenesContent from './PreLoadedCutscenesContent';

const selectLoadedFileData = (state) => state.dialogue.preUploadedFiles;
const selectLoadedCutsceneFileData = (state) =>
  state.cutscene.preloadedCutsceneFileNames;

const selectData = createSelector(
  [selectLoadedFileData, selectLoadedCutsceneFileData],
  (preUploadedFiles, preUploadedCutsceneFiles) => ({
    preUploadedFiles,
    preUploadedCutsceneFiles,
  })
);

const CutsceneFileNamesButton = () => {

  const { preUploadedCutsceneFiles } = useSelector((state) =>
    selectData(state)
  );

  const cutsceneFileAmount = useMemo(
    () => preUploadedCutsceneFiles.length,
    [preUploadedCutsceneFiles]
  );

  const [dialogues, toggleDialogue] = useDialogueManager('preloadedCutscenesDialogue');

  const iconButtonClick = () => {
    toggleDialogue('preloadedCutscenesDialogue', 'show');
  }

  const closeDialogue = () => {
    toggleDialogue('preloadedCutscenesDialogue', 'hide');
  }

  return (
    <>
      <Tooltip title="Cutscene File Names">
        <IconButton
          size="large"
          color="inherith"
          onClick={iconButtonClick}
        >
          {cutsceneFileAmount > 0 && (
            <Badge badgeContent={cutsceneFileAmount} color="primary">
              <AllInboxIcon />
            </Badge>
          )}
          {cutsceneFileAmount <= 0 && <AllInboxIcon />}
        </IconButton>
      </Tooltip>
      <GenericDialogue
        open={dialogues['preloadedCutscenesDialogue']}
        onClose={closeDialogue}
        maxWidth="md"
      >
        <PreLoadedCutscenesContent />
      </GenericDialogue>
    </>
  );
}

export default CutsceneFileNamesButton;