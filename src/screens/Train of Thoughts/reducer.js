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
    intendedStation: data.intendedStation,
    stationReached: data.stationReached,
    departureTime: data.departureTime,
    arrivalTime: data.arrivalTime,
    pathFollowed: data.pathFollowed,
  };
  GameRef.child('trains').push(trainData);
};
export function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.INIT_LEVEL:
      var newState = initialState;
      return newState;

    case ACTIONS.ON_REACH_STATION:
      const {
        intendedStation,
        stationReached,
        departureTime,
        arrivalTime,
        pathFollowed,
      } = action.payload;
      var newState = {...state};
      if (intendedStation === stationReached) {
        newState.correctStations += 1;
        newState.score += 50;
      } else {
        newState.incorrectStations += 1;
        newState.score -= 50;
      }
      updateTrain(
        {
          intendedStation,
          stationReached,
          departureTime,
          arrivalTime,
          pathFollowed,
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
