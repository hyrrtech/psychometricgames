import React, {createContext, useState, useEffect} from 'react';
import {Dimensions} from 'react-native';

export const TrainOfThoughtsContext = createContext();

export const TrainOfThoughtsProvider = ({children}) => {
  const [trains, setTrains] = useState([0]);
  const adjustPathCoordinates = path => {
    const {width, height} = Dimensions.get('window');
    const scaleX = width / 1000;
    const scaleY = height / 1000;

    return path.map(point => ({
      x: point.x * scaleX,
      y: point.y * scaleY,
    }));
  };

  const [path, setPath] = useState(
    adjustPathCoordinates([
      {x: 50, y: 50},
      {x: 50, y: 700},
      {x: 400, y: 700},
      {x: 900, y: 50},
      {x: 50, y: 50},
    ]),
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      //colors can be used to differentiate trains
      setTrains([...trains, trains[trains.length - 1] + 1]);
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [trains]);

  return (
    <TrainOfThoughtsContext.Provider
      value={{
        trains,
        setTrains,
        path,
        setPath,
      }}>
      {children}
    </TrainOfThoughtsContext.Provider>
  );
};
