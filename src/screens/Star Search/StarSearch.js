import {useEffect, useRef} from 'react';
import {View, Animated, Easing, TouchableOpacity} from 'react-native';

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
  hasReflection,
  initialRotationAngle,
  rotationAnimation,
  color,
  shape,
  position,
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
  const {shapeSize} = constants;

  const darkenColor = adjustHexColor(color, 20).darkened;
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
        transform: [{rotateZ: rotate}, {scaleY: hasReflection ? -1 : 1}],
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
              stroke={patternStrokeColor}
              strokeWidth={patternStrokeWidth}
            />
          ))}

        {darkPaths.map((path, index) => (
          <Path key={index} d={path} fill={darkenColor} />
        ))}
      </Svg>
    </AnimatedTouchable>
  );
};

const StarSearch = () => {
  const {spawnAreaHeight, spawnAreaWidth} = constants;
  const shapePositions = getShapePositions(10);
  const shapeStyles = generateShapeData(10, 3, 3, 2, true, true, false);
  console.log(shapeStyles);
  const combinePositionAndStyle = (shapePositions, shapeStyles) => {
    let combinedArray = [];
    let j = 0;
    for (let i = 0; i < shapeStyles.length; i++) {
      for (let k = 0; k < shapeStyles[i].count; k++) {
        combinedArray.push({
          position: shapePositions[j].position,
          id: shapePositions[j].id,
          ...shapeStyles[i],
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
      }}>
      <View
        style={{
          height: spawnAreaHeight,
          width: spawnAreaWidth,
          backgroundColor: '#1b5256',
        }}>
        {shapeData.map(shape => (
          <SvgComponent
            hasPattern={shape.hasPattern}
            hasReflection={shape.hasReflection}
            initialRotationAngle={shape.initialRotationAngle}
            rotationAnimation={shape.rotationAnimation}
            color={shape.color}
            shape={shape.shape}
            position={shape.position}
          />
        ))}
      </View>
    </View>
  );
};

export default StarSearch;
