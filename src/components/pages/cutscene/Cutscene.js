import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography, TextField, Button } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import CutsceneRowContainer from '../../containers/CutsceneRowContainer';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    deleteButton: {
        color: red[500],
    },
    emptyText: {
        padding: 32,
        width: '100%'
    },
});

const Cutscene = props => {

    // Extract value properties
    const { classes, cutsceneRows, fileName } = props;

    // Extract method properties
    const { handleFileNameChange, handleAddRow } = props;
    
    return (
        <Grid 
            className={classes.root}
            container 
            spacing={16}
            alignItems="center"
        >
            <Grid item xs={12}>
                <TextField
                    id='file_name'
                    label='File Name'
                    fullWidth
                    value={fileName}
                    variant='outlined' margin='normal' 
                    onChange={e => handleFileNameChange(e.target.value)}
                />
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

