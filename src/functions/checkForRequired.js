import { schema } from '../globals';

export default function checkForRequired(eventType, inputName, value) {
    const inputData = schema[eventType]['parameters'][inputName];
    if (inputName !== 'is_important' && inputData.required && value === '') {
        return false;
    }
    return true;
}
