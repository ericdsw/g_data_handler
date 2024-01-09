import React from 'react';
import { green } from '@mui/material/colors';

const highlight = { color: green[400], fontWeight: 'bold' };

const createConditionDescription = (condition) => {
  switch (condition.type) {
    case 'npc_interaction':
      return (
        <React.Fragment>
          Interact with&nbsp;
          <span style={highlight}>{condition.parameters.target_npc}</span>
        </React.Fragment>
      );

    case 'npc_finished_dialogues':
      return (
        <React.Fragment>
          Exhaust&nbsp;
          <span style={highlight}>{condition.parameters.target_npc}</span>{' '}
          dialogues
        </React.Fragment>
      );

    case 'entered_trigger_area':
      return (
        <React.Fragment>
          Enter Area&nbsp;
          <span style={highlight}>{condition.parameters.target_area_name}</span>
        </React.Fragment>
      );

    case 'got_item':
      return (
        <React.Fragment>
          Get Item&nbsp;
          <span style={highlight}>{condition.parameters.required_item_id}</span>
        </React.Fragment>
      );

    case 'item_used':
      return (
        <React.Fragment>
          Use Item&nbsp;
          <span style={highlight}>{condition.parameters.used_item_id}</span>
        </React.Fragment>
      );

    case 'choice_selected':
      return (
        <React.Fragment>
          Select choice&nbsp;
          <span style={highlight}>{condition.parameters.choice}</span>
          &nbsp;in conversation&nbsp;
          <span style={highlight}>{condition.parameters.conversation}</span>
        </React.Fragment>
      );

    case 'advance_storyline':
      return (
        <React.Fragment>
          Advance Storyline&nbsp;
          <span style={highlight}>{condition.parameters.storyline}</span>
          &nbsp;to step&nbsp;
          <span style={highlight}>{condition.parameters.target_step}</span>
        </React.Fragment>
      );

    case 'storyline_message':
      return (
        <React.Fragment>
          Listen to message&nbsp;
          <span style={highlight}>{condition.parameters.message}</span>
        </React.Fragment>
      );
    
      case 'complete_gacha_list':

        let content = <></>;
        switch (condition.parameters.which_list) {
          case 'morning':
            content = <>All <i>morning</i> gachas are obtained</>
            break;
          case 'night':
            content = <>All <i>night</i> gachas are obtained</>
            break;
          default:
            content = <>All gachas are obtained</>
            break;
        }

        return (
          <>
            Notice when&nbsp;
            <span style={highlight}>{content}</span>
          </>
        )

    default:
      return <>{condition}</>;
  }
};

export default createConditionDescription;
