const generateOddNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  let randomOdd = Math.floor(Math.random() * (max - min + 1)) + min;
  if (randomOdd % 2 === 0) {
    randomOdd += 1;
  }
  return randomOdd;
};

export default generateOddNumber;
