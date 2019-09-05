import React from 'react';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';

import CompletionBundle from '../pages/storylines/CompletionBundle';

class CompletionBundleContainer extends React.Component {

    render() {

        const { currentCompletionBundleId, completionBundles } = this.props;
        const currentBundle = completionBundles[currentCompletionBundleId];
        
        return (
            <CompletionBundle
                completionBundle={currentBundle}
            />
        );
    }

}

const mapStateToProps = state => ({
    completionBundles: state.storyline.completionBundles
});

export default connect(mapStateToProps, {

})(withSnackbar(CompletionBundleContainer));

