import React, { Component } from 'react';
import CutsceneEvent from './CutsceneEvent';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';

const styles = theme => ({
    cutsceneRow: {
        maxWidth: 1000,
        margin: `${theme.spacing.unit}px auto`,
        padding: 16
    }
});

class CutsceneRow extends Component {

    render() {

        const { classes, rowData, rowNumber } = this.props;

        let renderData;

        let counter = 0;
        if (Array.isArray(rowData)) {
            var cutsceneArray = rowData.map(cutsceneData => {
                counter++;
                return <CutsceneEvent 
                    key={`cutscene-row:${rowNumber}:${counter}`} 
                    cutsceneEventData={cutsceneData} />
            });
            renderData = (
                <Grid container
                    direction="row"
                    justify="center"
                    spacing={16}>
                    {cutsceneArray}
                </Grid>
            );
        } else {
            renderData = (
                <Grid container
                    direction="row"
                    justify="center"
                    spacing={16}>
                    <CutsceneEvent 
                        cutsceneEventData={rowData}
                        key={`${rowNumber}:${counter}`} 
                    />
                </Grid>
            );
        }

        return (
            <Grid item xs={12}>
                <Paper className={classes.cutsceneRow} elevation={1}>
                    {renderData}
                </Paper>
            </Grid>
        );

    }

}

export default withStyles(styles)(CutsceneRow);
