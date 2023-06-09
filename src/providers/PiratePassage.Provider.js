import React, {
  createContext,
  useReducer,
  useState,
  useRef,
  useEffect,
} from 'react';
import initialState from '../screens/Pirate Passage/initialState';
import {reducer, ACTIONS} from '../screens/Pirate Passage/reducer';
import {constants, collisionDetection} from '../utilities/Pirate Passage';

const {time_to_cover_each_tile} = constants;

export const PiratePassageContext = createContext();

export const PiratePassageProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showCollision, setShowCollision] = useState({collided: false});
  const time = useRef(0);

  useEffect(() => {
    if (state.go) {
      const interval = setInterval(() => {
        time.current += 1;
        const {collided, shipPosition} = collisionDetection(
          state.shipPathIndexes.indexes,
          state.piratePathIndexes,
          time.current,
        );
        if (collided) {
          setShowCollision({collided: true, shipPosition});
        }
      }, time_to_cover_each_tile);
      return () => clearInterval(interval);
    }
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
        showCollision,
      }}>
      {children}
    </PiratePassageContext.Provider>
  );
};
