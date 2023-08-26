import ShapeSvg from './ShapeSvgs';
import adjustHexColor from '../../utilities/adjustHexColor';
import {constants} from '../../utilities/Star Search';

import {useEffect, useRef} from 'react';
import {Animated, Easing} from 'react-native';

const getInterpolatedValue = (rotationAnimation, angle) => {
  if (rotationAnimation === 'none')
    return {
      inputRange: [0, 1],
      outputRange: [`${angle}deg`, `${angle}deg`],
    };
  const rotationAngle =
    rotationAnimation === 'clockwise' ? angle + 360 : angle - 360;

  return {
    inputRange: [0, 1],
    outputRange: [`${angle}deg`, `${rotationAngle}deg`],
  };
};

const Shape = ({
  hasPattern,
  initialRotationAngle,
  rotationAnimation,
  color,
  shape,
}) => {
  const {shapeSize} = constants;

  const {darkened: darkenColor, lightened: lightenColor} = adjustHexColor(
    color,
    20,
    30,
  );
  const rotateAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnimation, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
    ).start();
  }, []);

  const rotate = rotateAnimation.interpolate(
    getInterpolatedValue(rotationAnimation, initialRotationAngle),
  );
  return (
    <Animated.View
      pointerEvents="none"
      style={{
        height: shapeSize,
        width: shapeSize,
        transform: [{rotateZ: rotate}],
      }}>
      <ShapeSvg
        shapeName={shape}
        darkenColor={darkenColor}
        lightenColor={lightenColor}
        patternColor={hasPattern ? 'rgba(255,255,255,0.8)' : 'none'}
      />
    </Animated.View>
  );
};

export default Shape;
