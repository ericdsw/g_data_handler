import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit
    }
});

const JumpList = props => {

    const { jumpList, classes } = props;
    const { handleDeleteJump } = props;

    let jumpTableRows = [];
    for (const jumpName in jumpList) {
        const jumpPath = jumpList[jumpName];
        jumpTableRows.push(
            <TableRow key={jumpName}>
                <TableCell>{jumpName}</TableCell>
                <TableCell>{jumpPath}</TableCell>
                <TableCell style={{width: 50}} padding='dense'>
                    <IconButton
                        onClick={() => handleDeleteJump(jumpName)}
                        className={classes.button} 
                        aria-label='Delete'>
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
        );
    }

    return (
        <div>

            {Object.keys(jumpList).length <= 0 &&
                <Typography align='center'>
                    No Jumps Specified
                </Typography>
            }

            {Object.keys(jumpList).length > 0 &&
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Path</TableCell>
                            <TableCell padding='dense'></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {jumpTableRows}
                    </TableBody>
                </Table>
            }
        </div>
    );
}

export default withStyles(styles)(JumpList);
