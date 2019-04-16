import React, { Component } from 'react';
import CutsceneRow from './CutsceneRow';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    }
});

class Cutscene extends Component {

    constructor(props) {
        super(props);
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
            return (
                <CutsceneRow key={counter++} rowData={cutsceneRow} />
            )
        });

        return (
            <div>
                <Typography variant="h5" component="h3">
                    Cutscene: {this.props.file}
                </Typography>
                <Grid 
                    className={classes.root}
                    container 
                    spacing={16}
                    alignItems="center"
                >
                    {rows}
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(Cutscene);
