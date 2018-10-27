export function concatUnique(a, b, key = null) {
  const arrA = Array.isArray(a) ? [...a] : [a];
  const arrB = Array.isArray(b) ? b : [b];
  const isArrayOfObjects = key !== null;

  if (!isArrayOfObjects) {
    arrB.forEach(i => {
      if (arrA.indexOf(i) === -1) {
        arrA.push(i);
      }
    });
  } else {
    arrB.forEach(b => {
      const keys = key.split(".");
      function getValue(el, keys) {
        return keys.reduce((value, key) => {
          return value[key];
        }, el);
      }
      if (arrA.findIndex(a => getValue(a, keys) === getValue(b, keys)) === -1) {
        arrA.push(b);
      }
    });
  }

  return arrA;
}
