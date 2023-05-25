import React, {createContext, useState, useEffect} from 'react';
import {getHolderPositions, generateSequence} from '../utilities/FuseWire';

export const FuseWireContext = createContext();

export const FuseWireProvider = ({children}) => {
  const {fuseHolderData, blankValues} = getHolderPositions(
    generateSequence(2, 7),
  );

  const [fuseHolders, setFuseHolders] = useState(fuseHolderData);

  return (
    <FuseWireContext.Provider
      value={{fuseHolders, setFuseHolders, blankValues}}>
      {children}
    </FuseWireContext.Provider>
  );
};
