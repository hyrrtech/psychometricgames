import db from '../../firebase/database';

import {gameRoundData, stateGenerator} from '../../utilities/Memory Matrix';
export const ACTIONS = {
  INIT_LEVEL: 'init_level',
  ON_TAP: 'on_tap',
  FAIL: 'fail,',
  NEXT_LEVEL: 'next_level',
  GAME_OVER: 'game_over',
};

const updateLevelPass = (state, uid) => {
  const GameRef = db.ref(`/users/${uid}/MemoryMatrix/`);
  let level =
    state.level === gameRoundData[gameRoundData.length - 1].level
      ? state.level
      : state.level + 1;

  const newAttempt = {
    level: state.level,
    matrix: state.matrix,
    status: 'PASSED',
  };
  GameRef.child('attempts').push(newAttempt);
  GameRef.update({
    level: level,
    score: state.score,
  });
};
const updateLevelFail = (state, uid) => {
  const GameRef = db.ref(`/users/${uid}/MemoryMatrix/`);
  const newAttempt = {
    level: state.level,
    matrix: state.matrix,
    status: 'FAILED',
  };
  GameRef.child('attempts').push(newAttempt);
  GameRef.update({
    score: state.score,
  });
};

const updateLives = (lives, uid) => {
  const GameRef = db.ref(`/users/${uid}/MemoryMatrix/`);
  GameRef.update({
    lives: lives,
  });
};

const updateStatus = uid => {
  const GameRef = db.ref(`/users/${uid}/MemoryMatrix/`);
  GameRef.update({
    status: 'COMPLETED',
  });
};

export function reducer(state, action) {
  const {uid, rowIndex, colIndex} = action.payload;
  switch (action.type) {
    case ACTIONS.ON_TAP:
      //get seleted tile
      let tile = state.matrix[rowIndex][colIndex];

      //check if tile was already tapped or remaining click count is 0, if so do nothing
      if (tile.isSelected || state.remainingClickCount === 0) return state;
      tile.isSelected = true;

      let newState = {...state};

      newState.remainingClickCount--;

      //check if the tile clicked was the last one with the correct answer
      if (
        state.remainingClickCount === 1 &&
        tile.isCorrect &&
        state.rightAnswerCount === state.correctTileCount - 1
      ) {
        tile.isLastClick = true;
      }

      newState.matrix[rowIndex][colIndex] = tile;

      //check if tile tapped was the one with the correct answer
      if (tile.isCorrect) {
        newState.rightAnswerCount++;
        newState.score += 100;
      } else {
        newState.score -= 50;
      }
      return newState;

    case ACTIONS.FAIL:
      updateLevelFail(state, uid);
      let lives = state.lives;
      lives--;
      updateLives(lives, uid);
      let failState = stateGenerator(state.level);
      failState.lives = lives;
      failState.score = state.score;
      return failState;

    case ACTIONS.NEXT_LEVEL:
      updateLevelPass(state, uid);
      let level = state.level;
      level++;
      let nextLevelState = stateGenerator(level);
      nextLevelState.lives = state.lives;
      nextLevelState.score = state.score;
      return nextLevelState;

    case ACTIONS.INIT_LEVEL:
      let curr_state = stateGenerator(action.payload.level);
      curr_state.lives = action.payload.lives;
      curr_state.score = action.payload.score;
      return curr_state;

    case ACTIONS.GAME_OVER:
      updateStatus(uid);
      return state;

    default:
      return state;
  }
}
