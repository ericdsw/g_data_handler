import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { 
    Grid, Typography, TextField, Button, FormControlLabel, Switch, Tooltip
} from '@material-ui/core';
import { red, blue } from '@material-ui/core/colors';
import CutsceneRowContainer from '../../containers/CutsceneRowContainer';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        [theme.breakpoints.down('xs')]: {
            paddingLeft: 0,
            paddingRight: 0
        }
    },
    deleteButton: {
        color: red[500],
    },
    defaultButton: {
        color: blue[500]
    },
    emptyText: {
        padding: 32,
        width: '100%'
    },
});

const Cutscene = props => {

    // Extract value properties
    const { classes, cutsceneRows, fileName, hideBars } = props;

    // Extract method properties
    const { handleFileNameChange, handleAddRow, handleShouldHideBars } = props;
    
    return (
        <Grid 
            className={classes.root}
            container 
            spacing={16}
            alignItems="center"
        >
            <Grid item xs={12} md={10}>
                <TextField
                    id='file_name'
                    label='File Name'
                    fullWidth
                    value={fileName}
                    variant='outlined' margin='normal' 
                    onChange={e => handleFileNameChange(e.target.value)}
                />
            </Grid>
            <Grid item xs={12} md={2}>
                <Tooltip 
                    title='If true, top and bottom black bars will not show'
                >    
                    <FormControlLabel
                        label='Hide black bars'
                        control={
                            <Switch
                                onChange={e => {
                                    handleShouldHideBars(e.target.checked)
                                }}
                                checked={hideBars}
                                value={hideBars}
                            />
                        }
                    />
                </Tooltip>
            </Grid>
            {cutsceneRows.length === 0 && 
                <Typography 
                    variant='h5' 
                    color='textSecondary' 
                    align='center' 
                    className={classes.emptyText}
                >
                    The cutscene is empty
                </Typography>
            }
            {cutsceneRows.map((cutsceneRow, index) => (
                <CutsceneRowContainer
                    key={index}
                    rowNumber={index}
                    rowData={cutsceneRow}
                />
            ))}
            <Grid item xs={12}>
                <Grid container justify='center'>
                    <Button 
                        color='primary'
                        className={classes.defaultButton}
                        onClick={() => handleAddRow()}
                    >
                        Add Row
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default withStyles(styles)(Cutscene);

