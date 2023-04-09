const randomPoint = (min, max) => {
  const result = Math.floor(Math.random() * (max - min + 1) + min);
  return result;
};
export default randomPoint;
