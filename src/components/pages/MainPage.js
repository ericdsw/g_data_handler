import React from 'react'
import { Paper, Grid, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer'
import SubscriptionsIcon from '@material-ui/icons/Subscriptions'
import CreateEventForm from '../elements/CreateEventForm'

const styles = theme => ({
    appSectionButton: {
        padding: '120px 20px',
    }
})

class MainPage extends React.Component {

    onCutscenesClick() {
        console.log("go to cutscenes")
    }

    onDialoguesClick() {
        console.log("go to dialogues")
    }

    render() {

        const { classes } = this.props

        return (
            <div>
                <Grid container>

                    <Grid item xs={12} sm>
                        <Paper 
                            square={true} 
                            className={classes.appSectionButton}
                            onClick={this.onCutscenesClick}>
                            <Typography variant="h4" align='center'>
                                <SubscriptionsIcon fontSize='large'/>
                                <br />
                                Cutscenes
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm>
                        <Paper 
                            square={true} 
                            className={classes.appSectionButton}
                            onClick={this.onDialoguesClick}>
                            <Typography variant="h4" align='center'>
                                <QuestionAnswerIcon fontSize='large' />
                                <br />
                                Dialogues
                            </Typography>
                        </Paper>
                    </Grid>

                </Grid>

                <CreateEventForm />
            </div>
        )
    }
}

export default withStyles(styles)(MainPage)
