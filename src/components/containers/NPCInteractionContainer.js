import React from 'react';
import { connect } from 'react-redux';

import NPCInteraction from '../pages/storylines/NPCInteraction';
import {
  updateNPCInteraction,
  deleteNPCInteraction,
} from '../../actions/storylineActions';

const NPCInteractionContainer = ({
  currentInteractionId,
  deleteNPCInteraction,
  updateNPCInteraction,
  npcInteractions,
}) => {
  return (
    <NPCInteraction
      npcInteraction={npcInteractions[currentInteractionId]}
      handleEdit={(parameters) => {
        updateNPCInteraction(currentInteractionId, parameters);
      }}
      handleDelete={() => {
        deleteNPCInteraction(currentInteractionId);
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  npcInteractions: state.storyline.entityConfigurators,
});

export default connect(mapStateToProps, {
  updateNPCInteraction,
  deleteNPCInteraction,
})(NPCInteractionContainer);
