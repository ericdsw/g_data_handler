import { eventSchema } from "../globals";

export default function processRegularInputs(eventType, inputName, value) {
  let returnValue = value;

  const inputData = eventSchema[eventType]["parameters"][inputName];
  if (inputData.type !== "boolean" && !(value || inputData.required)) {
    returnValue = inputData.default;
  }

  if (inputData.type === "number") {
    returnValue = parseFloat(value);
  } else if (inputData.type === "json") {
    try {
      returnValue = JSON.parse(value);
    } catch (error) {
      returnValue = "";
    }
  } else if (inputData.type === "boolean") {
    if (typeof value === "undefined") {
      returnValue = false;
    }
  } else if (inputData.type === "position") {
    try {
      returnValue = JSON.parse(value);
      if (!("x" in returnValue) || !("y" in returnValue)) {
        returnValue = "";
      }
    } catch (error) {
      returnValue = value;
    }
  } 

  return returnValue;
}
