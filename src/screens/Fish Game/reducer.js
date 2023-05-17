import db from '../../firebase/database';
export const ACTIONS = {
  NEXT_COLOR_SET: 'next_color_set',
  ON_TIME_UP: 'time_up',
};
// const updateDB = (uid, state) => {
//   const GameRef = db.ref(`/users/${uid}/ColorMatch/`);
//   GameRef.update({
//     roundsResult: state.roundsResult,
//     status: 'COMPLETED',
//     time: state.time,
//   });
// };

export function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.NEXT_COLOR_SET:
      return state;

    default:
      return state;
  }
}
