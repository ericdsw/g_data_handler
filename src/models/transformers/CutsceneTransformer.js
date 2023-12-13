import { normalize, denormalize } from 'normalizr';
import { v4 as uuidv4 } from 'uuid';

import CutsceneSchema from '../schemas/CutsceneSchema';

export const transformIn = inData => {
  const cutsceneRows = inData.map(cutsceneRowEvents => {
    const cutsceneEvents = cutsceneRowEvents.map(rowEvent => ({
      ...rowEvent,
      id: uuidv4()
    }))
    return {
      id: uuidv4(),
      cutsceneEvents
    }
  });
  return normalize({
    id: uuidv4(),
    cutsceneRows
  }, CutsceneSchema);
}

export const transformOut = (cutsceneId, outData) => {

  const denormalizedData = denormalize(cutsceneId, CutsceneSchema, outData);
  if (!denormalizedData) {
    return [];
  }

  const outputData = [];
  denormalizedData.cutsceneRows.forEach(rowData => {
    const parsedRowData = [];
    rowData.cutsceneEvents.forEach(eventData => {
      delete eventData.id;
      parsedRowData.push(eventData);
    })
    outputData.push(parsedRowData);
  });
  return outputData;
}