import React from 'react';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';

import {
    updateCondition,
    deleteCondition
} from '../../actions/storylineActions';
import CompleteCondition from '../pages/storylines/CompleteCondition';

class CompleteConditionContainer extends React.Component {

    deleteCondition = () => {
        const { conditionId, deleteCondition } = this.props;
        deleteCondition(conditionId);
    }

    editCondition = (name, parameters) => {
        const { conditionId, updateCondition } = this.props;
        updateCondition(conditionId, name, parameters);
    }

    render() {
        const { conditionId, completeConditions } = this.props;
        const currentCompleteCondition = completeConditions[conditionId];
        return (
            <CompleteCondition
                completeCondition={currentCompleteCondition}
                handleEditCondition={this.editCondition}
                handleDeleteCondition={this.deleteCondition}
            />
        );
    }
}

const mapStateToProps = state => ({
    completeConditions: state.storyline.completeConditions
});

export default connect(mapStateToProps, {
    updateCondition,
    deleteCondition
})(withSnackbar(CompleteConditionContainer));
