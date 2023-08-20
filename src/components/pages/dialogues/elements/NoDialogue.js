import React, { useState, useMemo, Fragment } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { Icon, Button, Divider, Paper, Grid, Typography, IconButton } from '@mui/material';
import {v4 as uuid } from 'uuid';

import { DragAndDrop, DragJsonFileManager, GenericDialogue } from '../../../elements';
import { useDialogueManager } from '../../../../hooks';
import { parseFile } from '../../../../functions';


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    marginBottom: 24,
  },
  dragCapturer: {
    padding: 16,
    marginTop: 24,
    minHeight: 332
  },
  gridContainer: {
    minHeight: 300,
  },
}));

const NoDialogue = ({
  handleEmptyDialogue,
  handleUpdateFromFile,
  handleMerge
}) => {

  const [dialogues, toggleDialogue] = useDialogueManager('mergeDialogue');
  const [dialoguesToMerge, updateDialoguesToMerge] = useState({});

  const classes = useStyles();

  const processNewFile = async (newFiles) => {

    const newData = {};

    // Import the data while making sure that the dragged files contain no repeated conversation names.
    for (let i = 0; i < newFiles.length; i++) {
      const newFile = newFiles[i];
      try {
        const json = await parseFile(newFile, 'application/json');
        const treatedJson = {};
        let existingKeys = [];
        Object.keys(newData).forEach(newDataFileName => {
          existingKeys += Object.keys(newData[newDataFileName])
        });

        Object.keys(json).forEach(conversationName => {
          if (existingKeys.includes(conversationName)) {
            treatedJson[`${conversationName}_${newFile.name.toUpperCase()}`] = json[conversationName];
          } else {
            treatedJson[`${conversationName}`] = json[conversationName];
          }
        });
        newData[newFile.name] = treatedJson;
      } catch (e) {
        console.log(e)
      }
    }

    // Make sure that no existing data contains repeated conversations.

    let oldDataKeys = [];
    Object.keys(dialoguesToMerge).forEach(fileName => {
      const curFileConverations = Object.keys(dialoguesToMerge[fileName])
      oldDataKeys += curFileConverations;
    });

    const parsedNewData = {};
    Object.keys(newData).forEach(newFileName => {
      parsedNewData[newFileName] = {}
      Object.keys(newData[newFileName]).forEach(conversationName => {
        if (oldDataKeys.includes(conversationName)) {
          parsedNewData[newFileName][`${conversationName}_${uuid()}`] = newData[newFileName][conversationName];
        } else {
          parsedNewData[newFileName][conversationName] = newData[newFileName][conversationName];
        }
      })
    });

    updateDialoguesToMerge({
      ...dialoguesToMerge,
      ...parsedNewData
    });
    
  }

  const deleteFile = fileName => {
    let newDialogues = {...dialoguesToMerge};
    delete newDialogues[fileName];
    updateDialoguesToMerge(newDialogues);
  }

  const hasDialoguesToMerge = useMemo(() => Object.keys(dialoguesToMerge).length > 0, [dialoguesToMerge])

  return (
    <div>
      <DragJsonFileManager
        buttonString="New Dialogue"
        additionalActions={[
          { title: "Import & Merge", action: () => toggleDialogue('mergeDialogue', 'show') }
        ]}
        dragString={
          <React.Fragment>
            <Typography gutterBottom>
              <Icon fontSize="large">question_answer</Icon>
            </Typography>
            Drag a <code>.json</code> here to edit an existing dialogue.
          </React.Fragment>
        }
        handleEmpty={handleEmptyDialogue}
        handleUpdateFromFile={handleUpdateFromFile}
      />

      <GenericDialogue
        open={dialogues['mergeDialogue']}
        onClose={() => toggleDialogue('mergeDialogue', 'hide')}
        maxWidth='sm'
      >
        <Typography variant="h5">
          Import & Merge
          <DragAndDrop handleDrop={file => processNewFile(file)}>
            <Paper elevation={1} className={classes.dragCapturer}>

              {!hasDialoguesToMerge && (
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  className={classes.gridContainer}
                >
                  <Grid item xs>
                    <Typography color="textSecondary" align="center" variant="h4">
                      <p>Drag dialogue json files here to merge</p>
                    </Typography>
                  </Grid>
                </Grid>
              )}

              {hasDialoguesToMerge && (
                Object.keys(dialoguesToMerge).map((dialogueKey, index) => (
                  <Fragment
                    key={dialogueKey}
                  >
                    <Grid
                      container
                      alignItems="center"
                      style={{
                        padding: 8,
                      }}
                    >
                      <Grid item xs>
                        <Typography variant="body1">
                          {dialogueKey}
                          <br />
                          <Typography variant="caption">
                            It has {Object.keys(dialoguesToMerge[dialogueKey]).length} conversations
                          </Typography>
                        </Typography>
                      </Grid>
                      <Grid item xs={1} container justifyContent="flex-end">
                        <IconButton
                          onClick={() => deleteFile(dialogueKey)}
                        >
                          <Icon>delete</Icon>
                        </IconButton>
                      </Grid>
                    </Grid>
                    {index < Object.keys(dialoguesToMerge).length - 1 && (
                      <Divider />
                    )}
                  </Fragment>
                ))
              )}

            </Paper>
          </DragAndDrop>
        </Typography>
        <Grid container justifyContent="flex-end" style={{ paddingTop: 16 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleMerge(dialoguesToMerge);
              toggleDialogue('mergeDialogue', 'hide');
              updateDialoguesToMerge({});
            }}
          >
            Import And Merge
          </Button>
        </Grid>
      </GenericDialogue>
    </div>
  );
};

export default NoDialogue;
