import React from 'react';
import { connect } from 'react-redux';
import {
    deleteDialogueConversation,
    addMessageToConversation
} from '../../actions/dialogueActions';
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
    
    render() {

        const { conversationId, conversations } = this.props;
        const currentConversation = conversations[conversationId];

        return (
            <DialogueConversation
                conversation={currentConversation}
                handleDeleteConversation={this.deleteConversation}
                handleAddToConversation={this.addNewToConversation}
            />
        );
    }

}

const mapStateToProps = state => ({
    conversations: state.dialogue.conversations
});

export default connect(mapStateToProps, {
    deleteDialogueConversation,
    addMessageToConversation
})(DialogueConversationContainer);
