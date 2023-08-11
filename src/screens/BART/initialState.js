import {
  maxScore,
  divideIntoWeightedParts,
  randomPoint,
  getColor,
} from '../../utilities/BART';
const BALLOON_PUMP_ANIMATION_TIME = 700;
const BALLOON_FLYAWAY_ANIMATION_TIME = 1500;
const COLORS = {
  low: '#ffca28',
  medium: '#f44030',
  high: '#1b1f23',
};

//pivot point
const HIGH_RISK_START_POINT = 4;
const HIGH_RISK_END_POINT = 7;
const HIGH_RISK_POINT = randomPoint(HIGH_RISK_START_POINT, HIGH_RISK_END_POINT);

//adjust weightage before and after pivot point
const DIVIDE_WEIGHTAGE = 2;

//number of parts to divide the max score
const MIN_WEIGHTS = 8;
const MAX_WEIGHTS = 12;
const NUMBER_OF_WEIGHTS = randomPoint(MIN_WEIGHTS, MAX_WEIGHTS);

//generate a maximum achievable score per level for specific user(fixed for each level for now)
const MAX_SCORE_RANGE = [1000, 2000, 3000];
const MAX_SCORE = maxScore(MAX_SCORE_RANGE);

//max levels
const MAX_LEVEL = 10;
const POP_POINT = randomPoint(HIGH_RISK_POINT, NUMBER_OF_WEIGHTS);
const SCORE_RANGE = divideIntoWeightedParts(
  MAX_SCORE,
  NUMBER_OF_WEIGHTS,
  HIGH_RISK_POINT,
  DIVIDE_WEIGHTAGE,
);

const BALLOON_COLOR = getColor(
  COLORS,
  HIGH_RISK_START_POINT,
  POP_POINT,
  NUMBER_OF_WEIGHTS,
);

const initialState = {
  showPopped: false,
  max_score_per_level: MAX_SCORE,
  pumpCount: 0,
  curr_score: 0,
  status: 'IN_PROGRESS',
  level: 1,
  totalLevels: MAX_LEVEL,
  totalScore: 0,
  DIVIDE_WEIGHTAGE: DIVIDE_WEIGHTAGE,
  pop_point: POP_POINT,
  score_range: SCORE_RANGE,
  number_of_weights: NUMBER_OF_WEIGHTS,
  balloon_color: BALLOON_COLOR,
};

export {
  BALLOON_PUMP_ANIMATION_TIME,
  BALLOON_FLYAWAY_ANIMATION_TIME,
  initialState,
  HIGH_RISK_POINT,
  NUMBER_OF_WEIGHTS,
  COLORS,
  HIGH_RISK_END_POINT,
  HIGH_RISK_START_POINT,
  // getNewState,
};
