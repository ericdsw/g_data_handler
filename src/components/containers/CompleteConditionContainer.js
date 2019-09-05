import React from 'react';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';

import CompleteCondition from '../pages/storylines/CompleteCondition';

class CompleteConditionContainer extends React.Component {
    render() {
        const { conditionId, completeConditions } = this.props;
        const currentCompleteCondition = completeConditions[conditionId];
        return (
            <CompleteCondition
                completeCondition={currentCompleteCondition}
            />
        );
    }
}

const mapStateToProps = state => ({
    completeConditions: state.storyline.completeConditions
});

export default connect(mapStateToProps, {

})(withSnackbar(CompleteConditionContainer));
