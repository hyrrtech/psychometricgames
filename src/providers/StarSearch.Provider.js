import React, {createContext, useReducer, useEffect} from 'react';
// import initialState from '../screens/Star Search/initialState';
import {reducer} from '../screens/Star Search/reducer';
import {stateGenerator} from '../utilities/Star Search';

export const StarSearchContext = createContext();

const initialState = stateGenerator(1);

export const StarSearchProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StarSearchContext.Provider value={{state, dispatch}}>
      {children}
    </StarSearchContext.Provider>
  );
};
