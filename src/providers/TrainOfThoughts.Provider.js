import React, {createContext, useState, useEffect, useMemo} from 'react';
import {Dimensions} from 'react-native';
import path from '../screens/Train of Thoughts/PATH';
import {getColors} from '../utilities/Train of Thoughts';
import {useCountdown} from '../utilities';
export const TrainOfThoughtsContext = createContext();

export const TrainOfThoughtsProvider = ({children}) => {
  const {width} = Dimensions.get('window');
  const trainSize = width * 0.1;
  const pathSize = width * 0.06;
  const curveSize = pathSize + 5;
  const switchSize = width * 0.12;
  const stationSize = width * 0.15;
  const speed = 50;
  const spawnSpeed = 4000;
  const {TIME} = useCountdown(1, 0); //1 minute
  const trainColors = useMemo(() => getColors(path(switchSize, pathSize)), []);

  const originalSwitchDirections = {
    1: ['horizontal_left', 'horizontal'],
    2: ['horizontal', 'horizontal_right'],
    3: ['vertical_left_down', 'vertical'],
    4: ['horizontal', 'horizontal_left'],
    5: ['vertical_left_down', 'vertical'],
    6: ['vertical', 'vertical_right'],
    7: ['horizontal', 'horizontal_left_up'],
    8: ['vertical_right', 'vertical'],
    9: ['vertical_right', 'vertical'],
    10: ['vertical_left', 'vertical'],
    11: ['horizontal_left', 'horizontal'],
    12: ['vertical', 'vertical_left'],
    13: ['horizontal_right', 'horizontal'],
  };

  const switchDirectionArray = Object.values(originalSwitchDirections).map(
    switchDirection => switchDirection[0],
  );

  const [switchDirections, setSwitchDirections] =
    useState(switchDirectionArray);

  return (
    <TrainOfThoughtsContext.Provider
      value={{
        trainColors,
        path: path(50, 26),
        trainSize,
        pathSize,
        switchSize,
        stationSize,
        curveSize,
        speed,
        switchDirections,
        setSwitchDirections,
        originalSwitchDirections,
        spawnSpeed,
        TIME,
      }}>
      {children}
    </TrainOfThoughtsContext.Provider>
  );
};
