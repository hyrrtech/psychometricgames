import db from '../../firebase/database';
import {stateGenerator, mapData} from '../../utilities/Pirate Passage';

export const ACTIONS = {
  HANDLE_UNDO: 'handle_undo',
  HANDLE_GO: 'handle_go',
};

export function reducer(state, action) {
  switch (action.type) {
    // case ACTIONS.INIT_LEVEL:
    //   return {
    //     ...stateGenerator(action.payload.level),
    //     lives: action.payload.lives,
    //   };

    default:
      return state;
  }
}
