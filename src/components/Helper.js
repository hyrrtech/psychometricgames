import {useEffect, useRef, useState} from 'react';
import {Animated, Easing} from 'react-native';
const AnimatedDrop = ({
  children,
  duration,
  roadHeight,
  objectHeight,
  destroy,
  id,
}) => {
  const animation = useRef(new Animated.Value(0)).current;
  const distanceFromTop = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-objectHeight, roadHeight + objectHeight],
  });

  const [position, setPosition] = useState({x: 0, y: 0});

  const checkCollision = () => {};

  useEffect(() => {
    distanceFromTop.addListener(({value}) => {
      console.log(value, id);
    });

    Animated.sequence([
      Animated.timing(animation, {
        toValue: 1,
        duration: duration,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start(({finished}) => destroy());

    return () => {
      distanceFromTop.removeAllListeners();
    };
  }, []);

  return (
    <Animated.View style={{transform: [{translateY: distanceFromTop}]}}>
      {children}
    </Animated.View>
  );
};
export default AnimatedDrop;
