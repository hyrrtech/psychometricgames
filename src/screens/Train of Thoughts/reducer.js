import db from '../../firebase/database';
import {gameRoundData, stateGenerator} from '../../utilities/Train of Thoughts';
// import {stateGenerator, time} from '../../utilities/Kill the Spider';

export const ACTIONS = {
  ON_REACH_STATION: 'on_reach_station',
  ON_TIME_UP: 'on_time_up',
  NEXT_LEVEL: 'next_level',
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

    case ACTIONS.NEXT_LEVEL:
      var newState = stateGenerator(state.level + 1);
      newState.score = state.score;
      return newState;

    default:
      return state;
  }
}
