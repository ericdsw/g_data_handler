import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

import CutsceneRow from './CutsceneRow'

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    }
})

class Cutscene extends Component {

    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            cutsceneRows: props.cutscene.data
        }
    }

    render() {

        const { classes } = this.props;

        let counter = 0;
        const rows = this.state.cutsceneRows.map(cutsceneRow => {
            counter++
            return (
                <CutsceneRow 
                    key={counter} 
                    rowNumber={counter} 
                    rowData={cutsceneRow} />
            )
        })

        return (
            <div>
                <Grid 
                    className={classes.root}
                    container 
                    spacing={16}
                    alignItems="center">
                    {rows}
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(Cutscene);
