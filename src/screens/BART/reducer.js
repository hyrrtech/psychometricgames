import {HIGH_RISK_POINT} from './initialState';
import {balloonPopPoint} from '../../utilities/BART';
import db from '../../firebase/database';

export const ACTIONS = {
  PUMP: 'pump',
  POP_ON_PUMP: 'pop_on_pump',
  NEXT_LEVEL: 'next_level',
};

const updateBartData = (state, uid) => {
  const GameRef = db.ref(`/users/${uid}/BART/`);
  const newAttempt = {
    score: state.curr_score,
    pumpCount: state.pumpCount,
    level: state.level,
    pop_point: state.pop_point,
  };
  GameRef.child('attempts').push(newAttempt);
  GameRef.update({
    level: state.level === state.totalLevels ? state.level : state.level + 1,
    totalScore: state.totalScore,
    status: state.status,
  });
};

export function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.PUMP:
      return {
        ...state,
        pumpCount: state.pumpCount + 1,
        curr_score:
          state.curr_score + Math.floor(state.score_range[state.pumpCount + 1]),
      };

    case ACTIONS.POP_ON_PUMP:
      return {...state, showPopped: true}; //test changing curr_score=0

    case ACTIONS.NEXT_LEVEL: //old implementation
      const newState = {
        ...state,
        level: state.level + 1,
        curr_score: 0,
        pumpCount: 0,
        pop_point: balloonPopPoint(
          HIGH_RISK_POINT + 2,
          state.number_of_weights,
        ),
        showPopped: false,
      };
      if (state.level >= state.totalLevels) {
        newState.status = 'COMPLETED';
      }

      if (state.pop_point > state.pumpCount) {
        const newState1 = {
          ...newState,
          totalScore: state.totalScore + state.curr_score,
        };
        if (
          action.payload.level &&
          action.payload.totalScore &&
          action.payload.score_range &&
          action.payload.number_of_weights
        ) {
          newState1.score_range = action.payload.score_range;
          newState1.totalScore = action.payload.totalScore;
          newState1.level = action.payload.level;
          newState1.number_of_weights = action.payload.number_of_weights;
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
      } else {
        updateBartData(
          {
            ...newState,
            pop_point: state.pop_point,
            pumpCount: state.pumpCount,
            level: state.level,
          },
          action.payload.uid,
        );
        return newState;
      }

    default:
      return state;
  }
}
