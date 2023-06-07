import React, {createContext, useState, useReducer} from 'react';
import initialState from '../screens/Pirate Passage/initialState';
import {reducer, ACTIONS} from '../screens/Pirate Passage/reducer';

export const PiratePassageContext = createContext();

export const PiratePassageProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [go, setGo] = useState(false);

  return (
    <PiratePassageContext.Provider
      value={{
        pathIndexes: state.pathIndexes,
        pathComponents: state.pathComponents,
        pathCoordinates: state.pathCoordinates,
        matrix: state.matrix,
        piratePathComponents: state.piratePathComponents,
        piratePathCoordinates: state.piratePathCoordinates,
        go,
        setGo,
        dispatch,
        ACTIONS,
      }}>
      {children}
    </PiratePassageContext.Provider>
  );
};
