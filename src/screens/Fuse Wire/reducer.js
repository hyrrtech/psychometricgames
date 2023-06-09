import db from '../../firebase/database';
import {gameRoundData} from '../../utilities/FuseWire';

export const ACTIONS = {
  INIT_LEVEL: 'init_level',
  SET_FUSEHOLDER: 'set_fuseholder',
  RESET_FUSEHOLDER: 'reset_fuseholder',
  ON_CHECK: 'on_check',
  GAME_OVER: 'game_over',
};

const updateLevel = (state, uid) => {
  const GameRef = db.ref(`/users/${uid}/FuseWire/`);
  let level =
    state.level === gameRoundData[gameRoundData.length - 1].level
      ? state.level
      : state.level + 1;

  GameRef.update({
    level: level,
  });
};

const updateLives = (lives, uid) => {
  const GameRef = db.ref(`/users/${uid}/FuseWire/`);
  GameRef.update({
    lives: lives,
  });
};

const updateStatus = uid => {
  const GameRef = db.ref(`/users/${uid}/FuseWire/`);
  GameRef.update({
    status: 'COMPLETED',
  });
};

export function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.INIT_LEVEL:
      return {
        ...action.payload.state,
        lives: action.payload.lives,
      };

    case ACTIONS.SET_FUSEHOLDER:
      var newState = {...state};
      var {currentFuseHolderId, id, value} = action.payload;
      if (currentFuseHolderId !== null) {
        newState.fuseHolders[currentFuseHolderId].isBlank = true;
        newState.fuseHolders[currentFuseHolderId].inputValue = null;
      }
      newState.fuseHolders[id].isBlank = false;
      newState.fuseHolders[id].inputValue = value;
      return newState;

    case ACTIONS.RESET_FUSEHOLDER:
      var newState = {...state};
      var {currentFuseHolderId} = action.payload;
      newState.fuseHolders[currentFuseHolderId].isBlank = true;
      newState.fuseHolders[currentFuseHolderId].inputValue = null;
      return newState;

    case ACTIONS.ON_CHECK:
      const result = action.payload.result;
      if (result) {
        updateLevel(state, action.payload.uid);
        return {
          ...state,
          ...action.payload.nextLevelState,
        };
      }
      updateLives(state.lives - 1, action.payload.uid);
      return {
        ...state,
        lives: state.lives - 1,
      };

    case ACTIONS.GAME_OVER:
      updateStatus(action.payload.uid);
      return state;

    default:
      return state;
  }
}
