import {useEffect, useRef, useContext} from 'react';
import {Animated, Easing} from 'react-native';
import {CarGameContext} from '../providers/CarGame.Provider';
import {constants} from '../utilities/CarGame';
const AnimatedDrop = ({
  children,
  duration,
  objectHeight,
  destroy,
  objectType,
  lanePosition,
  id,
}) => {
  const {carPosition} = useContext(CarGameContext);
  const {carYPosition, ROAD_HEIGHT} = constants;
  const animation = useRef(new Animated.Value(0)).current;
  const distanceFromTop = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-objectHeight, ROAD_HEIGHT + objectHeight],
  });

  useEffect(() => {
    if (objectType === 'obstacle')
      distanceFromTop.addListener(({value}) => {
        //check collision
        if (
          value >= carYPosition &&
          value < ROAD_HEIGHT &&
          lanePosition.position === carPosition
        ) {
          console.log('collide', carPosition, lanePosition.position, id);
          destroy(id);
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
    ]).start();
  }, []);

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
