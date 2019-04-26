import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme =>({

});

class NotFound extends React.Component {
    render() {
        return (
            <p>Not found</p>
        );
    }
}

export default withStyles(styles)(NotFound);
