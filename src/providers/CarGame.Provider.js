import React, {createContext, useState, useRef, useEffect} from 'react';
import {Animated} from 'react-native';
import {constants} from '../utilities/CarGame';
export const CarGameContext = createContext();

const {carCenterXPosition, MIN_SPEED, MAX_SPEED} = constants;

export const CarGameProvider = ({children}) => {
  const [speed, setSpeed] = useState(MIN_SPEED);
  const [carPosition, setCarPosition] = useState('center');
  const invincibleAnimation = useRef(new Animated.Value(1)).current;
  const carPositionRef = useRef(new Animated.Value(carCenterXPosition)).current;

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  async function increaseSpeed() {
    if (speed != MAX_SPEED) {
      await delay(2000);
      setSpeed(MAX_SPEED);
    }
  }
  useEffect(() => {
    increaseSpeed();
  }, [speed]);

  const invincibleEffect = () => {
    Animated.sequence([
      Animated.timing(invincibleAnimation, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }),
      Animated.delay(100),
      Animated.timing(invincibleAnimation, {
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
        speed,
        setSpeed,
        invincibleAnimation,
        invincibleEffect,
      }}>
      {children}
    </CarGameContext.Provider>
  );
};
