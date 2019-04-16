import React, { Component } from 'react';
import CutsceneEvent from './CutsceneEvent';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    cutsceneRow: {
        maxWidth: 1000,
        margin: `${theme.spacing.unit}px auto`,
        padding: 16
    }
});

class CutsceneRow extends Component {

    render() {

        const { classes, rowData } = this.props;

        let renderData;

        if (Array.isArray(rowData)) {
            var cutsceneArray = rowData.map(cutsceneData => {
                return <CutsceneEvent cutsceneEventData={cutsceneData} />
            });
            renderData = (
                <Grid container
                    direction="row"
                    justify="center"
                    spacing={16}
                >
                    {cutsceneArray}
                </Grid>
            );
        } else {
            renderData = (
                <Grid container
                    direction="row"
                    justify="center"
                    spacing={16}
                >
                    <CutsceneEvent cutsceneEventData={rowData} />
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
