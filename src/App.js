import React, { Component } from 'react';
import './App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import CssBaseline from '@material-ui/core/CssBaseline';
import Cutscene from './components/Cutscene'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const theme = createMuiTheme({
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
});

class App extends Component {

    render() {
        return (
            <React.Fragment>
                <MuiThemeProvider theme={theme}>
                    <CssBaseline />

                    <AppBar position="static" color="primary">
                    <Toolbar>
                        <Typography variant="h6" color="inherit">
                            Cutscene Editor v0.1
                        </Typography>
                    </Toolbar>
                    </AppBar>

                    <Cutscene file='./data/first_monster_battle.json' />
                </MuiThemeProvider>
            </React.Fragment>
        );
    }

}

export default App;
