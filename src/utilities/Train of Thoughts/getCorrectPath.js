const getCorrectPath = stationColor => {
  const stationPath = {
    '#f8de22': [1, 3],
    '#e48125': [1, 3],
    '#5bc0f8': [1, 2, 6, 7, 8],
    '#a2678a': [1, 2, 6, 7],
    '#3771d5': [1, 2, 6, 7, 8, 9],
    '#974ec3': [1, 2, 6, 10, 12],
    '#b9ff66': [1, 2, 6, 7, 8, 9],
    '#bdad16': [1, 2, 6, 10, 12, 13],
    '#42ac4d': [1, 2, 6, 10, 11, 12, 13],
    '#fe7be5': [1, 2, 6, 10, 11],
    '#ff6969': [1, 2, 6, 7, 10, 11],
    '#d7c0ae': [1, 2, 4, 5],
    '#7c9d96': [1, 2, 4, 5],
    '#c70039': [1, 2, 4],
  };
  return stationPath[stationColor];
};

export default getCorrectPath;
