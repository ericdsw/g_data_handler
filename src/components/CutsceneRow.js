import React, { Component } from 'react'
import { connect } from 'react-redux'
import CutsceneEvent from './CutsceneEvent'
import { withStyles } from '@material-ui/core/styles'
import { 
    Paper, Grid, Typography, IconButton
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'

import { deleteCutsceneRow } from '../actions/cutsceneActions'

const styles = theme => ({
    cutsceneRow: {
        margin: `${theme.spacing.unit}px auto`,
        padding: 16,
        paddingBottom: 24,
    }
});

class CutsceneRow extends Component {

    handleDeleteRow = () => {
        this.props.deleteCutsceneRow(this.props.rowNumber)
    }

    handleAddEvent = () => {

    }

    render() {

        const { classes, rowData, rowNumber } = this.props;

        let data = rowData

        // Convert to array if it's not already an array
        if (!Array.isArray(rowData)) {
            data = [rowData]
        }

        const cutsceneArray = data.map((cutsceneData, index) => {
            return <CutsceneEvent
                key={`cutscene-row:${rowNumber}:${index}`} 
                cutsceneEventData={cutsceneData} />
        })
        const renderData = (
            <Grid container
                direction="row"
                justify="center"
                spacing={16}>
                {cutsceneArray}
            </Grid>
        )

        return (
            <Grid item xs={12}>
                <Paper className={classes.cutsceneRow} elevation={1}>
                    <Grid container alignItems='center'>
                        <Grid item xs={6}>
                            <Typography variant='h6' gutterBottom align='left'>
                                Number: {this.props.rowNumber}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant='h6' gutterBottom align='right'>
                                <IconButton 
                                    onClick={this.handleAddEvent}
                                    aria-label='add'>
                                    <AddIcon />
                                </IconButton>
                                <IconButton 
                                    onClick={this.handleDeleteRow}
                                    aria-label='delete'>
                                    <DeleteIcon />
                                </IconButton>
                            </Typography>
                        </Grid>
                    </Grid>
                    {renderData}
                </Paper>
            </Grid>
        );

    }

}

export default connect(null, {
    deleteCutsceneRow
})(withStyles(styles)(CutsceneRow))
