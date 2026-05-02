import { Grid, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';

import { GenericDialogue } from '@/components/elements';
import { useDialogueManager } from '@/hooks';
import JumpList from './JumpList';
import { JumpForm } from './forms';


const DeleteButton = styled(Button)({
  color: red[400]
});

const CutsceneToolbar = ({
  jumps,
  handleAddRow,
  handleAddJump,
  handleDeleteJump,
  handleExport,
  handleClearCutscene,
}) => {
  // Dialogue management
  const [dialogues, toggleDialogue] = useDialogueManager(
    'confirmDelete',
    'viewJumps',
    'createJump'
  );

  return (
    <Grid container spacing={2} sx={{ alignItems: "center" }}>
      <Grid size={6}>
        <Typography align="left">
          <Button
            color="primary"
            onClick={handleAddRow}
          >
            Add Row
          </Button>
          <Button
            color="primary"
            onClick={() => toggleDialogue('createJump', 'show')}
          >
            Add Jump
          </Button>
        </Typography>
      </Grid>
      <Grid size={6}>
        <Typography align="right">
          <Button
            color="secondary"
            onClick={() => toggleDialogue('viewJumps', 'show')}
          >
            View Jumps ({Object.keys(jumps).length})
          </Button>
          <Button color="secondary" onClick={() => handleExport()}>
            Export
          </Button>
          <DeleteButton onClick={handleClearCutscene}>
            Clear Cutscene
          </DeleteButton>
        </Typography>
      </Grid>
      <GenericDialogue
        title="Add Jump"
        open={dialogues['createJump']}
        onClose={() => toggleDialogue('createJump', 'hide')}
        maxWidth="sm"
      >
        <JumpForm
          handleSubmit={({ jump_name, jump_file }) => {
            handleAddJump(jump_name, jump_file);
            toggleDialogue('createJump', 'hide');
          }}
        />
      </GenericDialogue>
      <GenericDialogue
        title="Current Jumps"
        open={dialogues['viewJumps']}
        onClose={() => toggleDialogue('viewJumps', 'hide')}
      >
        <JumpList
          jumpList={jumps}
          handleDeleteJump={(jumpName) => handleDeleteJump(jumpName)}
          handleEditJump={({ jump_name, jump_file }) => {
            /**
             * Note how we are using the "add" method here, even tho it is a
             * delete transaction. This is because jumps are stored as key-value
             * pairs, so trying to add a new one with the same name as an existing
             * one will just overwrite it.
             */
            handleAddJump(jump_name, jump_file);
          }}
        />
      </GenericDialogue>
    </Grid>
  );
};

export default CutsceneToolbar;
