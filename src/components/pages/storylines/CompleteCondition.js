import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Paper,
    Typography
} from '@material-ui/core';
import { blue, green } from '@material-ui/core/colors';

const styles = theme => ({
    conditionContainer: {
        padding: 16
    },
    interactionTypeText: {
        color: blue[400]
    },
    greenText: {
        color: green[400],
        fontWeight: 'bold'
    }
});

const CompleteCondition = props => {

    function getTypeString(condition) {
        switch(condition.type) {
            case 'npc_interaction':
                return (
                    <React.Fragment>
                        Interact with&nbsp;
                        <span className={classes.greenText}>
                            {condition.parameters.target_npc}
                        </span>
                    </React.Fragment>
                );
            case 'npc_finished_dialogues':
                return (
                    <React.Fragment>
                        Exhaust&nbsp;
                        <span className={classes.greenText}>
                            {condition.parameters.target_npc}
                        </span> dialogues
                    </React.Fragment>
                );
            case 'enter_trigger_area':
                return (
                    <React.Fragment>
                        Enter Area&nbsp;
                        <span className={classes.greenText}>
                            {condition.parameters.target_area_name}
                        </span>
                    </React.Fragment>
                );
            case 'got_item':
                return 'Get Item';
            case 'choice_selected':
                return 'Select Choice in Dialogue';
            case 'advance_storyline':
                return 'Advance Storyline';
            case 'storyline_message':
                return 'Listen to Message';
            default:
                return condition;
        }
    }

    const { classes, completeCondition } = props;
    return (
        <Paper
            square
            elevation={0}
            className={classes.conditionContainer}
        >
            <Typography variant='caption'>
                {completeCondition.unique_name}
            </Typography>
            <Typography 
                variant='caption'
                className={classes.interactionTypeText}
            >
                {getTypeString(completeCondition)}
            </Typography>
        </Paper>
    )
}

export default withStyles(styles)(CompleteCondition);
