import React from 'react';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import NoCutscene from '../pages/cutscene/NoCutscene';
import Cutscene from '../pages/cutscene/Cutscene';
import CutsceneToolbar from '../pages/cutscene/CutsceneToolbar';
import { 
    downloadJSON, parseFile, fillCutsceneWithDefaults 
} from '../../functions';
import {
    updateCutsceneFileName,
    updateCutscene,
    addCutsceneRow,
    deleteCutsceneRow,
    addCutsceneJump,
    deleteCutsceneJump
} from '../../actions/cutsceneActions';

class CutsceneContainer extends React.Component {
    
    clearCutscene = () => {
        this.props.updateCutscene({
            cutscene: null,
            fileName: '',
            jumps: {}
        });
    }

    updateWithEmptyCutscene = () => {
        this.props.updateCutscene({
            cutscene: [],
            jumps: {},
            fileName: 'cutscene_file_name.json'
        });
    }

    updateCutsceneFromFile = targetFile => {
        const { updateCutscene } = this.props;
        parseFile(targetFile, 'application/json')
            .then(json => {
                let jumps = {}
                if (json['cutscene_jumps']) {
                    jumps = json['cutscene_jumps']
                }
                updateCutscene({
                    cutscene: fillCutsceneWithDefaults(json['data']),
                    jumps: jumps,
                    fileName: targetFile.name
                });
            })
            .catch(error => this.showError(error.message));
    }

    changeFileName = newFileName => {
        this.props.updateCutsceneFileName(newFileName);
    }

    addCutsceneRow = () => {
        this.props.addCutsceneRow();
    }

    addJump = (jumpName, fileName) => {
        this.props.addCutsceneJump(jumpName, fileName);
    }

    deleteJump = jumpName => {
        this.props.deleteCutsceneJump(jumpName);
    }

    export = () => {

        const { fileName, currentCutscene, currentCutsceneJumps } = this.props;

        // Check that the cutscene is not empty
        if (currentCutscene.length <= 0) {
            this.showError('Cannot export an empty cutscene'); 
            return;
        }

        // Check that no rows are empty
        let emptyRows = 0;
        currentCutscene.forEach(row => {
            if (row.length <= 0) {
                emptyRows += 1;
            }
        });
        if (emptyRows > 0) {
            this.showError(
                `${emptyRows} row${emptyRows > 1 ? 's are' : ' is'} empty`
            );
            return;
        }

        // Perform download
        downloadJSON(fileName, {
            data: currentCutscene,
            cutscene_jumps: currentCutsceneJumps
        });

    }

    // Extra
    showError = errorMessage => {
        this.props.enqueueSnackbar(errorMessage, { variant: 'error' });
    }

    // Render logic
    render() {

        const { currentCutscene, currentCutsceneJumps, fileName } = this.props;

        let content;
        if (this.props.currentCutscene !== null) {
            content = (
                <React.Fragment>
                    <CutsceneToolbar 
                        jumps={currentCutsceneJumps}
                        handleAddRow={this.addCutsceneRow}
                        handleAddJump={this.addJump}
                        handleDeleteJump={this.deleteJump}
                        handleExport={this.export}
                        handleClearCutscene={this.clearCutscene}
                    />
                    <Cutscene 
                        fileName={fileName}
                        cutsceneRows={currentCutscene}
                        jumps={currentCutsceneJumps}
                        handleFileNameChange={this.changeFileName}
                        handleAddRow={this.addCutsceneRow}
                    />
                </React.Fragment>
            );
        } else {
            content = (
                <NoCutscene 
                    handleEmptyCutscene={this.updateWithEmptyCutscene}
                    handleUpdateFromFile={this.updateCutsceneFromFile}
                />
            );
        }
        return content;
    }
}

const mapStateToProps = state => ({
    currentCutscene: state.cutscene.currentCutscene,
    currentCutsceneJumps: state.cutscene.currentCutsceneJumps,
    fileName: state.cutscene.fileName
});

export default connect(mapStateToProps, {
    updateCutsceneFileName,
    updateCutscene,
    addCutsceneRow,
    deleteCutsceneRow,
    addCutsceneJump,
    deleteCutsceneJump
})(withSnackbar(CutsceneContainer));
