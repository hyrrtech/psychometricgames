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
    level: state.level,
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
      if (state.pumpCount + 1 !== state.pop_point) {
        const newState = {
          ...state,
          // ...getNewState(),
          totalScore: state.totalScore + state.curr_score,
          level: state.level + 1,
          curr_score: 0,
          pumpCount: 0,
          pop_point: balloonPopPoint(HIGH_RISK_POINT + 2, NUMBER_OF_WEIGHTS), //remove this after using getNewState
        };
        if (action.payload.level && action.payload.totalScore) {
          newState.totalScore = action.payload.totalScore;
          newState.level = action.payload.level + 1; //db only stores the last completed level so continue from next level
        }
        if (newState.level === newState.totalLevels) {
          newState.status = 'COMPLETED';
        }
        updateBartData(
          {
            ...newState,
            pumpCount: state.pumpCount,
            level: state.level,
            curr_score: state.curr_score,
          },
          action.payload.uid,
        );
        return newState;
      }
      const newState = {
        ...state,
        // ...getNewState(),
        level: state.level + 1,
        curr_score: 0,
        pumpCount: 0,
        showPopped: false,
        pop_point: balloonPopPoint(HIGH_RISK_POINT + 2, NUMBER_OF_WEIGHTS), //remove this after using getNewState
      };
      if (newState.level === newState.totalLevels) {
        newState.status = 'COMPLETED';
      }
      updateBartData(
        {
          ...newState,
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
