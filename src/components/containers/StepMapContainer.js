import React from 'react';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';

import StepMap from '../pages/storylines/StepMap';

class StepMapContainer extends React.Component {
    render() {
        const { currentMapId, maps } = this.props;
        const currentMap = maps[currentMapId];

        return (
            <StepMap
                stepMap={currentMap}
            />
        );
    }
}

const mapStateToProps = state => ({
    maps: state.storyline.stepMaps
});

export default connect(mapStateToProps, {

})(withSnackbar(StepMapContainer));
