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
        let newResultData = {...this.state.resultData}
        newResultData[inputIdentifier] = event.target.value
        this.setState({
            currentEventType: this.state.currentEventType,
            resultData: newResultData
        })
    }

    handleToggleChange = inputIdentifier => event => {
        let newResultData = {...this.state.resultData}
        newResultData[inputIdentifier] = event.target.checked
        this.setState({
            currentEventType: this.state.currentEventType,
            resultData: newResultData
        })
    }

    showData = () => {

        let errorInputs = []
        for (let paramName in this.state.resultData) {
            if (paramName === 'is_important') {
                continue
            }
            let paramValue = this.state.resultData[paramName]
            let paramRequired = this.formFields[paramName].required
            if (paramRequired && (!paramValue || paramValue === "")) {
                errorInputs.push(this.formFields[paramName].label)
            }
        }

        if (errorInputs.length > 0) {
            this.setState({
                "errorMessage": `The following fields are required: ${errorInputs.join(", ")}`}
            )
        } else {
            let cutsceneData = {
                type: this.state.currentEventType,
                parameters: this.state.resultData
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
                        onChange={this.handleToggleChange('is_important')}
                        value={this.state.resultData['is_important']} />
                }
            />
        )

        for (const paramName in this.formFields) {

            const currentParamData = this.formFields[paramName]
            let constructedFormField

            switch(currentParamData.type) {
                case 'boolean':
                    constructedFormField = (
                        <FormControlLabel
                            label={currentParamData.label}
                            control={
                                <Switch
                                    checked={this.state.resultData[paramName]}
                                    onChange={this.handleToggleChange(paramName)}
                                    value={this.state.resultData[paramName]} />
                            }
                        />
                    )
                    break
                case 'number':
                    constructedFormField = (
                        <TextField
                            id={paramName}
                            label={currentParamData.label}
                            placeholder={currentParamData.placeholder}
                            required={currentParamData.isRequired}
                            fullWidth
                            type='number'
                            variant='outlined'
                            onChange={this.handleInputChange(paramName)}
                            value={this.state.resultData[paramName]}
                            margin='normal' />
                    )
                    break
                case 'json':
                    constructedFormField = (
                        <TextField
                            id={paramName}
                            label={currentParamData.label}
                            placeholder={currentParamData.placeholder}
                            required={currentParamData.isRequired}
                            multiline
                            fullWidth
                            variant='outlined'
                            rows={5}
                            margin='normal' />
                    )
                    break
                case 'position':
                default:
                    constructedFormField = (
                        <TextField
                            id={paramName}
                            label={currentParamData.label}
                            placeholder={currentParamData.placeholder}
                            required={currentParamData.isRequired}
                            value={this.state.resultData[paramName]}
                            fullWidth
                            variant='outlined'
                            onChange={this.handleInputChange(paramName)}
                            margin='normal' />
                    )
            }
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
            <React.Fragment>
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
                    <Button variant='contained' 
                        style={{marginTop: 8}} 
                        color='primary' 
                        onClick={this.showData}>
                        Show Data
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
                    message={<span id='message-id'>{this.state.errorMessage}</span>}
                    action={[
                        <IconButton
                            key='close'
                            aria-label='Close'
                            color='inherit'
                            className={classes.close}
                            onClick={this.handleSnackbarClose}
                        >
                            <CloseIcon />
                        </IconButton>
                    ]}
                />

            </React.Fragment>
        )
    }
}

export default withStyles(styles)(CreateEventForm)
