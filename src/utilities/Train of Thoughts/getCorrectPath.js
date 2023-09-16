const getCorrectPath = stationColor => {
  const stationPath = {
    '#f8de22': [3, 5],
    '#e48125': [3, 5],
    '#5bc0f8': [3, 4, 8, 9, 10],
    '#a2678a': [3, 4, 8, 9],
    '#3771d5': [3, 4, 8, 9, 10, 11],
    '#974ec3': [3, 4, 8, 12, 14],
    '#b9ff66': [3, 4, 8, 9, 10, 11],
    '#bdad16': [3, 4, 8, 12, 14, 15],
    '#42ac4d': [3, 4, 8, 12, 13, 14, 15],
    '#fe7be5': [3, 4, 8, 12, 13],
    '#ff6969': [3, 4, 8, 9, 12, 13],
    '#d7c0ae': [3, 4, 6, 7],
    '#7c9d96': [3, 4, 6, 7],
    '#c70039': [3, 4, 6],
  };
  return stationPath[stationColor];
};

export default getCorrectPath;
