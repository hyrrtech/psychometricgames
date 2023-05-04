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
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [duration]);

  const carPositionRef = useRef(
    new Animated.ValueXY({
      x: carCenterXPosition,
      y: carYPosition,
    }),
  ).current;
  const invinclibeAnimation = useRef(new Animated.Value(1)).current;

  const invincibleEffect = () => {
    Animated.sequence([
      Animated.timing(invinclibeAnimation, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(invinclibeAnimation, {
        toValue: 1,
        duration: 0,
        useNativeDriver: true,
      }),
      Animated.timing(invinclibeAnimation, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(invinclibeAnimation, {
        toValue: 1,
        duration: 0,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <CarGameContext.Provider
      value={{
        carPosition,
        setCarPosition,
        carPositionRef,
        duration,
        setDuration,
        invinclibeAnimation,
        invincibleEffect,
      }}>
      {children}
    </CarGameContext.Provider>
  );
};
