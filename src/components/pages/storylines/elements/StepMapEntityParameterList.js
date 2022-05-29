import React, { useState, useMemo, useCallback } from 'react';
import { makeStyles } from '@mui/styles';
import { blue } from '@mui/material/colors';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  TextField,
  IconButton,
  Icon,
  Grid,
  Button,
  Divider,
} from '@mui/material';

import { ConfirmationDialogue } from '../../../elements';
import { useDialogueManager } from '../../../../hooks';

const useStyles = makeStyles(() => ({
  blueText: {
    color: blue[400],
  },
  emptyMessage: {
    fontStyle: 'italic',
    padding: 16,
  },
}));

const StepMapEntityParameterList = ({
  entityParams,
  handleAddParameter,
  handleEditParameter,
  handleDeleteParameter,
}) => {
  const classes = useStyles();

  const [dialogues, toggleDialogue] = useDialogueManager('confirmParamDelete');

  const paramKeys = useMemo(() => Object.keys(entityParams), [entityParams]);

  const [editingParam, toggleEditingParam] = useState('');
  const [newParamName, setNewParamName] = useState('');
  const [newParamVal, setNewParamVal] = useState('');

  const modifyParam = useCallback(
    (param) => {
      if (editingParam === param) {
        toggleEditingParam('');
      } else {
        toggleEditingParam(param);
      }
    },
    [editingParam, toggleEditingParam]
  );

  const formSubmitted = useCallback(
    (event) => {
      event.preventDefault();
      handleAddParameter(newParamName, newParamVal);
      setNewParamName('');
      setNewParamVal('');
    },
    [handleAddParameter, newParamName, newParamVal]
  );

  return (
    <React.Fragment>
      <form
        onSubmit={(e) => {
          formSubmitted(e);
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={5}>
            <TextField
              id="new_param_name"
              label="Parameter Name"
              value={newParamName}
              type="text"
              variant="outlined"
              margin="normal"
              fullWidth
              onChange={(e) => setNewParamName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={5}>
            <TextField
              id="new_param_val"
              label="Parameter Value"
              value={newParamVal}
              type="text"
              variant="outlined"
              margin="normal"
              fullWidth
              onChange={(e) => setNewParamVal(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Button color="primary" variant="contained" type="submit" fullWidth>
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
      <br />
      <Divider />
      <br />
      <Typography variant="h6">Parameters</Typography>
      {paramKeys.length <= 0 && (
        <Typography
          variant="body2"
          className={classes.emptyMessage}
          align="center"
        >
          No parmeters found
        </Typography>
      )}
      {paramKeys.length > 0 && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Parameter Name</TableCell>
              <TableCell>Value</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paramKeys.map((param, index) => (
              <TableRow key={param}>
                <TableCell>
                  <Typography className={classes.blueText} variant="subtitle2">
                    {param}
                  </Typography>
                </TableCell>
                <TableCell>
                  <TextField
                    id={param}
                    value={entityParams[param]}
                    type="text"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    disabled={editingParam !== param}
                    onChange={(e) => {
                      handleEditParameter(param, e.target.value);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Typography align="right">
                    <IconButton onClick={() => modifyParam(param)} size="large">
                      {editingParam !== param && (
                        <Icon fontSize="small">edit</Icon>
                      )}
                      {editingParam === param && (
                        <Icon fontSize="small">done</Icon>
                      )}
                    </IconButton>
                    &nbsp;
                    <IconButton
                      onClick={() => {
                        toggleEditingParam(param);
                        toggleDialogue('confirmParamDelete', 'show');
                      }}
                      size="large"
                    >
                      <Icon fontSize="small">delete</Icon>
                    </IconButton>
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <ConfirmationDialogue
        message={`Delete the parameter ${editingParam}?`}
        isOpen={dialogues['confirmParamDelete']}
        handleClose={() => {
          toggleDialogue('confirmParamDelete', 'hide');
          toggleEditingParam('');
        }}
        handleConfirm={() => {
          toggleDialogue('confirmParamDelete', 'hide');
          handleDeleteParameter(editingParam);
          toggleEditingParam('');
        }}
      />
    </React.Fragment>
  );
};

export default StepMapEntityParameterList;
