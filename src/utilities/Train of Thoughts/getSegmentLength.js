const getSegmentLength = (start, end) => {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  return Math.sqrt(dx ** 2 + dy ** 2);
};

export default getSegmentLength;
