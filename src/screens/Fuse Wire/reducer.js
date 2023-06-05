import db from '../../firebase/database';
import {stateGenerator} from '../../utilities/FuseWire';

export const ACTIONS = {
  INIT_LEVEL: 'init_level',
  SET_FUSEHOLDER: 'set_fuseholder',
  RESET_FUSEHOLDER: 'reset_fuseholder',
  ON_CHECK: 'on_check',
  GAME_OVER: 'game_over',
};

// const updateLevelPass = (state, uid) => {
//   const GameRef = db.ref(`/users/${uid}/MemoryMatrix/`);
//   let level =
//     state.level === gameRoundData[gameRoundData.length - 1].level
//       ? state.level
//       : state.level + 1;

//   GameRef.update({
//     level: level,
//     score: state.score,
//   });
// };
const updateLevelFail = (state, uid) => {
  const GameRef = db.ref(`/users/${uid}/MemoryMatrix/`);
  const newAttempt = {
    level: state.level,
    matrix: state.matrix,
    userMatrix: state.userMatrix,
    status: 'FAILED',
  };
  GameRef.child('attempts').push(newAttempt);
  GameRef.update({
    score: state.score,
  });
};

// const updateLives = (lives, uid) => {
//   const GameRef = db.ref(`/users/${uid}/MemoryMatrix/`);
//   GameRef.update({
//     lives: lives,
//   });
// };

// const updateStatus = uid => {
//   const GameRef = db.ref(`/users/${uid}/MemoryMatrix/`);
//   GameRef.update({
//     status: 'COMPLETED',
//   });
// };

export function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.INIT_LEVEL:
      return {
        ...stateGenerator(action.payload.level),
        lives: action.payload.lives,
      };

    case ACTIONS.ON_CHECK:
      const result = action.payload.result;
      if (result) {
        return {
          ...state,
          ...stateGenerator(state.level + 1),
        };
      }
      return {
        ...state,
        lives: state.lives - 1,
      };

    case ACTIONS.SET_FUSEHOLDER:
      var newState = {...state};
      var {currentFuseHolderId, id, value} = action.payload;
      if (currentFuseHolderId !== null) {
        newState.fuseHolders[id].isBlank = true;
        newState.fuseHolders[id].inputValue = null;
      }
      newState.fuseHolders[id].isBlank = false;
      newState.fuseHolders[id].inputValue = value;
      return newState;

    case ACTIONS.RESET_FUSEHOLDER:
      var newState = {...state};
      var {currentFuseHolderId} = action.payload;
      newState.fuseHolders[currentFuseHolderId].isBlank = true;
      newState.fuseHolders[currentFuseHolderId].inputValue = null;
      console.log(currentFuseHolderId, 'id');
      console.log(newState, 'newState');
      return newState;

    // case ACTIONS.GAME_OVER:
    //   updateStatus(uid);
    //   return state;

    default:
      return state;
  }
}
