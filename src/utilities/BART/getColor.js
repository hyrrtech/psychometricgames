const getColor = (
  COLORS,
  HIGH_RISK_START_POINT,
  POP_POINT,
  NUMBER_OF_WEIGHTS,
) => {
  const range = NUMBER_OF_WEIGHTS - HIGH_RISK_START_POINT;
  const partSize = range / 3;

  if (POP_POINT < HIGH_RISK_START_POINT + partSize) {
    return COLORS.high;
  } else if (POP_POINT < HIGH_RISK_START_POINT + 2 * partSize) {
    return COLORS.medium;
  } else {
    return COLORS.low;
  }
};

export default getColor;
