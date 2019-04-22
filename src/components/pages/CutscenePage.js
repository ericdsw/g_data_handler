import React from 'react'
import NoCutscene from './NoCutscene'
import Cutscene from '../Cutscene'

class CutscenePage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            currentCutscene: null
        }
    }

    newCutsceneDetected = (cutscene) => {
        this.setState({
            currentCutscene: cutscene
        })
    }

    render() {
        let content
        if (this.state.currentCutscene !== null) {
            content = (
                <Cutscene 
                    cutscene={this.state.currentCutscene}
                />
            )
        } else {
            content = (
                <NoCutscene 
                    onCutsceneDetected={this.newCutsceneDetected} 
                />
            )
        }

        return (
            <div>
                {content}
            </div>
        )
    }
}

export default CutscenePage
