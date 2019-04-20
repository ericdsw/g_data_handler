import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'

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
        this.state = {
            cutsceneRows: []
        }
    }

    componentWillMount() {
        axios.get(this.props.file)
            .then(response => response.data)
            .then(content => this.setState({ cutsceneRows: content.data }))
            .catch(error => console.log("Error: " + error))
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
        });

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
