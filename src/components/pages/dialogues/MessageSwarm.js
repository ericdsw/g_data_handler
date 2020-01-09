import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardHeader,
    CardContent,
    Typography,
    Grid
} from '@material-ui/core';

import { DialogueMessageToolbar } from './elements';

const styles = theme => ({
    swarmContainer: {
        width: '100%',
        backgroundColor: '#222',
        borderBottom: '1px solid #666',
        padding: theme.spacing(3)
    },
    swarmMessage: {
        padding: theme.spacing(1),
        marginBottom: theme.spacing(0.5),
        width: '100%',
    }
})

const MessageSwarm = props => {

    const { swarmData } = props;
    const { handleDelete, handleSplitBelow } = props;
    const classes = makeStyles(styles)();

    return (
        <Card
            className={classes.swarmContainer}
            square={true}
        >
            <CardHeader
                subheader='Will display a swarm with the following messages:'
                action={
                    <DialogueMessageToolbar
                        message={swarmData}
                        handleDelete={() => handleDelete()}
                        handleSplitBelow={conversationName => handleSplitBelow(conversationName)}
                        omitEdit={true}
                    />
                }
            />
            <CardContent>
                {swarmData.swarmData.map((swarmMessage, index) => (
                    <Card 
                        key={index}
                        className={classes.swarmMessage}
                        raised={false}
                        square={true}
                        variant='outlined'
                    >
                        <Typography variant='subtitle1'>
                            {swarmMessage.message}
                        </Typography>
                        <Typography variant='body2'>
                            Target: {swarmMessage.target_object}. Appears after {swarmMessage.appearante_tiemout} second(s).
                        </Typography>
                    </Card>
                ))}
            </CardContent>
        </Card>
    )
}

export default MessageSwarm;