import { schema } from 'normalizr';

const CutsceneEventSchema = new schema.Entity('cutsceneEvents');

const CutsceneRowSchema = new schema.Entity('cutsceneRows', {
  cutsceneEvents: [CutsceneEventSchema]
});

const CutsceneSchema = new schema.Entity('cutscenes', {
  cutsceneRows: [CutsceneRowSchema]
});

export default CutsceneSchema;