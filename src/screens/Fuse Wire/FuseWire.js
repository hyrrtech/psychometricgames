import React, {useEffect, useRef, useState} from 'react';
import {
  PanResponder,
  View,
  Animated,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
const Window = Dimensions.get('window');
const FuseSize = 36;
const dropZoneSize = 100;
const dropZonePosition = {x: 200, y: 200};
const originalFusePosition = {x: 100, y: 100};

const Drag = () => {
  const pan = useRef(new Animated.ValueXY(originalFusePosition)).current;
  //   useEffect(() => {
  //     pan.addListener(value => {
  //       console.log(value);
  //     });
  //   }, []);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      console.log(pan.__getValue());
      pan.setOffset(pan.__getValue());
      pan.setValue({x: 0, y: 0});
    },
    onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
      useNativeDriver: false,
    }),

    onPanResponderRelease: (e, gesture) => {
      pan.flattenOffset();
      if (isDropZone(gesture)) {
        console.log('dropped');
        Animated.spring(pan, {
          toValue: {
            x: 200 - FuseSize / 2,
            y: 200 - FuseSize / 2,
          },
          useNativeDriver: false,
        }).start();
      } else {
        console.log('not dropped');
        resetPosition();
      }
    },
  });

  const resetPosition = () => {
    Animated.spring(pan, {
      toValue: {x: 100, y: 100},
      useNativeDriver: false,
    }).start();
  };
  const isDropZone = gesture => {
    console.log(gesture, dropZonePosition, dropZoneSize);
    return (
      gesture.moveY > dropZonePosition.y &&
      gesture.moveY < dropZonePosition.y + dropZoneSize &&
      gesture.moveX > dropZonePosition.x &&
      gesture.moveX < dropZonePosition.x + dropZoneSize
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.dropZone}></View>
      <Animated.View
        style={[{transform: pan.getTranslateTransform()}, styles.circle]}
        {...panResponder.panHandlers}></Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  dropZone: {
    position: 'absolute',
    height: dropZoneSize,
    width: dropZoneSize,
    left: dropZonePosition.x - dropZoneSize / 2,
    top: dropZonePosition.y - dropZoneSize / 2,
    backgroundColor: '#2c3e50',
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
    width: FuseSize,
    height: FuseSize,
    borderRadius: FuseSize,
  },
});

export default Drag;
