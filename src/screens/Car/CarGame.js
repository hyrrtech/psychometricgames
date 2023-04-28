import React, {useRef, useState, useEffect} from 'react';
import Sky from '../../components/Car Game/Sky';
import Road from '../../components/Car Game/Road';
import RoadLine from '../../components/Car Game/RoadLine';

import {Animated, Dimensions, ScrollView, StyleSheet, View} from 'react-native';
const CarGame = () => {
  const {height, width} = Dimensions.get('window');
  const roadHeight = height;
  // const roadHeight = height * 0.75;
  const roadWidth = width * 0.6;
  const roadLineHeight = height * 0.15;

  const linePositions = [
    {position: 100, color: 'white'},
    {position: 400, color: 'white'},
    // {position: 700, color: 'white'},
  ];

  return (
    <View style={styles.container}>
      <Sky />
      <Road roadHeight={roadHeight} roadWidth={roadWidth}>
        {linePositions.map((position, index) => (
          <RoadLine
            key={index}
            position={position.position}
            color={position.color}
            delay={position.delay}
          />
        ))}
      </Road>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'green',
  },
});
export default CarGame;
