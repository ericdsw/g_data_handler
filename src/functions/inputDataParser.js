function parseInPositionArray(input) {
  // Replace legacy
  if (typeof input === 'string') {
    return input.replace(/\[|"|\]/g, '');
  }
  if (Array.isArray(input)) {
    return input.join(',');
  }
  return input;
}

function parseInPosition(input) {
  if (input && typeof input !== 'string' && 'x' in input && 'y' in input) {
    return JSON.stringify(input);
  }
  return input;
}

function cleanBeforeJsonParse(sourceString) {
  return sourceString.replace(/'/g, '"');
}

export const parseIn = (inputObject, inputSchema) => {
  for (const key in inputSchema) {
    // Skip invalid entries
    if (!(key in inputSchema) || !(key in inputObject)) {
      continue;
    }

    switch (inputSchema[key].type) {
      case 'array':
        inputObject[key] = inputObject[key].join(',');
        break;
      case 'positionArray':
        inputObject[key] = parseInPositionArray(inputObject[key]);
        break;
      case 'position':
        inputObject[key] = parseInPosition(inputObject[key]);
        break;
      case 'number':
        const value = parseFloat(inputObject[key]);
        const defaultNumberVal = parseFloat(inputSchema[key].default);
        if (Number.isNaN(value)) {
          if (Number.isNaN(defaultNumberVal)) {
            inputObject[key] = '';
          } else {
            inputObject[key] = defaultNumberVal;
          }
        } else {
          inputObject[key] = value;
        }
        break;
      default:
        const defaultVal = inputSchema[key].default;
        if (!inputObject[key] && typeof defaultValue !== 'undefined') {
          inputObject[key] = defaultVal;
        }
        break;
    }
  }
  return inputObject;
};

export const parseOut = (outputObject, inputSchema) => {
  // Make sure were are not passing the ID
  if ('id' in outputObject) {
    delete outputObject['id'];
  }

  for (const key in outputObject) {
    if (!(key in inputSchema)) {
      continue;
    }

    switch (inputSchema[key].type) {
      case 'array':
      case 'positionArray':
        outputObject[key] = outputObject[key].replace(/\s/g, '').split(',');
        break;
      case 'position':
        try {
          outputObject[key] = JSON.parse(
            cleanBeforeJsonParse(outputObject[key])
          );
        } catch (e) {
          // Do Nothing, as the input is a string
        }
        break;
      case 'json':
        try {
          outputObject[key] = JSON.parse(
            cleanBeforeJsonParse(outputObject[key])
          );
        } catch (error) {
          outputObject[key] = '';
        }
        break;
      case 'number':
        const result = parseFloat(outputObject[key]);
        if (Number.isNaN(result)) {
          outputObject[key] = null;
        } else {
          outputObject[key] = result;
        }
        break;
      case 'boolean':
        const data = outputObject[key];
        outputObject[key] = typeof data === 'undefined' ? false : data;
        break;
      default:
        break;
    }
  }
  return outputObject;
};

export const getMissingRequired = (object, inputSchema) => {
  const returnArray = [];
  for (const key in inputSchema) {
    const curValue = object[key];

    if (inputSchema[key].required) {
      switch (inputSchema[key].type) {
        case 'boolean':
          break;
        case 'number':
          // Prevent 0 from being treated as "nothing there"
          const numberValue = parseFloat(curValue);
          if (typeof numberValue !== 'number' || Number.isNaN(numberValue)) {
            returnArray.push(key);
          }
          break;
        default:
          if (!curValue) {
            returnArray.push(key);
          }
          break;
      }
    }
  }
  return returnArray;
};
