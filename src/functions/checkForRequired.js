import { eventSchema } from '../globals';

export default function checkForRequired(eventType, inputName, value) {
    const inputData = eventSchema[eventType]['parameters'][inputName];
    if (inputName !== 'is_important' && inputData.required && value === '') {
        return false;
    }
    return true;
}
