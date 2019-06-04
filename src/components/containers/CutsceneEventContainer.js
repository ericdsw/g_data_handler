import React from 'react';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import CutsceneEvent from '../pages/cutscene/CutsceneEvent';
import {
    editCutsceneEvent,
    deleteCutsceneEvent
} from '../../actions/cutsceneActions';

class CutsceneEventContainer extends React.Component {

    editEvent = newEventData => {
        const { rowNumber, eventNumber, editCutsceneEvent } = this.props;
        editCutsceneEvent(rowNumber, eventNumber, newEventData);
    }

    deleteEvent = () => {
        const { rowNumber, eventNumber, deleteCutsceneEvent } = this.props;
        deleteCutsceneEvent(rowNumber, eventNumber);
    }

    render() {
        const { cutsceneEventData } = this.props;
        return (
            <CutsceneEvent
                cutsceneEventData={cutsceneEventData}
                handleEditEvent={this.editEvent}
                handleDeleteEvent={this.deleteEvent}
            />
        );
    }
}

export default connect(null, {
    editCutsceneEvent,
    deleteCutsceneEvent
})(withSnackbar(CutsceneEventContainer));
