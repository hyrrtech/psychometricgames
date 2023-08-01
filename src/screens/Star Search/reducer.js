// import db from '../../firebase/database';
import {stateGenerator} from '../../utilities/Star Search';

export const ACTIONS = {
  ON_TAP: 'on_tap',
  ON_LEVEL_COMPLETE: 'on_level_complete',
};

export function reducer(state, action) {
  let newState = {...state};
  switch (action.type) {
    case ACTIONS.ON_LEVEL_COMPLETE:
      newState = stateGenerator(state.level + 1);
      newState.score = state.score;
      return newState;

    case ACTIONS.ON_TAP:
      const {isCorrect} = action.payload;
      newState = stateGenerator(state.level);

      newState.score = state.score;
      newState.currentRound = state.currentRound + 1;

      if (isCorrect) {
        newState.score += state.scorePayload;
      } else {
        newState.score -= state.scorePayload;
      }

      return newState;

    default:
      return state;
  }
}
