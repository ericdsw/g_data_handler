import React from 'react';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { Typography, Icon } from '@material-ui/core';
import { normalize } from 'normalizr';

import Storyline from '../pages/storylines/Storyline';
import { DragJsonFileManager } from '../elements';
import { downloadJSON, parseFile } from '../../functions';
import StorylineSchema from '../../schemas/StorylineSchema';
import {
    updateStoryline,
    updateWithEmptyStoryline,
    updateStorylineName
} from '../../actions/storylineActions';

class StorylineContainer extends React.Component {

    updateWithEmptyStoryline = () => {
        this.props.updateWithEmptyStoryline();
    }

    updateStorylineFromFile = targetFile => {

        const { updateStoryline } = this.props;

        parseFile(targetFile, 'application/json')
            .then(json => {
                const normalizedData = normalize(json, StorylineSchema);
                updateStoryline(normalizedData.result, normalizedData.entities);
            })
            .catch(error => this.showError(error.message));
    }

    updateName = newName => {
        const { currentStoryline, updateStorylineName } = this.props;
        updateStorylineName(currentStoryline, newName);
    }

    // Extra
    showError = errorMessage => {
        this.props.enqueueSnackbar(errorMessage, { variant: 'error' });
    }

    // Render Logic
    render() {

        const { currentStoryline, storylines } = this.props;

        let content;
        if (currentStoryline !== '') {
            content = (
                <Storyline
                    storyline={storylines[currentStoryline]}
                    handleNameChange={this.updateName}
                />
            );
        } else { 
            content = (
                <DragJsonFileManager
                    buttonString='New Storyline'
                    dragString={
                        <React.Fragment>
                            <Typography gutterBottom>
                                <Icon fontSize='large'>subscriptions</Icon>
                            </Typography>
                            Drag a <code>.json</code> here to edit
                            an existing storyline
                        </React.Fragment>
                    }
                    handleEmpty={this.updateWithEmptyStoryline}
                    handleUpdateFromFile={this.updateStorylineFromFile}
                />
            );
        }
        return content;
    }
}

const mapStateToProps = state => ({
    currentStoryline: state.storyline.currentStoryline,
    storylines: state.storyline.storylines,
});

export default connect(mapStateToProps, {
    updateStoryline,
    updateWithEmptyStoryline,
    updateStorylineName
})(withSnackbar(StorylineContainer));

