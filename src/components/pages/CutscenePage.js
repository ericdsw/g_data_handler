import React from 'react'
import NoCutscene from './NoCutscene'
import Cutscene from '../Cutscene'
import { connect } from 'react-redux'

class CutscenePage extends React.Component {

    render() {

        const { currentCutscene, currentCutsceneJumps} = this.props

        let content
        if (this.props.currentCutscene !== null) {
            content = (
                <Cutscene 
                    cutsceneRows={currentCutscene}
                    jumps={currentCutsceneJumps}/>
            )
        } else {
            content = <NoCutscene />
        }

        return (
            <div>
                {content}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    currentCutscene: state.cutscene.currentCutscene,
    currentCutsceneJumps: state.cutscene.currentCutsceneJumps,
    fileName: state.cutscene.fileName
})

export default connect(mapStateToProps, {})(CutscenePage)
