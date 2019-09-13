import eventSchema from './eventSchema';
import speakerSchema from './speakerSchema';
import interactionInputSchema from './interactionInputSchema';
import completionInputSchema from './completionInputSchema';
import storylineEntityInputSchema from './storylineEntityInputSchema';

const appVersion = 0.2;
const applicationName = `Game Data Manager v${appVersion}`;
const drawerWidth = 240;

export {
    drawerWidth,
    applicationName,
    eventSchema,
    speakerSchema,
    interactionInputSchema,
    completionInputSchema,
    storylineEntityInputSchema
}
