import React from 'react';
import { connect } from 'react-redux';
import {
    deleteDialogueConversation,
    addMessageToConversation,
    editDialogueConversation
} from '../../actions/dialogueActions';
import { Draggable } from 'react-beautiful-dnd';

import DialogueConversation from '../pages/dialogues/DialogueConversation';

class DialogueConversationContainer extends React.Component {

    deleteConversation = () => {
        const { deleteDialogueConversation, conversationId } = this.props;
        deleteDialogueConversation(conversationId);
    }

    addNewToConversation = newEntryData => {
        const { addMessageToConversation, conversationId } = this.props;
        addMessageToConversation(conversationId, newEntryData);
    }

    updateConversation = newName => {
        const { editDialogueConversation, conversationId } = this.props;
        editDialogueConversation(conversationId, {
            conversationName: newName
        });
    }
    
    render() {

        const { conversationId, conversations } = this.props;
        const currentConversation = conversations[conversationId];

        return (
            <Draggable
                draggableId={conversationId}
                index={this.props.index}
            >
                {(provided) => (
                    <div
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                    >
                        <DialogueConversation
                            conversation={currentConversation}
                            handleDeleteConversation={this.deleteConversation}
                            handleAddToConversation={this.addNewToConversation}
                            handleUpdateConversation={this.updateConversation}
                            dragHandleProps={provided.dragHandleProps}
                        />
                    </div>
                )}
            </Draggable>
        );
    }

}

const mapStateToProps = state => ({
    conversations: state.dialogue.conversations
});

export default connect(mapStateToProps, {
    deleteDialogueConversation,
    addMessageToConversation,
    editDialogueConversation
})(DialogueConversationContainer);
