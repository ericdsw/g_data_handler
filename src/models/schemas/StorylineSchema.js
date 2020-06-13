import { schema } from "normalizr";

const EntityConfiguratorSchema = new schema.Entity("entityConfigurators");
const CompleteConditionSchema = new schema.Entity("completeConditions");

const StepMapEntitySchema = new schema.Entity("stepMapEntities", {
  configurator_data: [EntityConfiguratorSchema],
});

const StepMapSchema = new schema.Entity("stepMaps", {
  entity_nodes: [StepMapEntitySchema],
});

const CompletionBundleSchema = new schema.Entity("completionBundles", {
  conditions: [CompleteConditionSchema],
});

const StorylineStepSchema = new schema.Entity("storylineSteps", {
  configuration: [StepMapSchema],
  completion: [CompletionBundleSchema],
});

const StorylineSchema = new schema.Entity("storylines", {
  steps: [StorylineStepSchema],
});

export default StorylineSchema;
