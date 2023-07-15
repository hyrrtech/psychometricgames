import db from '../../firebase/database';
import {stateGenerator} from '../../utilities/Fish Game';

export const ACTIONS = {
  ON_FED: 'on_fed',
  NEXT_LEVEL: 'next_level',
  DECREASE_LIVES: 'decrease_lives',
  GAME_OVER: 'game_over',
};

export function reducer(state, action) {
  let newState = {...state};
  switch (action.type) {
    case ACTIONS.ON_FED:
      newState.baitCount = newState.baitCount - 1;
      return newState;
    case ACTIONS.NEXT_LEVEL:
      newState = stateGenerator(newState.level + 1);
      return newState;
    case ACTIONS.DECREASE_LIVES:
      newState.lives = newState.lives - 1;
      return newState;
    case ACTIONS.GAME_OVER:
      return newState;

    default:
      return state;
  }
}
