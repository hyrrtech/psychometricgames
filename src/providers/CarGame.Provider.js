import React, {
  createContext,
  useState,
  useRef,
  useCallback,
  useEffect,
} from 'react';
import {Animated} from 'react-native';
import {constants} from '../utilities/CarGame';
export const CarGameContext = createContext();

export const CarGameProvider = ({children}) => {
  const {carCenterXPosition, carYPosition} = constants;

  const [carPosition, setCarPosition] = useState('center');
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
      }}>
      {children}
    </CarGameContext.Provider>
  );
};
