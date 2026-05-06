import { PayloadAction } from "@reduxjs/toolkit";
import CutsceneSliceState from "../CutsceneSliceState";

type Payload = {
  currentCutsceneId: any,
  cutscenes: any,
  cutsceneRows: any,
  cutsceneEvents: any,
  jumps: any,
  fileName: any,
  hideBars: any,
}

export default function(state: CutsceneSliceState, action: PayloadAction<Payload>): void {
  const {
    currentCutsceneId,
    cutscenes,
    cutsceneRows,
    cutsceneEvents,
    jumps,
    fileName,
    hideBars,
  } = action.payload;

  const templateEventIds = [];
  Object.keys(state.eventTemplates).forEach((templateId) => {
    state.eventTemplates[templateId].templateEvents.forEach((eventId: string) => {
      templateEventIds.push(eventId);
    });
  });

  Object.keys(state.cutsceneEvents).forEach((eventId: string) => {
    if (!templateEventIds.includes(eventId)) {
      delete state.cutsceneEvents[eventId];
    }
  });

  state.currentCutsceneId = currentCutsceneId;
  state.cutscenes = cutscenes;
  state.cutsceneRows = cutsceneRows;
  state.currentCutsceneJumps = jumps;
  state.fileName = fileName;
  state.hideBars = hideBars;

  state.cutsceneEvents = {
    ...state.cutsceneEvents,
    ...cutsceneEvents,
  };
}
