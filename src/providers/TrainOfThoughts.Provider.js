import React, {createContext, useState, useMemo, useEffect} from 'react';
import {getColors, constants, path} from '../utilities/Train of Thoughts';
import {useCountdown} from '../utilities';

export const TrainOfThoughtsContext = createContext();

export const TrainOfThoughtsProvider = ({children}) => {
  const [switchDirections, setSwitchDirections] = useState(
    constants.switchDirectionArray,
  );
  const [showDemo, setShowDemo] = useState(false);
  const [demoState, setDemoState] = useState({
    demoStage: 0,
    stopTrain: false,
    disableSwitch: true,
    trainColor: '#5bc0f8',
  });
  const {TIME, togglePause} = useCountdown(
    constants.time.minutes,
    constants.time.seconds,
  );

  useEffect(() => {
    if (showDemo) {
      togglePause(true);
    } else {
      togglePause(false);
    }
  }, [showDemo]);

  const trainColors = useMemo(() => getColors(path), []);

  return (
    <TrainOfThoughtsContext.Provider
      value={{
        trainColors,
        switchDirections,
        setSwitchDirections,
        TIME,
        showDemo,
        setShowDemo,
        demoState,
        setDemoState,
      }}>
      {children}
    </TrainOfThoughtsContext.Provider>
  );
};
