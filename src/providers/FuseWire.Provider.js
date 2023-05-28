import React, {createContext, useState, useEffect} from 'react';
import {getHolderPositions, generateSequence} from '../utilities/FuseWire';
import functions from '@react-native-firebase/functions';

export const FuseWireContext = createContext();

export const FuseWireProvider = ({children}) => {
  const {fuseHolderData, blankValues} = getHolderPositions(
    generateSequence(1, 5),
  );

  const [fuseHolders, setFuseHolders] = useState(fuseHolderData);

  return (
    <FuseWireContext.Provider
      value={{fuseHolders, setFuseHolders, blankValues}}>
      {children}
    </FuseWireContext.Provider>
  );
};
