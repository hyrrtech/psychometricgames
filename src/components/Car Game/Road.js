import {useEffect, useRef, useMemo} from 'react';
import {View, Animated, Easing} from 'react-native';

const Road = ({
  roadHeight,
  roadWidth,
  roadLineWidth,
  interpolation,
  children,
}) => {
  const animation = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    animation.setValue(0);
    Animated.timing(animation, {
      toValue: 1,
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [interpolation]);

  const translation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, interpolation.translateX],
  });
  const rotation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', interpolation.rotateZ],
  });
  return (
    <Animated.View
      style={{
        bottom: roadHeight * 0.45,
        width: roadWidth,
        height: roadHeight,
        transform: [
          {translateX: translation},
          {rotateX: '86.6deg'},
          {rotateZ: rotation},
        ],
        backgroundColor: '#ce9048',
        borderRightColor: '#916027',
        borderRightWidth: roadWidth * 0.07,
        borderLeftColor: '#916027',
        borderLeftWidth: roadWidth * 0.07,
        overflow: 'hidden',
      }}>
      {children}
      <View
        style={{
          position: 'absolute',
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          height: roadHeight,
        }}>
        <View
          style={{
            height: '100%',
            width: roadLineWidth,
            backgroundColor: 'rgba(0,0,0,0.02)',
          }}
        />
        <View
          style={{
            height: '100%',
            width: roadLineWidth,
            backgroundColor: 'rgba(0,0,0,0.02)',
          }}
        />
      </View>
    </Animated.View>
  );
};

export default Road;
