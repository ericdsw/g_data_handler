import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Chip } from '@material-ui/core';

const styles = theme => ({
    chip: {
        marginRight: theme.spacing(1),
        [theme.breakpoints.down('xs')]: {
            marginBottom: theme.spacing(1)
        }
    },
    chipContainer: {
        borderTop: '1px solid #333',
        marginTop: 12,
        paddingTop: 12,
    }
});

const ConversationExtraParams = props => {

    const { classes, message } = props;

    let extraChips = [];
    const extras = ['location', 'voice_file', 'control_level', 'autopilot_offset'];

    extras.forEach(extraProperty => {
        if (message.hasOwnProperty(extraProperty)) {
            extraChips.push(
                <Chip 
                    key={extraProperty} 
                    className={classes.chip}
                    label={`${extraProperty}: ${message[extraProperty]}`} 
                />
            );
        } 
    });

    return (
        <React.Fragment>
            { extraChips.length > 0 &&
                <div className={classes.chipContainer}>
                    {extraChips}
                </div>
            }
        </React.Fragment>
    );
}

export default withStyles(styles)(ConversationExtraParams);

