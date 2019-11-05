import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Chip, Tooltip } from '@material-ui/core';

const styles = theme => ({
    chip: {
        marginRight: theme.spacing.unit,
        [theme.breakpoints.down('xs')]: {
            marginBottom: theme.spacing.unit
        }
    },
    chipContainer: {
        borderTop: '1px solid #666',
        marginTop: 12,
        paddingTop: 12,
    }
});

const ConversationChoices = props => {

    const { classes, message } = props;

    let choicesChips = [];
    if (message.choices) {
        choicesChips = message.choices.map(currentChoice => {
            if (currentChoice.next_message) {
                const label = `${currentChoice.key}: ${currentChoice.value}`;
                return (
                    <Tooltip 
                        key={currentChoice.key}
                        title={`Next Message: ${currentChoice.next_message}`}
                    >
                        <Chip
                            className={classes.chip}
                            color='primary'
                            label={label} 
                        />
                        </Tooltip>
                    );
            } else {
                return (
                    <Chip
                        key={currentChoice.key}
                        className={classes.chip}
                        label={`${currentChoice.key}: ${currentChoice.value}`} 
                    />
                );

            }
        });
    }

    return (
        <React.Fragment>
            { choicesChips.length > 0 &&
                <div className={classes.chipContainer}>
                    {choicesChips}
                </div>
            }
        </React.Fragment>
    );
}

export default withStyles(styles)(ConversationChoices);
