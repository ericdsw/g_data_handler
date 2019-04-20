import React from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { purple, green } from '@material-ui/core/colors'
import { CssBaseline, withStyles } from '@material-ui/core'
import { NavigationDrawer, ApplicationBar } from './components/elements'
import { drawerWidth } from './globals'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import routes from './router'

const applicationTheme = createMuiTheme({
    palette: {
        primary: {
            light: purple[300],
            main: purple[500],
            dark: purple[700]
        },
        secondary: {
            light: green[300],
            main: green[500],
            dark: green[700]
        },
    },
    typography: {
        useNextVariants: true
    },
})

const styles = theme => ({
    root: {
        display: 'flex',
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        [theme.breakpoints.up('sm')]: {
            marginLeft: drawerWidth,
        }
    },
})

class App extends React.Component {

    render() {
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <MuiThemeProvider theme={applicationTheme}>
                    <CssBaseline />
                    <Router>
                        <ApplicationBar />
                        <NavigationDrawer />
                        <main className={classes.content}>
                            <div className={classes.toolbar} />
                            {routes.map(route => (
                                <Route
                                    key={route.path}
                                    path={route.path}
                                    exact={route.exact}
                                    component={route.component} />
                            ))}
                        </main>
                    </Router>
                </MuiThemeProvider>
            </div>
        )
    }
}

export default withStyles(styles)(App)
