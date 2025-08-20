import makeStyles from '@mui/styles/makeStyles';
import { Grid, Typography, Button } from '@mui/material';

import { GenericDialogue } from '../../elements';
import { JumpForm } from './forms';
import { useDialogueManager } from '../../../hooks';
import JumpList from './JumpList';

import { styles } from './styles/CutsceneToolbarStyle';

const useStyles = makeStyles(styles);

const CutsceneToolbar = ({
  jumps,
  handleAddRow,
  handleAddJump,
  handleDeleteJump,
  handleExport,
  handleClearCutscene,
}) => {
  const classes = useStyles();

  // Dialogue management
  const [dialogues, toggleDialogue] = useDialogueManager(
    'confirmDelete',
    'viewJumps',
    'createJump'
  );

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={6}>
        <Typography align="left">
          <Button
            color="primary"
            className={classes.defaultButton}
            onClick={() => handleAddRow()}
          >
            Add Row
          </Button>
          <Button
            color="primary"
            className={classes.defaultButton}
            onClick={() => toggleDialogue('createJump', 'show')}
          >
            Add Jump
          </Button>
        </Typography>
      </Grid>
      <Grid item xs={6}>
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
          <Button
            color="secondary"
            className={classes.deleteButton}
            onClick={handleClearCutscene}
          >
            Clear Cutscene
          </Button>
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
