import eventSchema from './eventSchema';
import speakerSchema from './speakerSchema';
import interactionInputSchema from './interactionInputSchema';
import completionInputSchema from './completionInputSchema';
import storylineEntityInputSchema from './storylineEntityInputSchema';
import bundleEntityInputSchema from './bundleEntityInputSchema';
import speakerNames from './speakerNames';

const appVersion = 0.5;
const applicationName = `G Data Manager v${appVersion}`;
const drawerWidth = 240;

export {
  drawerWidth,
  applicationName,
  eventSchema,
  speakerSchema,
  interactionInputSchema,
  completionInputSchema,
  storylineEntityInputSchema,
  bundleEntityInputSchema,
  speakerNames
};
