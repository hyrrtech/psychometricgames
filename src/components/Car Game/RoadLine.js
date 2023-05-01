import {useRef, useEffect, useState} from 'react';
import {View, StyleSheet, Animated, Easing} from 'react-native';
const RoadLine = ({roadLineHeight, roadLineWidth}) => {
  return (
    <View
      style={{
        position: 'absolute',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        height: roadLineHeight,
      }}>
      <View
        style={{
          height: '100%',
          width: roadLineWidth,
          backgroundColor: 'white',
        }}
      />
      <View
        style={{
          height: '100%',
          width: roadLineWidth,
          backgroundColor: 'white',
        }}
      />
    </View>
  );
};

export default RoadLine;
