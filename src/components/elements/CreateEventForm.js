import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
    TextField,
    MenuItem,
    Icon,
    Typography,
    Grid,
    Tooltip,
    Button,
    FormControlLabel,
    Switch,
    Snackbar,
    IconButton
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import eventSchema from '../../eventSchema'
import createInput from '../../inputCreator'
import { checkForRequired, processRegularInputs } from '../../inputChecks'

const styles = theme => ({
    errorMessage: {
        backgroundColor: theme.palette.error.dark,
    },
    close: {
        padding: theme.spacing.unit / 2,
    }
})


class CreateEventForm extends React.Component {

    formFields = eventSchema['gain_abilities'].parameters

    constructor(props) {
        super(props)
        this.state = {
            errorMessage: '',
            currentEventType: 'gain_abilities',
            resultData: {
                'is_important': true
            }
        }
    }

    handleSnackbarClose = () => {
        this.setState({errorMessage: ''})
    }

    handleTypeChange = event => {

        const newType = event.target.value
        this.formFields = eventSchema[newType].parameters

        let resultData = {
            'is_important': eventSchema[newType].defaultImportant
        }
        for (const paramName in this.formFields) {
            if (this.formFields[paramName].required) {
                resultData[paramName] = ''
            } else {
                resultData[paramName] = this.formFields[paramName].default
            }
        }

        this.setState({
            currentEventType: newType,
            resultData: resultData
        })
    }

    handleInputChange = inputIdentifier => event => {

        if (! event.target) {
            return
        }

        let newResultData = {...this.state.resultData}
        if (
            inputIdentifier === 'is_important' || 
            this.formFields[inputIdentifier].type === 'boolean') {
            newResultData[inputIdentifier] = event.target.checked
        } else {
            newResultData[inputIdentifier] = event.target.value
        }
        this.setState({
            currentEventType: this.state.currentEventType,
            resultData: newResultData
        })
    }

    submitData = event => {

        event.preventDefault()
        event.stopPropagation()

        const eventData = {...this.state.resultData}

        let errorInputs = []
        const eventType = this.state.currentEventType
        for (let paramName in eventData) {

            if (paramName === 'is_important') {
                continue
            }

            eventData[paramName] = processRegularInputs(
                eventType, paramName, eventData[paramName]
            )

            const paramValue = eventData[paramName]

            if (! checkForRequired(eventType, paramName, paramValue)) {
                errorInputs.push(this.formFields[paramName].label)
            }
            
        }

        if (errorInputs.length > 0) {
            const errors = errorInputs.join(', ')
            this.setState({
                "errorMessage": `The following fields are required: ${errors}`
            })
        } else {
            let cutsceneData = {
                type: this.state.currentEventType,
                parameters: eventData
            }
            this.props.creationHandler(cutsceneData)
        }
    }

    render() {

        const { classes } = this.props

        let optionTypes = []
        let fields = []

        for (const key in eventSchema) {
            const data = eventSchema[key]
            optionTypes.push(
                <MenuItem key={key} value={key}>
                    <Grid container
                        alignItems='center'>
                        <Icon>{data.icon}</Icon>
                        &nbsp;
                        <Typography>
                            {data.name}
                        </Typography>
                    </Grid>
                </MenuItem>
            )
        }

        fields.push(
            <FormControlLabel
                key='is_important'
                label='Is Important'
                control={
                    <Switch
                        checked={this.state.resultData['is_important']}
                        onChange={this.handleInputChange('is_important')}
                        value={this.state.resultData['is_important']} />
                }
            />
        )

        for (const paramName in this.formFields) {

            const currentParamData = this.formFields[paramName]

            const constructedFormField = createInput(
                paramName,
                currentParamData,
                this.state.resultData[paramName],
                this.handleInputChange
            )
            
            fields.push(
                <Tooltip 
                    enterDelay={500}
                    key={paramName} 
                    title={currentParamData.tooltip}>
                    {constructedFormField}
                </Tooltip>
            )
        }
        
        return (
            <form onSubmit={this.submitData}>
                <TextField
                    id='event_type_select'
                    select fullWidth
                    label='Event Type'
                    onChange={this.handleTypeChange}
                    value={this.state.currentEventType}
                    variant='outlined'
                    margin='normal'>
                    {optionTypes}
                </TextField>
                <Grid container>
                    {fields}
                </Grid>
                <Grid justify='flex-end' container>
                    <Button 
                        type='submit'
                        variant='contained' 
                        style={{marginTop: 8}} 
                        color='primary' 
                        onClick={this.showData}>
                        Add Cutscene Event
                    </Button>
                </Grid>

                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                    }}
                    open={this.state.errorMessage !== ''}
                    autoHideDuration={5000}
                    onClose={this.handleSnackbarClose}
                    ContentProps={{
                        'aria-describedby': 'message-id'
                    }}
                    message={
                        <span id='message-id'>
                            {this.state.errorMessage}
                        </span>
                    }
                    action={[
                        <IconButton
                            key='close'
                            aria-label='Close'
                            color='inherit'
                            className={classes.close}>
                            <CloseIcon />
                        </IconButton>
                    ]}
                />

            </form>
        )
    }
}

export default withStyles(styles)(CreateEventForm)
