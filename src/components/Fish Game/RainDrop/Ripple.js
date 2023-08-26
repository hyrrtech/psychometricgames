import {useEffect, useRef} from 'react';
import {Animated, Easing} from 'react-native';
import {constants} from '../../../utilities/Fish Game';
const {rainDropSize: size} = constants;
const Ripple = ({initialScale, finalScale, delay, interval}) => {
  // console.log(interval);
  const scaleAnimation = useRef(new Animated.Value(initialScale)).current;
  const opacityAnimation = useRef(new Animated.Value(0)).current;
  const duration = 700;

  useEffect(() => {
    setInterval(() => {
      Animated.sequence([
        Animated.delay(delay),
        Animated.parallel([
          Animated.timing(scaleAnimation, {
            toValue: (initialScale + finalScale) / 3,
            duration: duration / 3,
            useNativeDriver: true,
            easing: Easing.linear,
          }),
          Animated.timing(opacityAnimation, {
            toValue: 0.2,
            duration: duration / 3,
            useNativeDriver: true,
            easing: Easing.linear,
          }),
        ]),
        Animated.parallel([
          Animated.timing(scaleAnimation, {
            toValue: finalScale,
            duration: duration - duration / 3,
            useNativeDriver: true,
            easing: Easing.linear,
          }),
          Animated.timing(opacityAnimation, {
            toValue: 0,
            duration: duration - duration / 3,
            useNativeDriver: true,
            easing: Easing.linear,
          }),
        ]),
      ]).start(() => {
        scaleAnimation.setValue(initialScale);
        opacityAnimation.setValue(0);
      });
    }, interval);
  }, []);
  return (
    <Animated.View
      style={{
        height: size,
        width: size,
        borderRadius: size / 2,
        borderColor: 'white',
        borderWidth: 6.5,
        opacity: opacityAnimation,
        transform: [{scale: scaleAnimation}],
        position: 'absolute',
      }}></Animated.View>
  );
};

export default Ripple;
