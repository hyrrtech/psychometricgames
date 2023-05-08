import {newColorSetGenerator} from '../../utilities/Color Match';
import {colors} from './initialState';
export const ACTIONS = {
  NEXT_COLOR_SET: 'next_color_set',
  ON_TIME_UP: 'time_up',
};

export function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.NEXT_COLOR_SET:
      const correct = action.payload.correct;
      const newState = {...state};
      newState.score = correct ? newState.score + 1 : newState.score - 1;
      newState.colorSet = newColorSetGenerator(colors);
      return newState;

    default:
      return state;
  }
}
