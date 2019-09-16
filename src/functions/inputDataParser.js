
export const parseIn = (inputObject, inputSchema) => {

    for (const key in inputObject) {

        // Skip invalid entries
        if (!(key in inputSchema)) {
            continue;
        }

        switch (inputSchema[key].type) {
            case 'array':
                inputObject[key] = inputObject[key].join(',');
                break;
            case 'json':
                inputObject[key] = JSON.stringify(inputObject[key]);
                break;
            default:
                break;
        }
    }
    return inputObject;
}

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
                outputObject[key] = outputObject[key].replace(/\s/g,'')
                    .split(',');
                break;
            case 'json':
                outputObject[key] = JSON.parse(
                    outputObject[key].replace(/'/g,'"')
                );
                break;
            case 'number':
                outputObject[key] = parseFloat(outputObject[key]);
                break;
            default:
                break;
        }
    }
    return outputObject;
}

export const getMissingRequired = (object, inputSchema) => {
    const returnArray = [];
    for (const key in inputSchema) {
        const curValue = object[key];
        if (inputSchema[key].required && !curValue) {
            if (inputSchema[key].type !== 'boolean') {
                returnArray.push(key);
            }
        }
    }
    return returnArray;
}
