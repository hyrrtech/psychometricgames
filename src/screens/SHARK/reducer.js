import db from '../../firebase/database';
import {generateMatrix, generateOddNumber} from '../../utilities/SHARK';

export const ACTIONS = {
  NEXT_LEVEL: 'next_level',
  ON_TIME_UP: 'on_time_up',
};

const updateDB = (state, uid) => {
  const GameRef = db.ref(`/users/${uid}/SHARK/`);
  GameRef.update({
    total_rounds_played: state.total_rounds_played,
    correct_guesses: state.correct_guesses,
    wrong_guesses: state.wrong_guesses,
    status: state.status,
    time: state.time,
  });
};

export function reducer(state, action) {
  const {correct, uid} = action.payload;
  switch (action.type) {
    case ACTIONS.NEXT_LEVEL:
      const rows = generateOddNumber(3, 7);
      const cols = generateOddNumber(3, 5);
      const newState = {
        ...state,
        matrix: generateMatrix(rows, cols),
        rows: rows,
        cols: cols,
        total_rounds_played: state.total_rounds_played + 1,
        correct_guesses: correct
          ? state.correct_guesses + 1
          : state.correct_guesses,
        wrong_guesses: correct ? state.wrong_guesses : state.wrong_guesses + 1,
      };
      updateDB(newState, uid);
      return newState;

    case ACTIONS.ON_TIME_UP:
      const onTimeUpState = {...state, status: 'COMPLETED'};
      updateDB(onTimeUpState, uid);
      return onTimeUpState;

    default:
      return state;
  }
}
