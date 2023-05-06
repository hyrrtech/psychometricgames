const getColors = obj => {
  let colors = [];
  for (const key in obj) {
    const value = obj[key];
    if (typeof value === 'object') {
      colors.push(...getColors(value));
    } else if (key === 'color') {
      colors.push(value);
    }
  }
  return colors;
};

export default getColors;
