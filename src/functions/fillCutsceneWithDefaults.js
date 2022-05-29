import { eventSchema } from '../globals';

function fillEventWithDefaults(event) {
  var currentSchema = eventSchema[event.type];
  for (const paramName in currentSchema.parameters) {
    if (typeof event.parameters[paramName] === 'undefined') {
      const defaultValue = currentSchema.parameters[paramName].default;
      event.parameters[paramName] = defaultValue;
    }
  }

  /**
   * is_important is an special parameter that must always be accounted
   * for, even if the source event does not define it. If this parameter
   * is not found, force it to whatever defaultImportant is.
   */
  if (typeof event.parameters['is_important'] === 'undefined') {
    event.parameters['is_important'] = currentSchema.defaultImportant;
  }
}

/**
 * This method will ensure that all provided cutscenes follow the same format:
 * - All cutscenRows will be arrays, rows that consist of a single event will be
 *   forced to wrap it inside an array.
 * - CutsceneEvents will define all of it's properties, even if the original file
 *   did not specify them (will be populated with default values).
 */
export default function fillCutsceneWithDefaults(cutsceneData) {
  return cutsceneData.map((event) => {
    if (!Array.isArray(event)) {
      fillEventWithDefaults(event);
      return [event];
    } else {
      return event.map((currentEvent) => {
        fillEventWithDefaults(currentEvent);
        return currentEvent;
      });
    }
  });
}
