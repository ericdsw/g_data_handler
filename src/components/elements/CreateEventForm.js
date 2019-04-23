import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
    TextField,
    MenuItem,
    Icon,
    Typography,
    Grid
} from '@material-ui/core'
import eventSchema from '../../eventSchema'

const styles = theme => ({
    
})


class CreateEventForm extends React.Component {

    handleTypeChange = event => {
        console.log(event.target.value)
    }

    render() {

        let optionTypes = []

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
        
        return (
            <div>
                <TextField
                    id='event_type_select'
                    select
                    label='Event Type'
                    onChange={this.handleTypeChange}
                    value='gain_abilities'
                    margin='normal'>
                    {optionTypes}
                </TextField>
            </div>
        )
    }
}

export default withStyles(styles)(CreateEventForm)
