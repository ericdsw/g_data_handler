import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const styles = theme => ({
    emptyText: {
        padding: 32,
        width: '100%'
    }
});

const NoConversationsNotifier = props => {
    const { conversations, classes } = props;
    const conversationNames = Object.keys(conversations);
    if (conversationNames.length <=  0) {
        return (
            <Typography
                variant='h5'
                color='textSecondary'
                align='center'
                className={classes.emptyText}
            >
                No conversations for this dialogue
            </Typography>
        );
    } else {
        return <React.Fragment />
    }
}

export default withStyles(styles)(NoConversationsNotifier);
