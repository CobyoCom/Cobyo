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
      if (arrA.findIndex(a => a[key] === b[key]) === -1) {
        arrA.push(b);
      }
    });
  }

  return arrA;
}
