import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { 
    AppBar, Toolbar, Typography, IconButton
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { drawerWidth, applicationName } from '../../globals';
import { toggleDrawer } from '../../actions/appActions';

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

class ApplicationBar extends React.Component {

    handleDrawerToggle = () => {
        this.props.toggleDrawer();
    }

    render() {

        const { classes } = this.props;

        return (
            <AppBar position="fixed" color="primary"
                className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color='inherit'
                        aria-label='Open Drawer'
                        onClick={this.handleDrawerToggle}
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
}

export default connect(null, {
    toggleDrawer
})(withStyles(styles)(ApplicationBar));
