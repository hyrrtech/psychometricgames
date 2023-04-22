const getRandomColor = trainColors => {
  return trainColors[Math.floor(Math.random() * trainColors.length)];
};

export default getRandomColor;
