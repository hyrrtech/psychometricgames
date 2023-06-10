function generateCloseValues(array) {
  const result = [];

  if (array.length === 0) {
    return result;
  }

  for (let i = 1; i <= Math.floor(array.length / 2); i++) {
    const newValue1 = array[0] * i + 1;
    const newValue2 = array[array.length - 1] + i;
    result.push(newValue1, newValue2);
  }

  return result;
}

export default generateCloseValues;
