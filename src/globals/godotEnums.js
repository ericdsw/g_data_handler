const possibleTransTypes = {
  0: 'TRANS_LINEAR',
  1: 'TRANS_SINE',
  2: 'TRANS_QUINT',
  3: 'TRANS_QUART',
  4: 'TRANS_QUAD',
  5: 'TRANS_EXPO',
  6: 'TRANS_ELASTIC',
  7: 'TRANS_CUBIC',
  8: 'TRANS_CIRC',
  9: 'TRANS_BOUNCE',
  10: 'TRANS_BACK',
  11: 'TRANS_SPRING'
};
const possibleEaseTypes = {
  0: 'EASE_IN',
  1: 'EASE_OUT',
  2: 'EASE_IN_OUT',
  3: 'EASE_OUT_IN'
};

function keyForValue(enumDictionary, enumValue) {
  let result;
  for(let i = 0; i < Object.keys(enumDictionary).length; i++) {
    const curKey = Object.keys(enumDictionary)[i];
    const curVal = enumDictionary[curKey];
    if (curVal === enumValue) {
      result = curKey;
      break
    }
  }
  return result;
}

export {
  possibleTransTypes,
  possibleEaseTypes,
  keyForValue
};