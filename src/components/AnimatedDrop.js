import {useEffect, useRef, useState, useContext, useMemo} from 'react';
import {Animated, Easing} from 'react-native';
import {CarGameContext} from '../providers/CarGame.Provider';
import {constants} from '../utilities/CarGame';

const {carYPosition, ROAD_HEIGHT, MIN_SPEED} = constants;

const DISTANCE_TO_BE_COVERED = ROAD_HEIGHT + 200;

const AnimatedDrop = ({
  children,
  destroy,
  objectType,
  lanePosition,
  id,
  startTime,
  objectHeight,
}) => {
  const {carPosition, setSpeed, speed, invincibleEffect} =
    useContext(CarGameContext);
  const [hasCollided, setHasCollided] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;
  // const [remaining, setRemaining] = useState(DISTANCE_TO_BE_COVERED);

  const offset =
    objectType === 'obstacle' ? ROAD_HEIGHT * 0.05 : ROAD_HEIGHT * 0.2;
  const distanceFromTop = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-offset, ROAD_HEIGHT + offset],
  });

  useEffect(() => {
    if (objectType === 'obstacle') {
      distanceFromTop.addListener(({value}) => {
        // console.log(value);
        if (
          !hasCollided &&
          value >= carYPosition - objectHeight &&
          value < ROAD_HEIGHT &&
          lanePosition.position === carPosition
        ) {
          setHasCollided(true);
          setSpeed(MIN_SPEED);
          invincibleEffect();
        }
      });
    }
    return () => {
      distanceFromTop.removeAllListeners();
    };
  }, [carPosition, lanePosition, objectType, hasCollided, invincibleEffect]);

  useEffect(() => {
    const value = distanceFromTop.__getValue();
    const remaining = DISTANCE_TO_BE_COVERED - Math.abs(value);
    const duration = (remaining * 1000) / speed;
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 1,
        duration: duration,
        easing: Easing.linear,
        useNativeDriver: false, //__getValue() not working for "useNativeDriver: true"
      }),
    ]).start(({finished}) => finished && destroy(id));
  }, [speed]);

  return (
    <Animated.View
      style={{
        transform: [
          {translateY: distanceFromTop},
          {translateX: objectType === 'obstacle' ? lanePosition.x : 0},
        ],
      }}>
      {children}
    </Animated.View>
  );
};
export default AnimatedDrop;
