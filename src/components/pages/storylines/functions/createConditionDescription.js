import React from 'react';
import { green } from '@material-ui/core/colors';

const highlight = { color: green[400], fontWeight: 'bold' };

const createConditionDescription = condition => {

    switch(condition.type) {

        case 'npc_interaction':
            return (
                <React.Fragment>
                    Interact with&nbsp;
                    <span style={highlight}>
                        {condition.parameters.target_npc}
                    </span>
                </React.Fragment>
            );

        case 'npc_finished_dialogues':
            return (
                <React.Fragment>
                    Exhaust&nbsp;
                    <span style={highlight}>
                        {condition.parameters.target_npc}
                    </span> dialogues
                </React.Fragment>
            );

        case 'enter_trigger_area':
            return (
                <React.Fragment>
                    Enter Area&nbsp;
                    <span style={highlight}>
                        {condition.parameters.target_area_name}
                    </span>
                </React.Fragment>
            );

        case 'got_item':
            return (
                <React.Fragment>
                    Get Item&nbsp;
                    <span style={highlight}>
                        {condition.parameters.required_item_id}
                    </span>
                </React.Fragment>
            );

        case 'item_used':
            return (
                <React.Fragment>
                    Use Item&nbsp;
                    <span style={highlight}>
                        {condition.parameters.used_item_id}
                    </span>
                </React.Fragment>
            );

        case 'choice_selected':
            return (
                <React.Fragment>
                    Select choice&nbsp;
                    <span style={highlight}>{condition.parameters.choice}</span> 
                    &nbsp;in conversation&nbsp;
                    <span style={highlight}>
                        {condition.parameters.conversation}
                    </span>
                </React.Fragment>
            );

        case 'advance_storyline':
            return (
                <React.Fragment>
                    Advance Storyline&nbsp;
                    <span style={highlight}>
                        {condition.parameters.storyline}
                    </span>
                    &nbsp;to step&nbsp;
                    <span style={highlight}>
                        {condition.parameters.target_step}
                    </span>
                </React.Fragment>
            );

        case 'storyline_message':
            return (
                <React.Fragment>
                    Listen to message&nbsp;
                    <span style={highlight}>
                        {condition.parameters.message}
                    </span>
                </React.Fragment>
            );

        default:
            return condition;
    }
}

export default createConditionDescription;

