import React, {
  createContext,
  useState,
  useMemo,
  useEffect,
  useReducer,
} from 'react';
import {
  generateMatrix,
  generatePiratePathComponentsAndCoordiantes,
  generateShipPathComponentsAndCoordinates,
} from '../utilities/Pirate Passage';
import initialState from '../screens/Pirate Passage/initialState';
import {reducer, ACTIONS} from '../screens/Pirate Passage/reducer';

export const PiratePassageContext = createContext();

export const PiratePassageProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialShipIndex = [0, 0];
  const [go, setGo] = useState(false);
  const [pathIndexes, setPathIndexes] = useState({
    indexes: [initialShipIndex],
    number_of_indexes_added: [1],
  });

  const {pathComponents, pathCoordinates} =
    generateShipPathComponentsAndCoordinates(state.matrix, pathIndexes);

  return (
    <PiratePassageContext.Provider
      value={{
        pathIndexes: state.pathIndexes,
        setPathIndexes,
        pathComponents,
        pathCoordinates,
        matrix: state.matrix,
        piratePathComponents: state.piratePathComponents,
        piratePathCoordinates: state.piratePathCoordinates,
        go,
        setGo,
      }}>
      {children}
    </PiratePassageContext.Provider>
  );
};
