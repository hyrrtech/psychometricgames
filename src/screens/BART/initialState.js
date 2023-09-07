import {
  maxScore,
  divideIntoWeightedParts,
  createBalloonArray,
} from '../../utilities/BART';
const BALLOON_PUMP_ANIMATION_TIME = 700;
const BALLOON_FLYAWAY_ANIMATION_TIME = 1500;
const COLORS = {
  low: '#ffca28',
  medium: '#f44030',
  high: '#1b1f23',
};

const DIVIDE_WEIGHTAGE = 2;
const MAX_LEVEL = 10;

const MAX_PUMPS = [9, 12, 15];
const NUMBER_OF_WEIGHTS =
  MAX_PUMPS[Math.floor(Math.random() * MAX_PUMPS.length)];

const MAX_SCORE_RANGE = [1000, 2000, 3000];
const MAX_SCORE = maxScore(MAX_SCORE_RANGE);

const SCORE_RANGE = divideIntoWeightedParts(
  MAX_SCORE,
  NUMBER_OF_WEIGHTS,
  NUMBER_OF_WEIGHTS * 0.4,
  DIVIDE_WEIGHTAGE,
);

const DATA = createBalloonArray(MAX_LEVEL, NUMBER_OF_WEIGHTS);

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
  score_range: SCORE_RANGE,
  number_of_weights: NUMBER_OF_WEIGHTS,
  ...DATA[0],
  data: DATA,
};

export {
  BALLOON_PUMP_ANIMATION_TIME,
  BALLOON_FLYAWAY_ANIMATION_TIME,
  initialState,
  NUMBER_OF_WEIGHTS,
  COLORS,
  DATA,
};
