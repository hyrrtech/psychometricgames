import {generateMatrix} from '../../utilities/SHARK';

export const ResultAnimationTime = 350;
const initialRows = 5;
const initialCols = 3;
const initialEmptyProb = 0.5;
const time = {minutes: 1, seconds: 30};

const initialState = {
  rows: initialRows,
  cols: initialCols,
  emptyProb: initialEmptyProb,
  matrix: generateMatrix(initialRows, initialCols, initialEmptyProb),
  total_rounds_played: 0,
  correct_guesses: 0,
  wrong_guesses: 0,
  status: 'IN_PROGRESS',
  time: time,
};

export default initialState;
