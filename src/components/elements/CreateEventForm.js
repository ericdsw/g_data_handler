import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { withSnackbar } from 'notistack'
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
} from '@material-ui/core'
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
        if (props.existingData) {
            let usedParameters = {}
            for (const paramName in props.existingData.parameters) {
                const data = props.existingData.parameters[paramName]
                if (typeof data === 'object') {
                    usedParameters[paramName] = JSON.stringify(data)
                } else {
                    usedParameters[paramName] = data
                }
            }
            this.state = {
                lockType: true,
                currentEventType: props.existingData.type,
                resultData: usedParameters
            }
            this.formFields = eventSchema[props.existingData.type].parameters
        } else {
            this.state = {
                lockType: false,
                currentEventType: 'gain_abilities',
                resultData: {'is_important': true}
            }
        }
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
            this.props.enqueueSnackbar(
                `The following fields are required: ${errors}`,
                {variant:'error'}
            )
        } else {
            let cutsceneData = {
                type: this.state.currentEventType,
                parameters: eventData
            }
            this.props.creationHandler(cutsceneData)
        }
    }

    render() {

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
                    disabled={this.state.lockType}
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
                        {(this.state.lockType) ? 
                            'Edit Cutscene Event':'Add Cutscene Event'
                        }
                    </Button>
                </Grid>
            </form>
        )
    }
}

export default withSnackbar(withStyles(styles)(CreateEventForm))
