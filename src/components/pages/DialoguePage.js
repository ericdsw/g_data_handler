import React from 'react';
import { connect } from 'react-redux';
import { NoDialogue } from '../elements';
import Dialogue from '../Dialogue';

class DialoguePage extends React.Component {

    render() {

        const { currentDialogueData, fileName } = this.props;
        let content;
        if (currentDialogueData === null) {
            content = <NoDialogue />
        } else {
            content = (
                <React.Fragment>
                    <Dialogue 
                        fileName={fileName}
                        conversations={currentDialogueData}
                    />
                </React.Fragment>
            );
        }

        return (
            <div>
                {content}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    currentDialogueData: state.dialogue.currentDialogueData,
    fileName: state.dialogue.fileName
});

export default connect(mapStateToProps, {})(DialoguePage);
