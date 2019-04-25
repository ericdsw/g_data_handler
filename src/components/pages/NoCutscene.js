import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import {
    Button,
    Divider,
    Paper,
    Grid
} from '@material-ui/core'
import { connect } from 'react-redux'
import { updateCutscene } from '../../actions/cutsceneActions'
import eventSchema from '../../eventSchema'
import DragAndDrop from '../DragAndDrop'

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
        marginBottom: 24,
    },
    dragCapturer: {
        padding: 16,
        marginTop: 24,
    },
    gridContainer: {
        minHeight: 300,
    }
})

class NoCutscene extends React.Component {

    fillWithDefaultValues = cutsceneData => {
        return cutsceneData.map(event => {
            if (!Array.isArray(event)) {
                for (const paramName in eventSchema[event.type]['parameters']) {
                    if (typeof event['parameters'][paramName] === 'undefined') {
                        const defaultValue = eventSchema[event.type]['parameters'][paramName]['default']
                        event['parameters'][paramName] = defaultValue
                    }
                }
                return event
            } else {
                return event.map(currentEvent => {
                    for (const paramName in eventSchema[currentEvent.type]['parameters']) {
                        if (typeof currentEvent['parameters'][paramName] === 'undefined') {
                            const defaultValue = eventSchema[currentEvent.type]['parameters'][paramName]['default']
                            currentEvent['parameters'][paramName] = defaultValue
                        }
                    }
                    return currentEvent
                })
            }
        })
    }

    handleDrop = (files) => {

        const firstFile = files[0]
        
        // Check logic
        if (firstFile.type !== 'application/json') {
            console.log("Wrong file type")
            return
        }

        // Parsing Logic
        const fileReader = new FileReader()
        fileReader.onload = (event) => {
            const name = firstFile.name
            const result = JSON.parse(event.target.result)

            const cutscene = this.fillWithDefaultValues(result.data)
            const jumps = (result.cutscene_jumps) ? result.cutscene_jumps : []

            this.props.updateCutscene({ 
                cutscene: cutscene,
                jumps: jumps,
                fileName: name,
            })
        }
        fileReader.readAsText(firstFile)
    }

    handleNewEmptyCutscene = () => {
        this.props.updateCutscene({
            cutscene: [],
            jumps: {},
            fileName: 'cutscene_file_name.json'
        })
    }

    render() {
        const { classes } = this.props
        return (
            <div>
                <Button 
                    variant='contained' 
                    color='primary' 
                    onClick={this.handleNewEmptyCutscene}
                    className={classes.button}>
                    New Cutscene
                </Button>
                <Divider /> 
                <DragAndDrop handleDrop={this.handleDrop}>

                    <Paper elevation={1} className={classes.dragCapturer}>
                        <Grid container
                            direction='row'
                            justify='center'
                            alignItems='center'
                            className={classes.gridContainer}>
                            <Grid item xs>
                                <Typography 
                                    color='textSecondary' 
                                    align='center' 
                                    variant='h4'>
                                    Drag a <code>.json</code> here to edit 
                                    an existing cutscene
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>

                </DragAndDrop>
            </div>
        )
    }
}

export default connect(null, { updateCutscene })(withStyles(styles)(NoCutscene))
