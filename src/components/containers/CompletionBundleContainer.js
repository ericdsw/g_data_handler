import React from 'react';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';

import CompletionBundle from '../pages/storylines/CompletionBundle';

import {
    addStepCompleteCondition
} from '../../actions/storylineActions';

class CompletionBundleContainer extends React.Component {

    createCondition = (type, name, data) => {
        const {
            currentCompletionBundleId, addStepCompleteCondition
        } = this.props;

        addStepCompleteCondition(
            currentCompletionBundleId,
            type, name, data
        );
    }

    render() {

        const { currentCompletionBundleId, completionBundles } = this.props;
        const currentBundle = completionBundles[currentCompletionBundleId];
        
        return (
            <CompletionBundle
                completionBundle={currentBundle}
                handleCreateCondition={this.createCondition}
            />
        );
    }

}

const mapStateToProps = state => ({
    completionBundles: state.storyline.completionBundles
});

export default connect(mapStateToProps, {
    addStepCompleteCondition
})(withSnackbar(CompletionBundleContainer));

