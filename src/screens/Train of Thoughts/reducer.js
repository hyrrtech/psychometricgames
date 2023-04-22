import db from '../../firebase/database';
import {gameRoundData, stateGenerator} from '../../utilities/Train of Thoughts';

export const ACTIONS = {
  ON_REACH_STATION: 'on_reach_station',
  ON_TIME_UP: 'on_time_up',
  NEXT_LEVEL: 'next_level',
  INIT_LEVEL: 'init_level',
};

const updateDB = (state, uid) => {
  const GameRef = db.ref(`/users/${uid}/TrainOfThoughts/`);
  const level = {
    level: state.level,
    correctStations: state.correctStations,
    incorrectStations: state.incorrectStations,
  };
  GameRef.child('levels').push(level);
  GameRef.update({
    score: state.score,
    level: state.level,
    status:
      state.level === gameRoundData[gameRoundData.length - 1].level
        ? 'COMPLETED'
        : 'IN_PROGRESS',
  });
};

export function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.INIT_LEVEL:
      const {level, score} = action.payload;
      var newState = stateGenerator(level);
      newState.score = score;
      return newState;

    case ACTIONS.ON_REACH_STATION:
      const {intendedStation, stationReached} = action.payload;
      var newState = {...state};
      if (intendedStation === stationReached) {
        newState.correctStations += 1;
        newState.score += 50;
      } else {
        newState.incorrectStations += 1;
        newState.score -= 50;
      }
      return newState;

    case ACTIONS.ON_TIME_UP:
      const {uid} = action.payload;
      updateDB(state, uid);
      return state;

    case ACTIONS.NEXT_LEVEL:
      console.log(state.level);
      var newState = stateGenerator(state.level + 1);
      console.log(newState);
      newState.score = state.score;
      return newState;

    default:
      return state;
  }
}
