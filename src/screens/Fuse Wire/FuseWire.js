import React, {useEffect, useRef, useState} from 'react';
import {PanResponder, View, Animated, StyleSheet, Text} from 'react-native';
import {constants, generateRangeInAsc} from '../../utilities/FuseWire';
import FuseHolder from '../../components/FuseWire/FuseHolder';
import Fuse from '../../components/FuseWire/Fuse';
const {FuseHeight, FuseWidth, FuseHolderHeight, FuseHolderWidth} = constants;

const dropZonePosition = {
  x: 200 - FuseHolderWidth / 2,
  y: 200 - FuseHolderHeight / 2,
};
const originalFusePosition = {x: 100 - FuseWidth / 2, y: 100 - FuseHeight / 2};

const Drag = () => {
  const pan = useRef(new Animated.ValueXY(originalFusePosition)).current;
  const fuseHolders = [
    {position: {x: 100, y: 150}},
    {position: {x: 100, y: 250}},
    {position: {x: 100, y: 350}},
    {position: {x: 100, y: 450}},
  ];

  return (
    <View style={styles.mainContainer}>
      {fuseHolders.map((fuseHolder, index) => (
        <FuseHolder key={index} position={fuseHolder.position} />
      ))}

      <Fuse position={{x: 200, y: 200}} fuseHolders={fuseHolders} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },

  text: {
    marginTop: 25,
    marginLeft: 5,
    marginRight: 5,
    textAlign: 'center',
    color: '#fff',
  },

  circle: {
    position: 'absolute',
    backgroundColor: '#1abc9c',
    width: FuseWidth,
    height: FuseHeight,
  },
});

export default Drag;
