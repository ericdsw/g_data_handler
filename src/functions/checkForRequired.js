import { eventSchema } from "../globals";

function valueIsValid(value) {
  return (
    value !== "" &&
    value !== null &&
    typeof value !== "undefined" &&
    !Number.isNaN(value)
  );
}

export default function checkForRequired(eventType, inputName, value) {
  const inputData = eventSchema[eventType]["parameters"][inputName];

  if (
    inputName !== "is_important" &&
    inputData.required &&
    !valueIsValid(value)
  ) {
    return false;
  }
  return true;
}
