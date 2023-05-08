const newColorSetGenerator = colors => {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomTextColor = colors[Math.floor(Math.random() * colors.length)];
  const randomMeaningColor = colors[Math.floor(Math.random() * colors.length)];
  return {
    meaningColor: randomMeaningColor,
    color: randomColor,
    textColor: randomTextColor,
  };
};

export default newColorSetGenerator;
