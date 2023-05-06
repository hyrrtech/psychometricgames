const divideIntoWeightedParts = (
  SCORE_CAP,
  PUMP_COUNT_CAP,
  HIGH_RISK_POINT,
  DIVIDE_WEIGHTAGE,
) => {
  const parts = [];

  const initialWeight = 1 / (DIVIDE_WEIGHTAGE * PUMP_COUNT_CAP);

  for (let i = 0; i < HIGH_RISK_POINT; i++) {
    const part = SCORE_CAP * initialWeight;
    parts.push(part);
  }

  const remainingWeight = 1 - HIGH_RISK_POINT * initialWeight;
  const remainingParts = PUMP_COUNT_CAP - HIGH_RISK_POINT;
  const restWeight = remainingWeight / remainingParts;

  for (let i = HIGH_RISK_POINT; i < PUMP_COUNT_CAP; i++) {
    const part = SCORE_CAP * restWeight;
    parts.push(part);
  }

  return parts;
};
export default divideIntoWeightedParts;
