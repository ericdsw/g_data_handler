import React from 'react';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';

import StepMap from '../pages/storylines/StepMap';

import {
    addEntityToExistingMap
} from '../../actions/storylineActions';

class StepMapContainer extends React.Component {

    addEntity = data => {
        const { addEntityToExistingMap, currentMapId } = this.props;
        addEntityToExistingMap(currentMapId, data);
    }

    render() {
        const { currentMapId, maps } = this.props;
        const currentMap = maps[currentMapId];

        return (
            <StepMap
                stepMap={currentMap}
                handleAddEntity={this.addEntity}
            />
        );
    }
}

const mapStateToProps = state => ({
    maps: state.storyline.stepMaps
});

export default connect(mapStateToProps, {
    addEntityToExistingMap
})(withSnackbar(StepMapContainer));
