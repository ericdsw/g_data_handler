import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    IconButton,
} from '@material-ui/core'
import { deleteCutsceneJump } from '../../actions/cutsceneActions'
import DeleteIcon from '@material-ui/icons/Delete'

const styles = theme => ({
    button: {
        margin: theme.spacing.unit
    }
})

class JumpList extends React.Component {

    handleDeleteJump = jumpName => event => {
        this.props.deleteCutsceneJump(jumpName)
    }

    render() {
        const { jumpList, classes } = this.props

        let jumpTableRows = []
        for (const jumpName in jumpList) {
            const jumpPath = jumpList[jumpName]
            jumpTableRows.push(
                <TableRow key={jumpName}>
                    <TableCell>{jumpName}</TableCell>
                    <TableCell>{jumpPath}</TableCell>
                    <TableCell style={{width: 50}} padding='dense'>
                        <IconButton
                            onClick={this.handleDeleteJump(jumpName)}
                            className={classes.button} 
                            aria-label='Delete'>
                            <DeleteIcon />
                        </IconButton>
                    </TableCell>
                </TableRow>
            )
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
        )
    }
}

export default connect(null, {
    deleteCutsceneJump
})(withStyles(styles)(JumpList))
