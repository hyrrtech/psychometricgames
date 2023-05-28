import db from '../../firebase/database';
import initialState from './initialState';

export const ACTIONS = {
  ON_REACH_STATION: 'on_reach_station',
  ON_TIME_UP: 'on_time_up',
  INIT_LEVEL: 'init_level',
};

const updateDB = (state, uid) => {
  const GameRef = db.ref(`/users/${uid}/TrainOfThoughts/`);
  GameRef.update({
    score: state.score,
    status: 'COMPLETED',
    correctStations: state.correctStations,
    incorrectStations: state.incorrectStations,
  });
};

const updateTrain = (data, uid) => {
  const GameRef = db.ref(`/users/${uid}/TrainOfThoughts/`);
  const trainData = {
    departureTime: data.departureTime,
    arrivalTime: data.arrivalTime,
    pathFollowed: data.pathFollowed,
    correctPath: data.correctPath,
  };
  GameRef.child('trains').push(trainData);
};
export function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.INIT_LEVEL:
      var newState = initialState;
      return newState;

    case ACTIONS.ON_REACH_STATION:
      const {departureTime, arrivalTime, pathFollowed, correctPath} =
        action.payload;
      var newState = {...state};
      if (
        pathFollowed[pathFollowed.length - 1] ===
        correctPath[correctPath.length - 1]
      ) {
        newState.correctStations += 1;
        newState.score += 50;
      } else {
        newState.incorrectStations += 1;
        newState.score -= 50;
      }
      updateTrain(
        {
          departureTime,
          arrivalTime,
          pathFollowed,
          correctPath,
        },
        action.payload.uid,
      );

      return newState;

    case ACTIONS.ON_TIME_UP:
      updateDB(state, action.payload.uid);
      return state;

    default:
      return state;
  }
}
