const generateRoad = (screenHeight, screenWidth, roadHeight) => {
  const initialRoadBlock = {
    width: screenWidth + screenWidth * 0.7,
    height: screenHeight * 0.4,
    topWidth: screenWidth * 0.15,
  };
  let road = [initialRoadBlock];
  let totalSumBlockHeight = 0;
  let previousRoadBlock = initialRoadBlock;

  while (totalSumBlockHeight < roadHeight) {
    const newRoadBlock = {
      width: previousRoadBlock.width - previousRoadBlock.topWidth * 2,
      height: previousRoadBlock.height - previousRoadBlock.height * 0.1,
      topWidth: previousRoadBlock.topWidth,
    };
    road.push(newRoadBlock);
    previousRoadBlock = newRoadBlock;
    totalSumBlockHeight += previousRoadBlock.height;
  }
  return road;
};

export default generateRoad;
