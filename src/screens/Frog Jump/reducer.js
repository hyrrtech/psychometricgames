// import db from '../../firebase/database';

// export const ACTIONS = {
//   DISABLE_LILLIPAD: 'disable-lillipad',
//   SET_CURRENT_LEADER_FROG_POSITION: 'set-current-leader-frog-position',
//   SET_NUMBER_OF_JUMPS_BY_FOLLOWER_FROG: 'set-number-of-jumps-by-follower-frog',
//   SET_CURRENT_AND_FUTURE_FOLLOWER_FROG_POSITIONS:
//     'set-current-and-future-follower-frog-positions',
//   SET_LEADER_FROG_POSITION: 'set-leader-frog-position',
//   SET_FOLLOWER_FROG_POSITION: 'set-follower-frog-position',
// };

// // const updateDB = (state, uid, status) => {
// //   const GameRef = db.ref(`/users/${uid}/KillTheSpider/`);
// //   GameRef.update({
// //     time: time,
// //     score: state.score,
// //     killCount: state.killCount,
// //     status: status,
// //   });
// // };

// export function reducer(state, action) {
//   switch (action.type) {
//     case ACTIONS.DISABLE_LILLIPAD:
//       return {
//         ...state,
//         disabled: action.payload,
//       };

//     case ACTIONS.SET_CURRENT_LEADER_FROG_POSITION:
//       return {
//         ...state,
//         currentLeaderFrogPosition: action.payload,
//       };

//     case ACTIONS.SET_NUMBER_OF_JUMPS_BY_FOLLOWER_FROG:
//       return {
//         ...state,
//         numberOfJumpsByFollowerFrog: state.numberOfJumpsByFollowerFrog + 1,
//       };

//     case ACTIONS.SET_CURRENT_AND_FUTURE_FOLLOWER_FROG_POSITIONS:
//       const {currentAndFutureFollowerFrogPositions} = state;
//       currentAndFutureFollowerFrogPositions.push(action.payload);
//       return {
//         ...state,
//         currentAndFutureFollowerFrogPositions,
//       };

//     case ACTIONS.SET_FOLLOWER_FROG_POSITION:
//       return {
//         ...state,
//         followerFrogPosition: action.payload,
//       };

//     case ACTIONS.SET_LEADER_FROG_POSITION:
//       const newPositions = generateSetOfLeaderFrogPositions(
//         state.currentLeaderFrogPosition,
//         state.currentAndFutureFollowerFrogPositions,
//         state.lillipadPositions,
//         state.numberOfJumpsByFollowerFrog % 5 === 0 ? 2 : 1,
//       );
//       const indexesOfNewPositions = newPositions.map(item => item.id);
//       const leaderFrogPositionHistory = [
//         ...state.leaderFrogPositionHistory,
//         ...indexesOfNewPositions,
//       ];
//       return {
//         ...state,
//         leaderFrogPosition: newPositions,
//         leaderFrogPositionHistory: leaderFrogPositionHistory,
//       };
//     default:
//       return state;
//   }
// }
