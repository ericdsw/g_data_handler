import React from 'react';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';

import NPCInteraction from '../pages/storylines/NPCInteraction';
import {
    deleteNPCInteraction
} from '../../actions/storylineActions';

class NPCInteractionContainer extends React.Component {

    deleteInteraction = () => {
        const { currentInteractionId, deleteNPCInteraction } = this.props;
        deleteNPCInteraction(currentInteractionId);
    }

    render() {
        const { currentInteractionId, npcInteractions } = this.props;
        const currentInteraction = npcInteractions[currentInteractionId];
        return (
            <NPCInteraction 
                npcInteraction={currentInteraction}
                handleDelete={this.deleteInteraction}
            />
        );
    }
}

const mapStateToProps = state => ({
    npcInteractions: state.storyline.entityConfigurators
});

export default connect(mapStateToProps, {
    deleteNPCInteraction
})(withSnackbar(NPCInteractionContainer));
