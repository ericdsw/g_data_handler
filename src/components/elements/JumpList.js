import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from '@material-ui/core'

const styles = theme => ({

})

class JumpList extends React.Component {
    render() {
        const { jumpList } = this.props

        let jumpTableRows = []
        for (const jumpName in jumpList) {
            const jumpPath = jumpList[jumpName]
            jumpTableRows.push(
                <TableRow key={jumpName}>
                    <TableCell>{jumpName}</TableCell>
                    <TableCell>{jumpPath}</TableCell>
                </TableRow>
            )
        }

        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Path</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {jumpTableRows}
                </TableBody>
            </Table>
        )
    }
}

export default withStyles(styles)(JumpList)
