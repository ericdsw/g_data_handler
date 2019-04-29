import React from 'react';
import { connect } from 'react-redux';

import { NoCutscene } from '../elements';
import Cutscene from '../Cutscene';

class CutscenePage extends React.Component {

    render() {

        const { currentCutscene, currentCutsceneJumps } = this.props;

        let content;
        if (this.props.currentCutscene !== null) {
            content = (
                <Cutscene 
                    fileName={this.props.fileName}
                    cutsceneRows={currentCutscene}
                    jumps={currentCutsceneJumps}/>
            );
        } else {
            content = <NoCutscene />;
        }

        return (
            <div>
                {content}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    currentCutscene: state.cutscene.currentCutscene,
    currentCutsceneJumps: state.cutscene.currentCutsceneJumps,
    fileName: state.cutscene.fileName
});

export default connect(mapStateToProps, {})(CutscenePage);
