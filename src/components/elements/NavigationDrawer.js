import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
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
import { 
    toggleDrawer, 
    collapseDrawer 
} from '../../actions/appActions'

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

    handleDrawerToggle = () => {
        this.props.toggleDrawer()
    }

    handleDrawerCollapse = () => {
        this.props.collapseDrawer()
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
                            <ListItem 
                                button
                                component={Link}
                                onClick={this.handleDrawerCollapse}
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
                        open={this.props.drawerOpen}
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

const mapStateToProps = state => ({
    drawerOpen: state.app.drawerOpen
})

export default connect(mapStateToProps, {
    toggleDrawer, collapseDrawer
})(
    withStyles(styles, { withTheme: true })(NavigationDrawer)
)
