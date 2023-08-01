import ShapeSvg from './ShapeSvgs';
import adjustHexColor from '../../utilities/adjustHexColor';
import {constants} from '../../utilities/Star Search';

import {useEffect, useRef} from 'react';
import {View, Animated, Easing, TouchableOpacity} from 'react-native';

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
  position,
  count,
  id,
}) => {
  const {shapeSize} = constants;

  const {darkened: darkenColor, lightened: lightenColor} = adjustHexColor(
    color,
    20,
    50,
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
    <TouchableOpacity
      onPress={() => console.log(id)}
      style={{
        height: shapeSize,
        width: shapeSize,
        transform: [{rotateZ: rotate}],
        position: 'absolute',
        left: position.x,
        top: position.y,
      }}>
      <View pointerEvents="none">
        <ShapeSvg
          shapeName={shape}
          darkenColor={darkenColor}
          lightenColor={lightenColor}
          patternColor={hasPattern ? 'rgba(255,255,255,0.8)' : 'none'}
        />
      </View>
    </TouchableOpacity>
  );
};

export default Shape;
