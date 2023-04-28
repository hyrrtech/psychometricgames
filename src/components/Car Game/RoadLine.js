import {useRef, useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions, Animated, Easing} from 'react-native';
const RoadLine = ({position, color, delay}) => {
  const {height, width} = Dimensions.get('window');
  const roadLineHeight = height * 0.1;
  const roadLineWidth = width * 0.05;
  const roadHeight = height;

  const lineAnimation = useRef(new Animated.Value(1)).current;
  const distanceFromTop = lineAnimation.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [-roadLineHeight, position, roadHeight + roadLineHeight],
  });
  //adjust duration according to distance  between animated values 0 to 1 and 1 to 2
  const distance01 = Math.abs(position + roadLineHeight);
  const distance12 = Math.abs(roadHeight + roadLineHeight - position);

  const totalDistance = roadHeight + 2 * roadLineHeight + position;
  const duration0to1 = (distance01 / totalDistance) * 2000;
  const duration1to2 = (distance12 / totalDistance) * 2000;

  useEffect(() => {
    Animated.sequence([
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
      ),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={{
        position: 'absolute',

        transform: [{translateY: distanceFromTop}],
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        height: roadLineHeight,
        backgroundColor: '#606060',
      }}>
      <View
        style={{
          height: '100%',
          width: roadLineWidth,
          backgroundColor: color,
        }}
      />
      <View
        style={{
          height: '100%',
          width: roadLineWidth,
          backgroundColor: color,
        }}
      />
    </Animated.View>
  );
};

export default RoadLine;
