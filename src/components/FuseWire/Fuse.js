import {useRef} from 'react';
import {View, PanResponder, Animated, StyleSheet, Text} from 'react-native';
import {constants} from '../../utilities/FuseWire';
const {FuseHeight, FuseWidth, FuseHolderHeight, FuseHolderWidth} = constants;
const Fuse = ({position, fuseHolders}) => {
  console.log('fuseHolders', fuseHolders);
  const pan = useRef(new Animated.ValueXY(position)).current;
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      pan.setOffset(pan.__getValue());
      pan.setValue({x: 0, y: 0});
    },
    onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
      useNativeDriver: false,
    }),

    onPanResponderRelease: (e, gesture) => {
      pan.flattenOffset();
      const {exist, position} = isDropZone(gesture);
      if (exist) {
        const {x, y} = position;
        Animated.spring(pan, {
          toValue: {
            x: x - FuseWidth / 2,
            y: y - FuseHeight / 2,
          },
          useNativeDriver: false,
        }).start();
      } else {
        resetPosition();
      }
    },
  });

  const resetPosition = () => {
    Animated.spring(pan, {
      toValue: position,
      useNativeDriver: false,
    }).start();
  };
  const isDropZone = gesture => {
    let result = {exist: false, position: null};

    fuseHolders.some(fuseHolder => {
      console.log('fuseHolder', fuseHolder);
      if (
        gesture.moveY > fuseHolder.position.y - FuseHolderHeight / 2 &&
        gesture.moveY <
          fuseHolder.position.y - FuseHolderHeight / 2 + FuseHolderHeight &&
        gesture.moveX > fuseHolder.position.x - FuseHolderWidth / 2 &&
        gesture.moveX <
          fuseHolder.position.x - FuseHolderWidth / 2 + FuseHolderWidth
      ) {
        result = {exist: true, position: fuseHolder.position};
        return true;
      }
    });

    return result;
  };
  return (
    <Animated.View
      style={[{transform: pan.getTranslateTransform()}, styles.fuse]}
      {...panResponder.panHandlers}></Animated.View>
  );
};

const styles = StyleSheet.create({
  fuse: {
    position: 'absolute',
    backgroundColor: '#1abc9c',
    width: FuseWidth,
    height: FuseHeight,
  },
});
export default Fuse;
