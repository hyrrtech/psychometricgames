import React, {createContext, useState, useMemo} from 'react';
import {getColors, constants, path} from '../utilities/Train of Thoughts';
import {useCountdown} from '../utilities';

export const TrainOfThoughtsContext = createContext();

export const TrainOfThoughtsProvider = ({children}) => {
  const [switchDirections, setSwitchDirections] = useState(
    constants.switchDirectionArray,
  );
  const {TIME} = useCountdown(constants.time.minutes, constants.time.seconds);
  const trainColors = useMemo(() => getColors(path), []);

  return (
    <TrainOfThoughtsContext.Provider
      value={{
        trainColors,
        switchDirections,
        setSwitchDirections,
        TIME,
      }}>
      {children}
    </TrainOfThoughtsContext.Provider>
  );
};
