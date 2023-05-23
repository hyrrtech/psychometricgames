const generateRangeInAsc = (n, num) => {
  if (n > num) {
    throw new Error(
      'Cannot generate more unique numbers than the given range.',
    );
  } else if (n < 0) {
    throw new Error('Number of elements should be a positive integer.');
  }

  var randomRange = new Set();

  while (randomRange.size < n) {
    randomRange.add(Math.floor(Math.random() * (num + 1)));
  }

  return Array.from(randomRange).sort((a, b) => a - b);
};

export default generateRangeInAsc;
