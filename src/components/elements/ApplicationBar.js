import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
    AppBar, Toolbar, Typography, IconButton
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { drawerWidth, applicationName } from '../../globals';

const styles = theme => ({
    appBar: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        }
    },
    menuButton: {
        marginRight: 20,
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
});

const ApplicationBar = props => {

    const classes = makeStyles(styles)();
    
    const { handleToggle } = props;

    return (
        <AppBar position="fixed" color="primary"
            className={classes.appBar}>
            <Toolbar>
                <IconButton
                    color='inherit'
                    aria-label='Open Drawer'
                    onClick={() => handleToggle()}
                    className={classes.menuButton}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" color="inherit">
                    {applicationName}
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default ApplicationBar;
