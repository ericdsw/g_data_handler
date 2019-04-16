import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    eventCard: {
        width: 300,
        height: 250,
        margin: `${theme.spacing.unit}px auto`,
    },
    chip: {
        margin: 4
    }
});

class CutsceneEvent extends Component {

    render() {

        const { classes, cutsceneEventData } = this.props;

        let chipParams = [];
        for (let param_name in cutsceneEventData.parameters) {
            chipParams.push((
                <Chip
                    className={classes.chip}
                    label={`${param_name} => ${cutsceneEventData.parameters[param_name]}`}
                    color="secondary"
                    variant="outlined" 
                />
            ));
        }

        return (
            <Grid item>
                <Card className={classes.eventCard}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            {cutsceneEventData.type}
                        </Typography>
                        {chipParams}
                    </CardContent>
                </Card>
            </Grid>
        )
    }
}

export default withStyles(styles)(CutsceneEvent);
