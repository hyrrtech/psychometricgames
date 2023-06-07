import db from '../../firebase/database';
import {
  stateGenerator,
  mapData,
  getShortestPath,
  generateShipPathComponentsAndCoordinates,
} from '../../utilities/Pirate Passage';

export const ACTIONS = {
  ADD_PATH: 'add_path',
  UNDO: 'undo',
  GO: 'go',
};

export function reducer(state, action) {
  let newState = {...state};
  switch (action.type) {
    // case ACTIONS.INIT_LEVEL:
    //   return {
    //     ...stateGenerator(action.payload.level),
    //     lives: action.payload.lives,
    //   };

    case ACTIONS.ADD_PATH:
      const {tileIndex} = action.payload;
      var prevIndexes = newState.shipPathIndexes.indexes;
      var prev_number_of_indexes_added =
        newState.shipPathIndexes.number_of_indexes_added;
      let nextPath = getShortestPath(
        state.matrix,
        prevIndexes[prevIndexes.length - 1],
        tileIndex,
      );

      if (nextPath.length === 0) {
        return newState;
      }
      nextPath.splice(0, 1);
      const length_of_new_path_indexes = nextPath.length;

      var shipPathIndexes = {
        indexes: [...prevIndexes, ...nextPath],
        number_of_indexes_added: [
          ...prev_number_of_indexes_added,
          length_of_new_path_indexes,
        ],
      };
      newState.shipPathIndexes = shipPathIndexes;
      var {pathComponents, pathCoordinates} =
        generateShipPathComponentsAndCoordinates(state.matrix, shipPathIndexes);
      newState.pathComponents = pathComponents;
      newState.pathCoordinates = pathCoordinates;
      return newState;

    case ACTIONS.UNDO:
      var prevIndexes = newState.shipPathIndexes.indexes;
      var prev_number_of_indexes_added =
        newState.shipPathIndexes.number_of_indexes_added;
      if (prevIndexes.length === 1) {
        return newState;
      }
      const number_of_indexes_added_in_last_segment =
        prev_number_of_indexes_added[prev_number_of_indexes_added.length - 1];
      //remove number of indexes added in last segment from prevIndexes from end
      prevIndexes.splice(
        prevIndexes.length - number_of_indexes_added_in_last_segment,
        number_of_indexes_added_in_last_segment,
      );
      //remove number of indexes added in last segment from prev_number_of_indexes_added from end
      prev_number_of_indexes_added.pop();
      var shipPathIndexes = {
        indexes: [...prevIndexes],
        number_of_indexes_added: [...prev_number_of_indexes_added],
      };
      newState.shipPathIndexes = shipPathIndexes;
      var {pathComponents, pathCoordinates} =
        generateShipPathComponentsAndCoordinates(state.matrix, shipPathIndexes);
      newState.pathComponents = pathComponents;
      newState.pathCoordinates = pathCoordinates;

      return newState;
    default:
      return state;
  }
}
