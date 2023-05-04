import {useEffect, useRef, useContext, useMemo} from 'react';
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
}) => {
  const {carPosition, setDuration, duration, invincibleEffect} =
    useContext(CarGameContext);
  const {carYPosition, ROAD_HEIGHT, DURATION} = constants;
  const animation = useRef(new Animated.Value(0)).current;

  const interPolateObjectHeight = useMemo(() => {
    if (objectType === 'obstacle')
      return objectHeight + Math.random() * ROAD_HEIGHT * 0.2;
    return objectHeight;
  }, [objectType]);

  const distanceFromTop = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [
      -interPolateObjectHeight,
      ROAD_HEIGHT + interPolateObjectHeight,
    ],
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
          setDuration(DURATION * 1.5);
        }
      });
    return () => {
      distanceFromTop.removeAllListeners();
    };
  }, [carPosition]);

  const startTime = Date.now();
  useEffect(() => {
    const elapsedTime = Date.now() - startTime;
    const remainingDuration = duration - elapsedTime * 10;
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 1,
        duration: remainingDuration,
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
