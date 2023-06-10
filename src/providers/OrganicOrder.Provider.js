import React, {createContext, useState, useEffect} from 'react';
import {getPlantPotsPositions} from '../utilities/Organic Order';

export const OrganicOrderContext = createContext();

const num_of_pots = 5;
export const OrganicOrderProvider = ({children}) => {
  const {plantPotsData} = getPlantPotsPositions(num_of_pots);

  const [plantPots, setPlantPots] = useState(plantPotsData);
  console.log(plantPots);

  return (
    <OrganicOrderContext.Provider value={{plantPots, setPlantPots}}>
      {children}
    </OrganicOrderContext.Provider>
  );
};
