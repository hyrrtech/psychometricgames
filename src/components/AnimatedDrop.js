import {useEffect, useRef, useState, useContext, useMemo} from 'react';
import {Animated, Easing} from 'react-native';
import {CarGameContext} from '../providers/CarGame.Provider';
import {constants} from '../utilities/CarGame';

const {carYPosition, ROAD_HEIGHT, MIN_SPEED} = constants;

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

  const distanceFromTop = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-objectHeight, ROAD_HEIGHT + objectHeight],
  });

  useEffect(() => {
    if (objectType === 'obstacle')
      distanceFromTop.addListener(({value}) => {
        if (
          !hasCollided &&
          value >= carYPosition - objectHeight &&
          value < ROAD_HEIGHT &&
          lanePosition.position === carPosition
        ) {
          console.log('collision detected');
          setHasCollided(true);
          setSpeed(MIN_SPEED);
          invincibleEffect();
        }
      });
    return () => {
      setHasCollided(false);
      distanceFromTop.removeAllListeners();
    };
  }, [carPosition, hasCollided]);

  useEffect(() => {
    // const distanceCovered = getDistanceCovered();
    // console.log(distanceCovered, id);
    const duration = (2 * objectHeight + ROAD_HEIGHT * 1000) / speed;
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 1,
        duration: duration,
        easing: Easing.linear,
        useNativeDriver: true,
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
