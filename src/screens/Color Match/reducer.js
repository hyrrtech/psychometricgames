import {newColorSetGenerator} from '../../utilities/Color Match';
import {colors, time} from './initialState';
import db from '../../firebase/database';
export const ACTIONS = {
  NEXT_COLOR_SET: 'next_color_set',
  ON_TIME_UP: 'time_up',
};
const updateDB = (uid, state) => {
  const GameRef = db.ref(`/users/${uid}/ColorMatch/`);
  GameRef.update({
    total_rounds_played: state.total_rounds_played,
    correct_guesses: state.correct,
    wrong_guesses: state.incorrect,
    status: 'COMPLETED',
    time: time,
  });
};

export function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.NEXT_COLOR_SET:
      const correct = action.payload.correct;
      const newState = {...state};
      newState.total_rounds_played += 1;
      if (correct) {
        newState.correct = newState.correct + 1;
        newState.score += 1;
      } else {
        newState.incorrect = newState.incorrect + 1;
        newState.score -= 1;
      }
      newState.colorSet = newColorSetGenerator(colors);
      return newState;

    case ACTIONS.ON_TIME_UP:
      updateDB(action.payload.uid, state);
      return state;

    default:
      return state;
  }
}
