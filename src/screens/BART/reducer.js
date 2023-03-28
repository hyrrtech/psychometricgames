import balloon_pump from '../../assets/sounds/balloon_pump.wav';
import {PlaySound} from '../../utilities/PlaySound';
import {HIGH_RISK_POINT, NUMBER_OF_WEIGHTS} from './initialState';
import {balloonPopPoint} from '../../utilities/BART';
import db from '../../firebase/database';

export const ACTIONS = {
  PUMP: 'pump',
  POP_ON_PUMP: 'pop_on_pump',
  NEXT_LEVEL: 'next_level',
};

const updateBartData = (state, uid) => {
  const BARTRef = db.ref(`/users/${uid}/BART/`);
  const newAttempt = {
    score: state.curr_score,
    pumpCount: state.pumpCount,
    level: state.level,
    pop_point: state.pop_point,
  };
  BARTRef.child('attempts').push(newAttempt);
  BARTRef.update({
    level: state.level === state.totalLevels ? state.level : state.level + 1,
    totalScore: state.totalScore,
    status: state.status,
  });
};

export function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.PUMP:
      PlaySound(balloon_pump);
      return {
        ...state,
        pumpCount: state.pumpCount + 1,
        curr_score:
          state.curr_score + Math.floor(state.score_range[state.pumpCount + 1]),
      };

    case ACTIONS.POP_ON_PUMP:
      return {...state, showPopped: true};

    case ACTIONS.NEXT_LEVEL:
      const newState = {
        ...state,
        level: state.level + 1,
        curr_score: 0,
        pumpCount: 0,
        pop_point: balloonPopPoint(HIGH_RISK_POINT + 2, NUMBER_OF_WEIGHTS),
        showPopped: false,
      };
      if (newState.level === newState.totalLevels) {
        newState.status = 'COMPLETED';
      }

      if (state.pumpCount + 1 !== state.pop_point) {
        const newState1 = {
          ...newState,
          totalScore: state.totalScore + state.curr_score,
        };
        if (
          action.payload.level &&
          action.payload.totalScore &&
          action.payload.score_range
        ) {
          newState1.score_range = action.payload.score_range;
          newState1.totalScore = action.payload.totalScore;
          newState1.level = action.payload.level; //db only stores the last completed level so continue from next level
        } else {
          updateBartData(
            {
              ...newState1,
              pop_point: state.pop_point,
              pumpCount: state.pumpCount,
              level: state.level,
              curr_score: state.curr_score,
            },
            action.payload.uid,
          );
        }
        return newState1;
      }
      updateBartData(
        {
          ...newState,
          pop_point: state.pop_point,
          pumpCount: state.pumpCount + 1,
          level: state.level,
        },
        action.payload.uid,
      );
      return newState;

    default:
      return state;
  }
}
