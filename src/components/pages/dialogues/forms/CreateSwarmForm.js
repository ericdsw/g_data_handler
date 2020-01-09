import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GenericForm } from '../../../elements';
import { Grid, Card, CardHeader, IconButton, Icon, Typography, Button } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';

const shortMessageSchema = {
    parameters: {
        message: {
            label: "Message",
            type: "text",
            required: true,
            tooltip: "The short message",
            placeholder: "Cannot be too long..."
        },
        target_object: {
            label: "Target Object",
            type: "text",
            required: true,
            tooltip: "Object that the dialogue will follow",
            placeholder: "foo"
        },
        appearance_timeout: {
            label: "Appearance Timeout",
            type: "number",
            required: true,
            default: 0.0
        }
    }
}

const styles = theme => ({
    swarmMessageCard: {
        backgroundColor: "#222",
        margin: theme.spacing(0.5)
    },
    targetObject: {
        color: blue[200]
    }
});

const CreateSwarmForm = props => {

    const classes = makeStyles(styles)();

    // Extract properties
    const { initialSwarmData = [] } = props;

    // Extract methods
    const { handleSubmit } = props;

    const [swarmMessages, updateSwarmMessages] = useState(initialSwarmData);

    function messageFormSubmit(data) {
        updateSwarmMessages([
            ...swarmMessages,
            data
        ])
    }

    function removeSwarmMessageAtIndex(index) {
        const newMessages = [...swarmMessages];
        newMessages.splice(index, 1);
        updateSwarmMessages(newMessages);
    }

    function createSwarmRequest() {
        const returnData = {
            type: 'swarm',
            swarmData: swarmMessages
        }
        handleSubmit(returnData);
    }

    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <GenericForm
                        schema={shortMessageSchema}
                        buttonText='Add To Swarn'
                        handleSubmit={data => messageFormSubmit(data)}
                        buttonColor='secondary'
                    />
                </Grid>
                <Grid item xs={6}>
                    {swarmMessages.length <= 0 && 
                        <Typography 
                            variant='subtitle1'
                            align='center'
                        >
                            No messages found for this swarm
                        </Typography>
                    }
                    {swarmMessages.map((currentMessage, index) => (
                        <Card 
                            key={index}
                            className={classes.swarmMessageCard}
                        >
                            <CardHeader
                                subheader={
                                    <React.Fragment>
                                        {currentMessage.message} <br />
                                        <small>
                                            Target: {currentMessage.target_object}. Appears after {currentMessage.appearance_timeout} second(s)
                                        </small>
                                    </React.Fragment>
                                }
                                action={
                                    <IconButton
                                        onClick={() => removeSwarmMessageAtIndex(index)}
                                    >
                                        <Icon>delete</Icon>
                                    </IconButton>
                                }
                            />
                        </Card>
                    ))}
                </Grid>
                <Grid item xs={12}>
                    <Grid container justify='flex-end'>
                        <Button 
                            variant='contained' 
                            color='primary'
                            onClick={() => createSwarmRequest()}
                        >
                            Create Swarm
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );

}

export default CreateSwarmForm;