const newColorSetGenerator = colors => {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomMeaningColor =
    colors[Math.floor(Math.random() * colors.length)].name;
  const randomTextColor =
    colors[Math.floor(Math.random() * colors.length)].name;

  return {
    meaningColor: randomMeaningColor,
    color: randomColor.name,
    colorValue: randomColor.value,
    textColor: randomTextColor,
  };
};

export default newColorSetGenerator;
