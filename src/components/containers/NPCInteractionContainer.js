import React from "react";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";

import NPCInteraction from "../pages/storylines/NPCInteraction";
import {
  updateNPCInteraction,
  deleteNPCInteraction,
} from "../../actions/storylineActions";

class NPCInteractionContainer extends React.Component {
  deleteInteraction = () => {
    const { currentInteractionId, deleteNPCInteraction } = this.props;
    deleteNPCInteraction(currentInteractionId);
  };

  editInteraction = (parameters) => {
    const { currentInteractionId, updateNPCInteraction } = this.props;
    updateNPCInteraction(currentInteractionId, parameters);
  };

  render() {
    const { currentInteractionId, npcInteractions } = this.props;
    const currentInteraction = npcInteractions[currentInteractionId];
    return (
      <NPCInteraction
        npcInteraction={currentInteraction}
        handleEdit={this.editInteraction}
        handleDelete={this.deleteInteraction}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  npcInteractions: state.storyline.entityConfigurators,
});

export default connect(mapStateToProps, {
  updateNPCInteraction,
  deleteNPCInteraction,
})(withSnackbar(NPCInteractionContainer));
