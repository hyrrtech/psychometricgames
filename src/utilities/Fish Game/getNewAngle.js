const getNewAngle = (a, b) => {
  const angle = Math.atan2(b.y - a.y, b.x - a.x);
  return `${3.14159 + angle}rad`;
};

export default getNewAngle;
