import {newColorSetGenerator} from '../../utilities/Color Match';
import {colors} from './initialState';
import db from '../../firebase/database';
export const ACTIONS = {
  NEXT_COLOR_SET: 'next_color_set',
  ON_TIME_UP: 'time_up',
};
const updateDB = (uid, state) => {
  const GameRef = db.ref(`/users/${uid}/ColorMatch/`);
  GameRef.update({
    roundsResult: state.roundsResult,
    status: 'COMPLETED',
    time: state.time,
  });
};

export function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.NEXT_COLOR_SET:
      const correct = action.payload.correct;
      const newState = {...state};
      newState.roundsResult = [...newState.roundsResult, correct];
      correct ? (newState.score += 1) : (newState.score -= 1);
      newState.colorSet = newColorSetGenerator(colors);
      console.log(newState);
      return newState;

    case ACTIONS.ON_TIME_UP:
      updateDB(action.payload.uid, state);
      return state;

    default:
      return state;
  }
}
