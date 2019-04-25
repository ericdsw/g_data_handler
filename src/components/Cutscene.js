import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { 
    Grid, 
    Button, 
    Typography,
    Snackbar,
    IconButton,
    TextField,
    Dialog, 
    DialogTitle, 
    DialogContent
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { red } from '@material-ui/core/colors'

import { 
    updateCutsceneFileName, 
    updateCutscene, 
    addCutsceneRow,
    addCutsceneJump
} from '../actions/cutsceneActions'
import CutsceneRow from './CutsceneRow'
import CreateJumpForm from './elements/CreateJumpForm'
import JumpList from './elements/JumpList'

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
    close: {
        padding: theme.spacing.unit / 2,
    }
})

class Cutscene extends Component {

    constructor(props) {
        super(props)
        this.state = {
            errorMessage: '',
            newJumpDialogueOpen: false,
            viewJumpDialogueOpen: false
        }
    }

    handleFileNameChange = (event) => {
        this.props.updateCutsceneFileName(event.target.value)
    }

    handleSnackbarClose = () => {
        this.setState({
            errorMessage: ''
        })
    }

    handleClearCutscene = () => {
        this.props.updateCutscene({
            cutscene: null,
            fileName: ''
        })
    }

    handleAddRow = () => {
        this.props.addCutsceneRow()
    }

    handleDialogueClose = identifier => () => {
        this.setState({
            [identifier]: false
        })
    }

    handleDialogueOpen = identifier => () => {
        this.setState({
            [identifier]: true
        })
    }
    
    createNewJump = (jumpName, fileName) => {
        this.setState({
            newJumpDialogueOpen: false
        })
        this.props.addCutsceneJump(jumpName, fileName)
    }

    handleExport = () => {
        if (this.props.cutsceneRows.length <= 0) {
            this.setState({
                errorMessage: 'Cannot export empty Cutscene'
            })
        } else {

            let emptyRows = 0 
            this.props.cutsceneRows.forEach(row => {
                if (row.length <= 0) {
                    emptyRows += 1
                }
            })

            if (emptyRows > 0) {
                this.setState({
                    errorMessage: `${emptyRows} row${
                        emptyRows > 1 ? 's are' : ' is'
                    } empty`
                })
            } else {
                let exportData = {
                    data: this.props.cutsceneRows
                }

                // Download
                let data = encodeURIComponent(JSON.stringify(exportData))
                let uri = 'data:application/json;charset=utf-8,' + data

                let linkElement = document.createElement('a')
                linkElement.setAttribute('href', uri)
                linkElement.setAttribute('download', this.props.fileName)
                linkElement.click()

                console.log(exportData)
            }
        }
    }

    render() {

        const { classes, cutsceneRows } = this.props

        const rows = cutsceneRows.map((cutsceneRow, index) => {
            return (
                <CutsceneRow 
                    key={index} 
                    rowNumber={index} 
                    rowData={cutsceneRow} />
            )
        })

        return (
            <div>
                <Grid 
                    className={classes.root}
                    container 
                    spacing={16}
                    alignItems="center">
                    <Grid item xs={6}>
                        <Typography align='left'>
                            <Button 
                                onClick={this.handleAddRow}
                                color='primary'>
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
                                onClick={this.handleClearCutscene} 
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
                                className={classes.emptyText}>
                                The cutscene is empty
                            </Typography>
                    }
                    {rows}

                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right'
                        }}
                        open={this.state.errorMessage !== ''}
                        autoHideDuration={5000}
                        onClose={this.handleSnackbarClose}
                        ContentProps={{
                            'aria-describedby': 'message-id'
                        }}
                        message={
                            <span id='message-id'>
                                {this.state.errorMessage}
                            </span>
                        }
                        action={[
                            <IconButton
                                key='close'
                                aria-label='Close'
                                color='inherit'
                                className={classes.close}>
                                <CloseIcon />
                            </IconButton>
                        ]}
                    />

                </Grid>

                <Dialog
                    open={this.state.newJumpDialogueOpen}
                    onClose={this.handleDialogueClose('newJumpDialogueOpen')}
                    fullWidth={true}
                    maxWidth='sm'
                    aria-labelledby='form-dialog-title'>
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
                    maxWidth='sm'
                    aria-labelledby='form-dialog-title'>
                    <DialogTitle id='form-dialog-title'>
                        Current Jumps
                    </DialogTitle>
                    <DialogContent>
                        <JumpList jumpList={this.props.jumps} />
                    </DialogContent>
                </Dialog>

            </div>
        )
    }
}

export default connect(null, { 
    updateCutscene,
    addCutsceneRow,
    updateCutsceneFileName,
    addCutsceneJump
})(withStyles(styles)(Cutscene))
