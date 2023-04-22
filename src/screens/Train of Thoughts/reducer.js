import db from '../../firebase/database';
import {stateGenerator, time} from '../../utilities/Kill the Spider';

export const ACTIONS = {
  ON_TAP: 'on_tap',
  ON_TIME_UP: 'time_up',
  ON_BUTTERFLY_TAP: 'butterfly_tap',
};

const updateDB = (state, uid, status) => {
  const GameRef = db.ref(`/users/${uid}/KillTheSpider/`);
  GameRef.update({
    time: time,
    score: state.score,
    killCount: state.killCount,
    status: status,
  });
};

export function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.ON_TAP:
      const score = state.score + 100;
      const killCount = state.killCount + 1;
      return {...stateGenerator(), score: score, killCount: killCount};

    case ACTIONS.ON_TIME_UP:
      updateDB(state, action.payload.uid, 'TIME_UP');
      return state;

    case ACTIONS.ON_BUTTERFLY_TAP:
      updateDB(state, action.payload.uid, 'BUTTERFLY_KILLED');
      return state;
    default:
      return state;
  }
}
