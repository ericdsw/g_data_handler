import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import {
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Typography,
    Grid,
    Button,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DialogueMessage from './DialogueMessage';

const styles = theme => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightBold,
        flexBasis: '33.3%',
        flexShrink: 0,
    },
    subHeading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        color: theme.palette.text.secondary,
    },
    messageContainer: {
        flexGrow: 1,
    },
    messageElement: {
        width: '100%',
    }
});

class DialogueConversation extends React.Component {
    render() {
        const { conversationName, messages, classes } = this.props;
        return (
            <ExpansionPanel style={{width: '100%'}}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>
                        <b>Name: {conversationName}</b>
                    </Typography>
                    <Typography className={classes.subHeading}>
                        ({messages.length} {
                            (messages.length === 1) ?
                                'message' : 'messages'
                        })
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div className={classes.messageContainer}>
                        <Grid container 
                            direction='column'
                            alignItems='center'
                            spacing={8}>
                                {messages.map((message, index) => (
                                    <Grid item xs 
                                        key={index}
                                        className={classes.messageElement}>
                                        <DialogueMessage message={message}/>
                                    </Grid>
                                ))}
                                <Grid item xs>
                                    <Button color='primary' variant='contained'>
                                        Add message to conversation
                                    </Button>
                                </Grid>
                        </Grid>
                    </div>
                    
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }
}

export default connect(null, {

})(
    withSnackbar(
        withStyles(styles)(DialogueConversation)
    )
);
