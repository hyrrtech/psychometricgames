import React, {createContext, useState, useRef, useEffect} from 'react';
import {Animated} from 'react-native';
import {constants} from '../utilities/CarGame';
export const CarGameContext = createContext();

const {carCenterXPosition, carYPosition, DURATION} = constants;

export const CarGameProvider = ({children}) => {
  const [duration, setDuration] = useState(DURATION);
  const [carPosition, setCarPosition] = useState('center');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDuration(DURATION);
    });
    return () => clearTimeout(timeoutId);
  }, [duration]);

  const carPositionRef = useRef(
    new Animated.ValueXY({
      x: carCenterXPosition,
      y: carYPosition,
    }),
  ).current;

  return (
    <CarGameContext.Provider
      value={{
        carPosition,
        setCarPosition,
        carPositionRef,
        duration,
        setDuration,
      }}>
      {children}
    </CarGameContext.Provider>
  );
};
