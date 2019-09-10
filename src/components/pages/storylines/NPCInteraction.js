import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Typography,
    Card,
    CardHeader,
    Table,
    TableBody,
    TableRow,
    TableCell,
    Avatar,
    Icon,
    IconButton
} from '@material-ui/core';
import { ConfirmationDialogue } from '../../elements';
import { useDialogueManager } from '../../../hooks';

import { interactionInputSchema } from '../../../globals';

const styles = theme => ({
    interactionCard: {
        background: '#555'
    }
});

const NPCInteraction = props => {

    // Properties
    const { npcInteraction, classes } = props;

    // Methods
    const { handleDelete } = props;

    const paramKeys = Object.keys(npcInteraction.parameters);

    const [dialogues, toggleDialogue] = useDialogueManager('confirmDelete');

    function getHeader(type) {

        const { name, icon } = interactionInputSchema[type];
        
        return (
            <CardHeader
                title={
                    <Typography variant='h6'>
                        {name}
                    </Typography>
                }
                avatar={
                    <Avatar>
                        <Icon>{icon}</Icon>
                    </Avatar>
                }
                action={
                    <IconButton
                        onClick={() => toggleDialogue('confirmDelete', 'show')}
                    >
                        <Icon>delete</Icon>
                    </IconButton>
                }
            />
        );
    }

    function getParameterDescription(value) {
        if (Array.isArray(value)) {
            return (
                value.map((curValue, index) => (
                    <React.Fragment key={curValue}>
                        <b>-</b>&nbsp; <i>{curValue}</i><br />
                    </React.Fragment>
                ))
            );
        } else {
            return <i>{value}</i>;
        }
    }

    return (
        <Card className={classes.interactionCard}>
            {getHeader(npcInteraction.type)}
             <Table>
                <TableBody>
                    {paramKeys.map((key, index) => (
                        <TableRow key={key}>
                            <TableCell padding='checkbox'>
                                <Typography>
                                    <b>&nbsp;&nbsp;{key}:</b>
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography>
                                    {getParameterDescription(
                                        npcInteraction.parameters[key]
                                    )}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <br />

            <ConfirmationDialogue
                message='Delete the current NPC Interaction?'
                isOpen={dialogues['confirmDelete']}
                handleClose={() => toggleDialogue('confirmDelete', 'hide')}
                handleConfirm={() => {
                    toggleDialogue('confirmDelete', 'hide');
                    handleDelete();
                }}
            />

        </Card>
    );
}

export default withStyles(styles)(NPCInteraction);
