import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { drawerWidth } from '../../globals'
import {
    Divider,
    Drawer,
    Hidden,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import routes from '../../router'

const styles = theme => ({
    toolbar: theme.mixins.toolbar,
    root: {
        display: 'flex',
    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
});

class NavigationDrawer extends React.Component {

    state = {
        mobileOpen: false
    }

    handleDrawerToggle = () => {
        this.setState(state => ({mobileOpen: !state.mobileOpen}))
    }

    render() {

        const { classes, theme } = this.props

        const drawerContent = (
            <div>
                <div className={classes.toolbar} />
                <Divider />
                <List>
                    {
                        routes.map( route => (
                            <ListItem button
                                component={Link}
                                to={route.path}
                                key={route.path}>
                                <ListItemIcon>
                                    {route.icon}
                                </ListItemIcon>
                                <ListItemText primary={route.text} />
                            </ListItem>
                        ))
                    }
                </List>
            </div>
        )

        return (
            <nav className={classes.drawer}>

                <Hidden smUp implementation='css'>
                    <Drawer
                        variant='temporary'
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={this.state.mobileOpen}
                        onClose={this.handleDrawerToggle}
                        classes={{ paper: classes.drawerPaper }}>
                        {drawerContent}
                    </Drawer>
                </Hidden>

                <Hidden xsDown implementation='css'>
                    <Drawer
                        variant='permanent'
                        open
                        classes={{ paper: classes.drawerPaper }}>
                        {drawerContent}
                    </Drawer>
                </Hidden>

            </nav>
        )
    }
}

export default withStyles(styles, { withTheme: true })(NavigationDrawer)
