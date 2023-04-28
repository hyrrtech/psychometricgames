import {useRef, useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions, Animated, Easing} from 'react-native';
const RoadLine = ({position, color, delay}) => {
  const {height, width} = Dimensions.get('window');
  const roadLineHeight = height * 0.15;
  const roadLineWidth = width * 0.05;
  const roadHeight = height * 0.75;

  const lineAnimation = useRef(new Animated.Value(1)).current;
  const distanceFromTop = lineAnimation.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [-roadLineHeight, position, roadHeight + roadLineHeight],
  });
  //adjust duration according to distance  between animated values 0 to 1 and 1 to 2
  const distance01 = Math.abs(position - -roadLineHeight);
  const distance12 = Math.abs(roadHeight + roadLineHeight - position);
  const distanceTotal = distance01 + distance12;

  const duration0to1 = (distance01 / distanceTotal) * 3000; // adjust 3000 according to desired animation speed
  const duration1to2 = (distance12 / distanceTotal) * 3000;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(lineAnimation, {
          toValue: 0,
          duration: 0,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(lineAnimation, {
          toValue: 1,
          duration: duration0to1,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(lineAnimation, {
          toValue: 2,
          duration: duration1to2,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  }, []);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: distanceFromTop,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
      }}>
      <View
        style={{
          height: roadLineHeight,
          width: roadLineWidth,
          backgroundColor: color,
        }}
      />
      <View
        style={{
          height: roadLineHeight,
          width: roadLineWidth,
          backgroundColor: color,
        }}
      />
    </Animated.View>
  );
};

export default RoadLine;
