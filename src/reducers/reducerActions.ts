/**
 * Removes the specified reference from the provided dictionary.
 * This is basically a helper method that other reducers use.
 */
export const deleteReference = (sourceDict, refName, val) => {
  for (const dictionaryKey in sourceDict) {
    const curElement = sourceDict[dictionaryKey];
    if (curElement[refName].includes(val)) {
      curElement[refName].splice(curElement[refName].indexOf(val), 1);
    }
  }
};
