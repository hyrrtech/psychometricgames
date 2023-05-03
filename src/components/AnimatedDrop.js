import {useEffect, useRef, useContext} from 'react';
import {Animated, Easing} from 'react-native';
import {CarGameContext} from '../providers/CarGame.Provider';
import {constants} from '../utilities/CarGame';

const AnimatedDrop = ({
  children,
  objectHeight,
  destroy,
  objectType,
  lanePosition,
  id,
  invincibleEffect,
}) => {
  const {carPosition, setDuration, duration} = useContext(CarGameContext);
  const {carYPosition, ROAD_HEIGHT, DURATION} = constants;
  const animation = useRef(new Animated.Value(0)).current;
  const distanceFromTop = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-objectHeight, ROAD_HEIGHT + objectHeight],
  });

  useEffect(() => {
    if (objectType === 'obstacle')
      distanceFromTop.addListener(({value}) => {
        if (
          value >= carYPosition - objectHeight &&
          value < ROAD_HEIGHT &&
          lanePosition.position === carPosition
        ) {
          invincibleEffect();
          setDuration(DURATION + 1000);
        }
      });
    return () => {
      distanceFromTop.removeAllListeners();
    };
  }, [carPosition]);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 1,
        duration: duration,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start(({finished}) => finished && destroy(id));
  }, [duration]);

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
