import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Button, Typography } from '@material-ui/core'

import { updateCutscene, addCutsceneRow } from '../actions/cutsceneActions'
import CutsceneRow from './CutsceneRow'

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    }
})

class Cutscene extends Component {

    handleClearCutscene = () => {
        this.props.updateCutscene({
            cutscene: null,
            fileName: ''
        })
    }

    handleAddRow = () => {
        this.props.addCutsceneRow()
    }

    handleAddJump = () => {

    }

    render() {

        const { classes, cutsceneRows } = this.props;

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
                            <Button color='primary'>
                                Add Jump
                            </Button>
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography align='right'>
                            <Button 
                                onClick={this.handleClearCutscene} 
                                color='secondary'>
                                Clear Cutscene
                            </Button>
                        </Typography>
                    </Grid>
                    {rows}
                </Grid>
            </div>
        )
    }
}

export default connect(null, { 
    updateCutscene,
    addCutsceneRow
})(withStyles(styles)(Cutscene))
