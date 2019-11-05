import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Card,
    CardContent,
    Avatar,
    Typography,
    Grid,
} from '@material-ui/core';

import { DialogueMessageToolbar } from './elements';

import { blue } from '@material-ui/core/colors';

const styles = theme => ({
    emoteContainer: {
        backgroundColor: '#222'
    },
    emoteImage: {
        width: 64,
        height: 64,
        padding: 8,
        backgroundColor: '#fff',
        margin: 0
    },
    emoteTarget: {
        color: blue[200],
        fontWeight: 'bold'
    },
    toolbarButton: {
        color: '#fff'
    }
});

const DialogueEmote = props => {

    const { message, classes } = props;

    const { handleDelete, handleAddAbove, handleAddBelow } = props;
    
    const imagePath = `/images/emotes/${message.message}.png`;

    return (
        <Grid container>
            <Grid item xs={1} md={4}>
                {/* Empty grid item */}
            </Grid>
            <Grid item xs={10} md={4}>
                <Card className={classes.emoteContainer}>
                    <CardContent>

                        <Grid
                            container
                            justify='flex-end'
                        >
                            <DialogueMessageToolbar
                                message={message}
                                handleAddAbove={data => handleAddAbove(data)}
                                handleAddBelow={data => handleAddBelow(data)}
                                handleEdit={data => {/* No edit logic */}}
                                handleDelete={() => handleDelete()}
                                omitEdit={true}
                            />
                        </Grid>

                        <Grid 
                            container 
                            justify='center'
                            alignItems='center'
                        >
                            <Grid item>
                                <center>
                                    <Avatar
                                        className={classes.emoteImage}
                                        src={imagePath}
                                    />
                                </center>
                                <br />
                                <Typography 
                                    align='center' 
                                    variant='body1'
                                    className={classes.emoteTarget}
                                >
                                    {message.target_object}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={1} md={4}>
                {/* Empty grid item */}
            </Grid>

        </Grid>
    );
}

export default withStyles(styles)(DialogueEmote);
