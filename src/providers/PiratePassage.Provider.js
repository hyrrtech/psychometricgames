import React, {
  createContext,
  useState,
  useReducer,
  useRef,
  useEffect,
} from 'react';
import initialState from '../screens/Pirate Passage/initialState';
import {reducer, ACTIONS} from '../screens/Pirate Passage/reducer';
import {constants} from '../utilities/Pirate Passage';
const {time_to_cover_each_tile} = constants;

export const PiratePassageContext = createContext();

export const PiratePassageProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const time = useRef(0);
  const checkIfLoop = path => {
    const {pathIndexes} = path;
    const first = pathIndexes[0];
    const last = pathIndexes[pathIndexes.length - 1];
    return first[0] === last[0] && first[1] === last[1];
  };
  // check collision at time t, return true if collision occurs, false otherwise
  const collisionDetection = (shipPathIndexes, piratePathsIndexes, time) => {
    const steps = time;
    console.log(steps, 'steps');
    // Get current ship position
    const shipPosition = getShipPosition(shipPathIndexes, steps);
    // Check for collisions with pirate ships
    for (const piratePath of piratePathsIndexes) {
      const piratePosition = getPirateShipPosition(piratePath, steps);
      if (positionsOverlap(shipPosition, piratePosition)) {
        return true; // Collision detected
      }
    }
    return false; // No collision
  };

  function getShipPosition(path, steps) {
    const positionIndex = Math.min(steps, path.length - 1);
    return path[positionIndex];
  }

  function getPirateShipPosition(path, steps) {
    if (checkIfLoop(path)) {
      let {pathIndexes, moveDirection, initialShipLocation} = path;
      pathIndexes.pop();
      if (moveDirection === -1) {
        pathIndexes = pathIndexes.reverse();
      }
      let index = -1;
      for (let i = 0; i < pathIndexes.length; i++) {
        if (
          pathIndexes[i][0] === initialShipLocation[0] && //position overlap function can be used here
          pathIndexes[i][1] === initialShipLocation[1]
        ) {
          index = i;
          break;
        }
      }
      index += steps;
      if (index >= pathIndexes.length) {
        index = index % pathIndexes.length;
      }

      return pathIndexes[index];
    } else {
      let index = -1;
      let {moveDirection, pathIndexes, initialShipLocation} = path;
      for (let i = 0; i < pathIndexes.length; i++) {
        if (
          pathIndexes[i][0] === initialShipLocation[0] && //position overlap function can be used here
          pathIndexes[i][1] === initialShipLocation[1]
        ) {
          index = i;
          break;
        }
      }
      for (let i = 0; i < steps; i++) {
        index += moveDirection;
        if (index === pathIndexes.length - 1 || index === 0) {
          moveDirection *= -1;
        }
      }
      return pathIndexes[index];
    }
  }

  function positionsOverlap(position1, position2) {
    return position1[0] === position2[0] && position1[1] === position2[1];
  }

  // check for collision in interval time_to_cover_each_tile
  useEffect(() => {
    if (state.go === false) {
      return;
    }
    const interval = setInterval(() => {
      time.current += 1;

      if (
        collisionDetection(
          state.shipPathIndexes.indexes,
          state.piratePathIndexes,
          time.current,
        )
      ) {
        console.log(
          time.current,
          getShipPosition(state.shipPathIndexes.indexes, time.current),
          'collision detected',
        );
      }
    }, time_to_cover_each_tile);
    return () => clearInterval(interval);
  }, [state.go]);

  return (
    <PiratePassageContext.Provider
      value={{
        pathIndexes: state.pathIndexes,
        pathComponents: state.pathComponents,
        pathCoordinates: state.pathCoordinates,
        matrix: state.matrix,
        piratePathComponents: state.piratePathComponents,
        piratePathCoordinates: state.piratePathCoordinates,
        go: state.go,
        treasureIndex: state.treasureIndex,
        dispatch,
        ACTIONS,
      }}>
      {children}
    </PiratePassageContext.Provider>
  );
};
