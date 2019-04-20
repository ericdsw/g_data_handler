import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { drawerWidth, applicationName } from '../../globals'
import { 
    AppBar, 
    Toolbar, 
    Typography,
    IconButton
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

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
})

class ApplicationBar extends React.Component {

    render() {

        const { classes } = this.props

        return (
            <AppBar position="fixed" color="primary"
                className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color='inherit'
                        aria-label='Open Drawer'
                        className={classes.menuButton}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit">
                        {applicationName}
                    </Typography>
                </Toolbar>
            </AppBar>
        )
    }
}

export default withStyles(styles)(ApplicationBar)
