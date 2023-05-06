function maxScore(numbers) {
  const randomIndex = Math.floor(Math.random() * numbers.length);
  return numbers[randomIndex];
}
export default maxScore;
