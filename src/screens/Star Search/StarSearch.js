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
import Shape1 from '../../assets/shapes/shape1.svg';
import Shape2 from '../../assets/shapes/shape2.svg';
import Shape3 from '../../assets/shapes/shape3.svg';
import Shape4 from '../../assets/shapes/shape4.svg';
import Shape5 from '../../assets/shapes/shape5.svg';
import Shape6 from '../../assets/shapes/shape6.svg';
import Shape7 from '../../assets/shapes/shape7.svg';

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
  // const shapeData = svgData[shape];
  // const {
  //   viewBox,
  //   lightPath,
  //   darkPaths,
  //   patternPaths,
  //   // patternStrokeColor,
  //   patternStrokeWidth,
  // } = shapeData;
  const {shapeSize} = constants;

  const Shape = ({shapeName, darkenColor, lightenColor, patternColor}) => {
    const shapeComponents = {
      shape1: (
        <Shape1
          width={shapeSize}
          height={shapeSize}
          patternColor={patternColor}
          lightenColor={lightenColor}
          darkenColor={darkenColor}
        />
      ),
      shape2: (
        <Shape2
          width={shapeSize}
          height={shapeSize}
          patternColor={patternColor}
          lightenColor={lightenColor}
          darkenColor={darkenColor}
        />
      ),
      shape3: (
        <Shape3
          width={shapeSize}
          height={shapeSize}
          patternColor={patternColor}
          lightenColor={lightenColor}
          darkenColor={darkenColor}
        />
      ),
      shape4: (
        <Shape4
          width={shapeSize}
          height={shapeSize}
          patternColor={patternColor}
          lightenColor={lightenColor}
          darkenColor={darkenColor}
        />
      ),
      shape5: (
        <Shape5
          width={shapeSize}
          height={shapeSize}
          patternColor={patternColor}
          lightenColor={lightenColor}
          darkenColor={darkenColor}
        />
      ),
      shape6: (
        <Shape6
          width={shapeSize}
          height={shapeSize}
          patternColor={patternColor}
          lightenColor={lightenColor}
          darkenColor={darkenColor}
        />
      ),
      shape7: (
        <Shape7
          width={shapeSize}
          height={shapeSize}
          patternColor={patternColor}
          lightenColor={lightenColor}
          darkenColor={darkenColor}
        />
      ),
    };

    return shapeComponents[shapeName];
  };

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
      <Shape
        shapeName={shape}
        darkenColor={darkenColor}
        lightenColor={lightenColor}
        patternColor={hasPattern ? 'rgba(255,255,255,0.5)' : 'none'}
      />
      <Text style={{position: 'absolute'}}>{count}</Text>
    </AnimatedTouchable>
  );
};

const StarSearch = () => {
  const {spawnAreaHeight, spawnAreaWidth} = constants;
  const shapePositions = getShapePositions(20);
  const shapeStyles = generateShapeData(20, 3, 2, 1, false, false, true);

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
