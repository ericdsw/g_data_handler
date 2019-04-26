import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

const styles = theme =>({

});

class DialoguePage extends React.Component {

    render() {
        return (
            <p>This is the dialogue page</p>
        );
    }
}

export default withStyles(styles)(DialoguePage);
