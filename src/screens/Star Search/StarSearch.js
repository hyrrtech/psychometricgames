import {useEffect, useRef} from 'react';
import {View, Animated, Easing, Text, TouchableOpacity} from 'react-native';

import Svg, {Path} from 'react-native-svg';
import adjustHexColor from '../../utilities/adjustHexColor';
import {
  constants,
  generateShapeData,
  getShapePositions,
  svgData,
} from '../../utilities/Star Search';

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

const SvgComponent = ({
  hasPattern,
  initialRotationAngle,
  rotationAnimation,
  color,
  shape,
  position,
  count,
}) => {
  const shapeData = svgData[shape];
  const {
    viewBox,
    lightPath,
    darkPaths,
    patternPaths,
    // patternStrokeColor,
    patternStrokeWidth,
  } = shapeData;
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
  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
  return (
    <AnimatedTouchable
      style={{
        height: shapeSize,
        width: shapeSize,
        transform: [{rotateZ: rotate}],
        position: 'absolute',
        left: position.x,
        top: position.y,
      }}>
      <Svg width={shapeSize} height={shapeSize} viewBox={viewBox} fill="none">
        <Path d={lightPath} fill={color} />

        {hasPattern &&
          patternPaths.map((path, index) => (
            <Path
              key={index}
              d={path}
              stroke={lightenColor}
              strokeWidth={patternStrokeWidth}
              strokeMiterlimit={10}
            />
          ))}

        {darkPaths.map((path, index) => (
          <Path key={index} d={path} fill={darkenColor} />
        ))}
      </Svg>
      <Text style={{position: 'absolute'}}>{count}</Text>
    </AnimatedTouchable>
  );
};

const StarSearch = () => {
  const {spawnAreaHeight, spawnAreaWidth} = constants;
  const shapePositions = getShapePositions(20);
  const shapeStyles = generateShapeData(20, 3, 2, 3, false, false, true);

  const combinePositionAndStyle = (shapePositions, shapeStyles) => {
    let combinedArray = [];
    let j = 0;
    for (let [key, value] of shapeStyles) {
      for (let k = 0; k < value.count; k++) {
        combinedArray.push({
          position: shapePositions[j].position,
          id: shapePositions[j].id,
          ...value,
        });
        j++;
      }
    }

    return combinedArray;
  };

  const shapeData = combinePositionAndStyle(shapePositions, shapeStyles);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1b5256',
      }}>
      <View
        style={{
          height: spawnAreaHeight,
          width: spawnAreaWidth,
        }}>
        {shapeData.map(shape => (
          <SvgComponent
            key={shape.id}
            hasPattern={shape.hasPattern}
            initialRotationAngle={shape.initialRotationAngle}
            rotationAnimation={shape.rotationAnimation}
            color={shape.color}
            shape={shape.shape}
            position={shape.position}
            count={shape.count}
          />
        ))}
      </View>
    </View>
  );
};

export default StarSearch;
