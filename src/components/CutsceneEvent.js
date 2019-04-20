import React, { Component } from 'react'
import { 
    ExpansionPanel, 
    ExpansionPanelSummary, 
    ExpansionPanelDetails,
    Typography,
    Grid
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
    eventCard: {
        width: 300,
        margin: `${theme.spacing.unit}px auto`,
    },
    listParamItem: {
        fontSize: 12,
        margin: '8px 0',
    },
    title: {
        fontSize: 14,
    }
});

class CutsceneEvent extends Component {

    render() {

        const { classes, cutsceneEventData } = this.props;


        let listParams = [];
        let counter = 0;
        for (let paramName in cutsceneEventData.parameters) {

            let param = cutsceneEventData.parameters[paramName]

            if (typeof param === "boolean") {
                param = param ? "true":"false"
            }

            listParams.push((
                <li key={counter++} className={classes.listParamItem}>
                    <b>{paramName}</b> : {param}
                </li>
            ));

        }

        return (
            <Grid item>
                <ExpansionPanel 
                    className={classes.eventCard}>
                    <ExpansionPanelSummary 
                        expandIcon={<ExpandMoreIcon />}>
                        <Typography 
                            className={classes.title} 
                            color="textSecondary" gutterBottom>
                            <b>Type</b>: {cutsceneEventData.type}

                        </Typography>

                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <ul>
                            {listParams}
                        </ul>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </Grid>
        )
    }
}

export default withStyles(styles)(CutsceneEvent);
