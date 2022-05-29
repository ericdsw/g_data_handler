import { eventSchema } from '../globals';

/**
 * This method will return true if the provided value is an actual
 * "valid" value. Note that this includes checking for several falsy
 * conditions
 */
function valueIsValid(value) {
  return (
    value !== '' &&
    value !== null &&
    typeof value !== 'undefined' &&
    !Number.isNaN(value)
  );
}

/**
 * Compares the provided value againsthe input schema, to see if it was
 * required. Will return false if the input is required, but was not
 * provided
 */
export default function checkForRequired(eventType, inputName, value) {
  const inputData = eventSchema[eventType]['parameters'][inputName];

  if (
    inputName !== 'is_important' &&
    inputData.required &&
    !valueIsValid(value)
  ) {
    return false;
  }
  return true;
}
