import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import { 
    Grid, 
    Button, 
    Typography,
    TextField,
    Dialog, 
    DialogTitle, 
    DialogContent
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';

import { 
    updateCutsceneFileName, 
    updateCutscene, 
    addCutsceneRow,
    addCutsceneJump
} from '../actions/cutsceneActions';
import { downloadJSON } from '../functions';
import { 
    CreateJumpForm, 
    JumpList,
    ConfirmationDialogue
} from './elements';
import CutsceneRow from './CutsceneRow';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    deleteButton: {
        color: red[500],
    },
    emptyText: {
        padding: 32,
        width: '100%'
    },
});

class Cutscene extends Component {

    state = {
        newJumpDialogueOpen: false,
        viewJumpDialogueOpen: false,
        deleteConfirmationOpen: false
    }

    handleFileNameChange = (event) => {
        this.props.updateCutsceneFileName(event.target.value);
    }

    handleClearCutscene = () => {
        this.props.updateCutscene({
            cutscene: null,
            fileName: ''
        });
    }

    handleAddRow = () => {
        this.props.addCutsceneRow();
    }

    handleDialogueClose = identifier => () => {
        this.setState({
            [identifier]: false
        });
    }

    handleDialogueOpen = identifier => () => {
        this.setState({
            [identifier]: true
        });
    }

    createNewJump = (jumpName, fileName) => {
        this.setState({
            newJumpDialogueOpen: false
        });
        this.props.addCutsceneJump(jumpName, fileName);
    }

    handleExport = () => {

        if (this.props.cutsceneRows.length <= 0) {
            this.props.enqueueSnackbar(
                'Cannot export an empty Cutscene.',
                {variant:'error'}
            );
        } else {

            let emptyRows = 0;
            this.props.cutsceneRows.forEach(row => {
                if (row.length <= 0) {
                    emptyRows += 1;
                }
            });

            if (emptyRows > 0) {
                this.props.enqueueSnackbar(
                    `${emptyRows} row${emptyRows > 1 ? 's are' : ' is'} empty`,
                    { variant: 'error' }
                );
            } else {
                let exportData = {
                    data: this.props.cutsceneRows,
                    cutscene_jumps: this.props.jumps
                };

                // Download
                downloadJSON(this.props.fileName, exportData);
            }
        }
    }

    render() {

        const { classes, cutsceneRows } = this.props;

        const rows = cutsceneRows.map((cutsceneRow, index) => {
            return (
                <CutsceneRow 
                    key={index} 
                    rowNumber={index} 
                    rowData={cutsceneRow} 
                />
            );
        })

        return (
            <div>
                <Grid 
                    className={classes.root}
                    container 
                    spacing={16}
                    alignItems="center"
                >
                    <Grid item xs={6}>
                        <Typography align='left'>
                            <Button 
                                onClick={this.handleAddRow}
                                color='primary'
                            >
                                Add Row
                            </Button>
                            <Button 
                                color='primary'
                                onClick={
                                    this.handleDialogueOpen('newJumpDialogueOpen')
                                }>
                                Add Jump
                            </Button>
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography align='right'>
                            <Button 
                                color='secondary'
                                onClick={
                                    this.handleDialogueOpen('viewJumpDialogueOpen')
                                }>
                                View Jumps ({
                                    Object.keys(this.props.jumps).length
                                })
                            </Button>
                            <Button 
                                onClick={this.handleExport} 
                                color='secondary'>
                                Export
                            </Button>
                            <Button 
                                className={classes.deleteButton}
                                onClick={this.handleDialogueOpen("deleteConfirmationOpen")} 
                                color='secondary'>
                                Clear Cutscene
                            </Button>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id='file_name'
                            label='File Name'
                            fullWidth
                            value={this.props.fileName}
                            onChange={this.handleFileNameChange}
                            variant='outlined' margin='normal' />
                    </Grid>
                    {cutsceneRows.length === 0 && 
                        <Typography 
                            variant='h5' 
                            color='textSecondary' 
                            align='center' 
                            className={classes.emptyText}
                        >
                            The cutscene is empty
                        </Typography>
                    }
                    {rows}

                </Grid>

                <Grid item xs={12}>
                    <Grid container justify='center'>
                        <Button
                            color='primary'
                            onClick={this.handleAddRow}
                        >
                            Add Row
                        </Button>
                    </Grid>
                </Grid>

                <Dialog
                    open={this.state.newJumpDialogueOpen}
                    onClose={this.handleDialogueClose('newJumpDialogueOpen')}
                    fullWidth={true}
                    maxWidth='sm'
                    aria-labelledby='form-dialog-title'
                >
                    <DialogTitle id='form-dialog-title'>
                        Add Jump
                    </DialogTitle>
                    <DialogContent>
                        <CreateJumpForm creationHandler={this.createNewJump} />
                    </DialogContent>
                </Dialog>

                <Dialog
                    open={this.state.viewJumpDialogueOpen}
                    onClose={this.handleDialogueClose('viewJumpDialogueOpen')}
                    fullWidth={true}
                    maxWidth='md'
                    aria-labelledby='form-dialog-title'
                >
                    <DialogTitle id='form-dialog-title'>
                        Current Jumps
                    </DialogTitle>
                    <DialogContent>
                        <JumpList jumpList={this.props.jumps} />
                    </DialogContent>
                </Dialog>

                <ConfirmationDialogue
                    message="Delete the current cutscene?"
                    isOpen={this.state.deleteConfirmationOpen}
                    confirmAction={this.handleClearCutscene}
                    handleClose={this.handleDialogueClose("deleteConfirmationOpen")}
                />

            </div>
        );
    }
}

export default connect(null, { 
    updateCutscene,
    addCutsceneRow,
    updateCutsceneFileName,
    addCutsceneJump
})(
    withSnackbar(
        withStyles(styles)(Cutscene)
    )
);
