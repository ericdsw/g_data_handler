import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
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
    Divider
} from '@material-ui/core';

import { useDialogueManager } from '../../../../hooks';

const styles = theme => ({
    blueText: {
        color: blue[400]
    },
    emptyMessage: {
        fontStyle: 'italic',
        padding: 16
    }
});

const StepMapEntityParameterList = props => {

    // Properties
    const { classes, entityParams } = props;

    // Methods
    const { 
        handleAddParameter, handleEditParameter, handleDeleteParameter
    } = props;

    const paramKeys = Object.keys(entityParams)

    const [editingParam, toggleEditingParam] = useState('');

    const [newParamName, setNewParamName] = useState('');
    const [newParamVal, setNewParamVal] = useState('');

    function modifyParam(param) {
        if (editingParam === param) {
            toggleEditingParam('');
        } else {
            toggleEditingParam(param);
        }
    }

    function formSubmitted(event) {
        event.preventDefault();
    }

    return (
        <React.Fragment>
            <form onSubmit={e => {formSubmitted(e)}}>
                <Grid 
                    container 
                    spacing={16}
                    alignItems='center'
                >
                    <Grid item xs={12} md={5}>
                        <TextField
                            id='new_param_name'
                            label='Parameter Name'
                            value={newParamName}
                            type='text'
                            variant='outlined'
                            margin='normal'
                            fullWidth
                            onChange={e => setNewParamName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <TextField
                            id='new_param_val'
                            label='Parameter Value'
                            value={newParamVal}
                            type='text'
                            variant='outlined'
                            margin='normal'
                            fullWidth
                            onChange={e => setNewParamVal(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <Button 
                            color='primary'
                            variant='contained'
                            type='submit'
                            fullWidth
                        >
                            Add
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <br />
            <Divider />
            <br />
            <Typography variant='h6'>Parameters</Typography>
            {paramKeys.length <= 0 &&
                <Typography 
                    variant='body2'
                    className={classes.emptyMessage}
                    align='center'
                >
                    No parmeters found
                </Typography>
            }
            {paramKeys.length > 0 &&
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
                                    <Typography 
                                        className={classes.blueText}
                                        variant='subtitle2'
                                    >
                                        {param}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        id={param}
                                        value={entityParams[param]}
                                        type='text'
                                        variant='outlined'
                                        margin='normal'
                                        fullWidth
                                        disabled={editingParam !== param}
                                        onChange={e => {
                                            handleEditParameter(
                                                param, e.target.value
                                            )
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        onClick={() => modifyParam(param)}
                                    >
                                        {editingParam !== param &&
                                            <Icon fontSize='small'>edit</Icon>
                                        }
                                        {editingParam === param && 
                                            <Icon fontSize='small'>done</Icon>
                                        }
                                    </IconButton>
                                    &nbsp;
                                    <IconButton
                                        onClick={() => {
                                            handleDeleteParameter(param)
                                        }}
                                    >
                                        <Icon fontSize='small'>delete</Icon>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            }
        </React.Fragment>
    );
}

export default withStyles(styles)(StepMapEntityParameterList);
