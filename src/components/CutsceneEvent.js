import React, { Component } from 'react'
import { connect } from 'react-redux'
import { 
    Typography,
    Grid,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Collapse,
    IconButton,
    Avatar,
    Icon
} from '@material-ui/core'
import { purple } from '@material-ui/core/colors'
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import eventSchema from '../eventSchema'
import { deleteCutsceneEvent } from '../actions/cutsceneActions'

const styles = theme => ({
    eventCard: {
        width: 330,
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
    },
    avatar: {
        backgroundColor: purple[500]
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
        this.props.deleteCutsceneEvent(
            this.props.rowNumber,
            this.props.eventNumber
        )
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
                <li key={counter++} className={classes.listParamItem}>
                    <Typography variant='body1' gutterBottom>
                        <b>{paramName}</b> : {
                            (typeof param === 'string') ?
                                param : JSON.stringify(param)
                        }
                    </Typography>
                </li>
            ));

        }

        const { name, icon } = eventSchema[cutsceneEventData.type]

        let subHeader = 'Important'
        let important = cutsceneEventData.parameters.is_important
        if (typeof important !== 'undefined' && !important) {
            subHeader = 'Not Important'
        }

        return (
            <Grid item>
                <Card className={classes.eventCard} elevation={2}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label='Type' className={classes.avatar}>
                                <Icon>
                                    {icon}
                                </Icon>
                            </Avatar>
                        }
                        title={name}
                        subheader={subHeader}/>
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
                            <ul>{listParams}</ul>
                        </CardContent>
                    </Collapse>
                </Card>
            </Grid>
        )

    }
}

export default connect(null, {
    deleteCutsceneEvent
})(withStyles(styles)(CutsceneEvent))
