import {useEffect, useRef} from 'react';
import {View, Animated, Easing} from 'react-native';

import {svgData} from '../../utilities/Star Search';

import Svg, {Path} from 'react-native-svg';
import adjustHexColor from '../../utilities/adjustHexColor';

const getToValue = rotationAnimation => {
  if (rotationAnimation === 'clockwise') return 1;
  if (rotationAnimation === 'anticlockwise') return -1;
  if (rotationAnimation === 'none') return 0;
};

const getInterpolatedValue = (value, angle) => {
  if (value === 0)
    return {
      inputRange: [0, 1],
      outputRange: [`${angle}deg`, `${angle}deg`],
    };
  return {
    inputRange: [0, 1],
    outputRange: [`${angle}deg`, `${(360 + angle) * value}deg`],
  };
};

const SvgComponent = ({
  width,
  height,
  hasPattern,
  initialRotationAngle,
  rotationAnimation,
  color,
  shape,
}) => {
  const shapeData = svgData[shape];
  const {
    viewBox,
    lightPath,
    darkPaths,
    patternPaths,
    patternStrokeColor,
    patternStrokeWidth,
  } = shapeData;

  const darkenColor = adjustHexColor(color, 20).darkened;
  const rotateAnimation = useRef(new Animated.Value(0)).current;
  const value = getToValue(rotationAnimation);
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
    getInterpolatedValue(value, initialRotationAngle),
  );

  return (
    <Animated.View
      style={{
        borderWidth: 1,
        borderColor: 'red',
        transform: [{rotate: rotate}],
      }}>
      <Svg width={width} height={height} viewBox={viewBox} fill="none">
        <Path d={lightPath} fill={color} />
        {hasPattern &&
          patternPaths.map((path, index) => (
            <Path
              key={index}
              d={path}
              stroke={patternStrokeColor}
              strokeWidth={patternStrokeWidth}
            />
          ))}
        {darkPaths.map((path, index) => (
          <Path key={index} d={path} fill={darkenColor} />
        ))}
      </Svg>
    </Animated.View>
  );
};

const StarSearch = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'flex-start',
      }}>
      <SvgComponent
        width={150}
        height={150}
        hasPattern={true}
        initialRotationAngle={30} //in degree
        rotationAnimation="clockwise"
        color="#c2a9f3"
        shape="shape2"
      />
      <SvgComponent
        width={150}
        height={150}
        hasPattern={true}
        initialRotationAngle={90} //in degree
        rotationAnimation="clockwise"
        color="#c2a9f3"
        shape="shape2"
      />
      <SvgComponent
        width={150}
        height={150}
        hasPattern={true}
        initialRotationAngle={0} //in degree
        rotationAnimation="clockwise"
        color="#c2a9f3"
        shape="shape2"
      />
    </View>
  );
};

export default StarSearch;
