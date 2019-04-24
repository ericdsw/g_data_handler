import eventSchema from './eventSchema'

export const checkForRequired = (eventType, inputName, value) => {
    const inputData = eventSchema[eventType]['parameters'][inputName]
    if (inputName !== 'is_important' && inputData.required && value === '') {
        return false
    }
    return true
}

export const processRegularInputs = (eventType, inputName, value) => {

    let returnValue = value

    const inputData = eventSchema[eventType]['parameters'][inputName]
    if (! (value || inputData.required)) {
        returnValue = inputData.default
    }

    if (inputData.type === 'json') {
        try {
            returnValue = JSON.parse(value)
            console.log('was json')
            console.log(typeof returnValue)
            console.log(returnValue)
        } catch (error) {
            returnValue = ''
        }
    }

    return returnValue
}
