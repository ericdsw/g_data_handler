import React, { Component } from 'react'
import { 
    Typography,
    Grid,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Collapse,
    IconButton,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
    eventCard: {
        width: 330
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    }
})

class CutsceneEvent extends Component {

    state = { expanded : false }

    handleExpandClick = () => {
        this.setState(state => ({expanded: !state.expanded}))
    }

    handleEdit = () => {

    }

    handleDelete = () => {

    }

    render() {

        const { classes, cutsceneEventData } = this.props;

        let listParams = [];
        let counter = 0;
        for (let paramName in cutsceneEventData.parameters) {

            let param = cutsceneEventData.parameters[paramName]

            if (typeof param === "boolean") {
                param = param ? "true":"false"
            }

            listParams.push((
                <Typography variant='body1' gutterBottom>
                    <li key={counter++} className={classes.listParamItem}>
                        <b>{paramName}</b> : {param}
                    </li>
                </Typography>
            ));

        }

        return (
            <Grid item>
                <Card className={classes.eventCard}>
                    <CardHeader
                        title={cutsceneEventData.type} />
                    <CardActions className={classes.actions} disableActionSpacing>
                        <IconButton aria-label='Edit'
                            onClick={this.handleEdit}>
                            <EditIcon />
                        </IconButton>
                        <IconButton aria-label='Delete'
                            onClick={this.handleDelete}>
                            <DeleteIcon />
                        </IconButton>
                        <IconButton
                            className={classnames(classes.expand, {
                                [classes.expandOpen]: this.state.expanded,
                            })}
                            onClick={this.handleExpandClick}
                            aria-expanded={this.state.expanded}
                            aria-label='More Info'>
                            <ExpandMoreIcon />
                        </IconButton>
                    </CardActions>
                    <Collapse in={this.state.expanded} timeout='auto' unmountOnExit>
                        <CardContent>
                            <ul>
                                {listParams}
                            </ul>
                        </CardContent>
                    </Collapse>
                </Card>
            </Grid>
        )

    }
}

export default withStyles(styles)(CutsceneEvent);
