import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { GenericDialogue, ConfirmationDialogue } from '../../elements';
import { CreateJumpForm } from './forms';
import { useDialogueManager } from '../../../hooks';
import JumpList from './JumpList';

const styles = theme => ({
    deleteButton: {
        color: red[500]
    }
});

const CutsceneToolbar = props => {

    // Extract value properties
    const { classes, jumps } = props;

    // Extract method properties
    const {
        handleAddRow, 
        handleAddJump, handleDeleteJump, 
        handleExport, handleClearCutscene
    } = props;

    // Dialogue management
    const [dialogues, toggleDialogue] = useDialogueManager(
        'confirmDelete', 'viewJumps', 'createJump'
    );

    return (
        <Grid
            container
            spacing={16}
            alignItems="center"
        >
            <Grid item xs={6}>
                <Typography align="left">
                    <Button 
                        color="primary"
                        onClick={() => handleAddRow()}
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
            <Grid item xs={6}>
                <Typography align="right">
                    <Button 
                        color="secondary"
                        onClick={() => toggleDialogue('viewJumps', 'show')}
                    >
                        View Jumps ({Object.keys(jumps).length})
                    </Button>
                    <Button 
                        color="secondary"
                        onClick={() => handleExport()}
                    >
                        Export
                    </Button>
                    <Button 
                        color="secondary"
                        className={classes.deleteButton}
                        onClick={() => toggleDialogue('confirmDelete', 'show')}
                    >
                        Clear Cutscene
                    </Button>
                </Typography>
            </Grid>

            <GenericDialogue
                title="Add Jump"
                open={dialogues['createJump']}
                onClose={() => toggleDialogue('createJump', 'hide')}
            >
                <CreateJumpForm 
                    creationHandler={
                        (jumpName, fileName) => {
                            handleAddJump(jumpName, fileName);
                            toggleDialogue('createJump', 'hide');
                        }
                    }
                />
            </GenericDialogue>

            <GenericDialogue
                title="Current Jumps"
                open={dialogues['viewJumps']}
                onClose={() => toggleDialogue('viewJumps', 'hide')}
            >
                <JumpList 
                    jumpList={jumps}
                    handleDeleteJump={jumpName => handleDeleteJump(jumpName)}
                />
            </GenericDialogue>

            <ConfirmationDialogue
                message="Delete the current cutscene?"
                isOpen={dialogues['confirmDelete']}
                handleConfirm={() => {
                    handleClearCutscene();
                    toggleDialogue('confirmDelete', 'hide');
                }}
                handleClose={() => toggleDialogue('confirmDelete', 'hide')}
            />

        </Grid>
    );

}

export default withStyles(styles)(CutsceneToolbar);
