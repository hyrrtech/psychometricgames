const getCorrectPath = stationColor => {
  const stationPath = {
    green: [1, 3],
    pink: [1, 3],
    blue: [1, 2, 6, 7, 8],
    red: [1, 2, 6, 7],
    yellow: [1, 2, 6, 7, 8, 9],
    orange: [1, 2, 6, 10, 12],
    purple: [1, 2, 6, 7, 8, 9],
    crimson: [1, 2, 6, 10, 12, 13],
    gray: [1, 2, 6, 10, 11, 12, 13],
    coral: [1, 2, 6, 10, 11],
    chartreuse: [1, 2, 6, 7, 10, 11],
    beige: [1, 2, 4, 5],
    aquamarine: [1, 2, 4, 5],
    aqua: [1, 2, 4],
  };
  return stationPath[stationColor];
};

export default getCorrectPath;
