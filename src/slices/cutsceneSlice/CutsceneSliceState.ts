export default interface CutsceneSliceState {
  currentCutsceneId: string,
  cutscenes: {},
  cutsceneRows: {},
  cutsceneEvents: {},
  currentCutsceneJumps: {},
  fileName: string,
  hideBars: boolean,
  preloadedCutsceneFileNames: string[],
  templateIds: string[],
  eventTemplates: {},
  savedNodeTargets: string[],
  cutsceneRowsToMerge: string[]
}