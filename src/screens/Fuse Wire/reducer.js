import db from '../../firebase/database';
import {gameRoundData} from '../../utilities/FuseWire';

export const ACTIONS = {
  INIT_LEVEL: 'init_level',
  SET_FUSEHOLDER: 'set_fuseholder',
  RESET_FUSEHOLDER: 'reset_fuseholder',
  ON_CHECK: 'on_check',
  GAME_OVER: 'game_over',
};

const addData = (uid, state, levelCleared) => {
  const GameRef = db.ref(`/users/${uid}/FuseWire/`);
  const newAttempt = {
    level: state.level,
    valueTimeArray: state.valueTimeArray,
    startTime: state.startTime,
    levelCleared,
    timeTaken: Date.now() - state.startTime,
  };
  GameRef.child('attempts').push(newAttempt);
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
  let newState = {...state};
  switch (action.type) {
    case ACTIONS.INIT_LEVEL:
      return {
        ...action.payload.state,
        lives: action.payload.lives,
      };

    case ACTIONS.SET_FUSEHOLDER:
      var {currentFuseHolderId, id, value, initiallyBlank} = action.payload;
      // console.log(initiallyBlank, currentFuseHolderId);
      if (currentFuseHolderId !== null && initiallyBlank) {
        newState.fuseHolders[currentFuseHolderId].isBlank = true;
        newState.fuseHolders[currentFuseHolderId].inputValue = null;
      }
      newState.fuseHolders[id].isBlank = false;
      newState.fuseHolders[id].inputValue = value;
      newState.valueTimeArray = [
        ...newState.valueTimeArray,
        {
          value: value,
          time: Date.now() - state.startTime,
          fuseHolderPosition: id,
        },
      ];
      return newState;

    case ACTIONS.RESET_FUSEHOLDER:
      var {currentFuseHolderId} = action.payload;

      newState.fuseHolders[currentFuseHolderId].isBlank = true;
      newState.fuseHolders[currentFuseHolderId].inputValue = null;
      return newState;

    case ACTIONS.ON_CHECK:
      const result = action.payload.result;
      addData(action.payload.uid, state, result);
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
