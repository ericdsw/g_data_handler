
// Removes the specified reference from the provided dictionary
export const deleteReference = (sourceDict, refName, val) => {
    for (const dictionaryKey in sourceDict) {
        const curElement = sourceDict[dictionaryKey];
        if (curElement[refName].includes(val)) {
            curElement[refName].splice(
                curElement[refName].indexOf(val), 1
            )
        }
    }
}