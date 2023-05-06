import {
  maxScore,
  divideIntoWeightedParts,
  balloonPopPoint,
  randomPoint,
} from '../../utilities/BART';
const BALLOON_PUMP_ANIMATION_TIME = 700;
const BALLOON_FLYAWAY_ANIMATION_TIME = 1500;

//pivot point
const HIGH_RISK_START_POINT = 4;
const HIGH_RISK_END_POINT = 6;
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
const POP_POINT = balloonPopPoint(HIGH_RISK_POINT + 2, NUMBER_OF_WEIGHTS);
const SCORE_RANGE = divideIntoWeightedParts(
  MAX_SCORE,
  NUMBER_OF_WEIGHTS,
  HIGH_RISK_POINT,
  DIVIDE_WEIGHTAGE,
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
};

//generate data as per level (needs changes, rn only generates data randomly and not level wise)

// const getNewState = level => {
//   //based on level
//   return {
//     maxScore: maxScore(MAX_SCORE_RANGE),
//     pop_point: balloonPopPoint(HIGH_RISK_POINT + 2, NUMBER_OF_WEIGHTS),
//     score_range: divideIntoWeightedParts(
//       MAX_SCORE,
//       NUMBER_OF_WEIGHTS,
//       HIGH_RISK_POINT,
//       DIVIDE_WEIGHTAGE,
//     ),
//   };
// };

export {
  BALLOON_PUMP_ANIMATION_TIME,
  BALLOON_FLYAWAY_ANIMATION_TIME,
  initialState,
  HIGH_RISK_POINT,
  NUMBER_OF_WEIGHTS,
  // getNewState,
};
