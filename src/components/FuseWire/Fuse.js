import {useRef, useContext} from 'react';
import {View, PanResponder, Animated, StyleSheet, Text} from 'react-native';
import {FuseWireContext} from '../../providers/FuseWire.Provider';
import {constants} from '../../utilities/FuseWire';
const {FuseHeight, FuseWidth, FuseHolderHeight, FuseHolderWidth} = constants;

const Fuse = ({position, value}) => {
  const {fuseHolders, setFuseHolders} = useContext(FuseWireContext);
  const currentFuseHolderId = useRef(null);
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

    if (currentFuseHolderId.current !== null) {
      setFuseHolders(prevState => {
        const newState = [...prevState];
        newState[currentFuseHolderId.current].isBlank = true;
        newState[currentFuseHolderId.current].inputValue = null;
        return newState;
      });
    }
  };
  const isDropZone = gesture => {
    let result = {exist: false, position: null};

    fuseHolders.some(fuseHolder => {
      if (
        gesture.moveY > fuseHolder.position.y - FuseHolderHeight / 2 &&
        gesture.moveY <
          fuseHolder.position.y - FuseHolderHeight / 2 + FuseHolderHeight &&
        gesture.moveX > fuseHolder.position.x - FuseHolderWidth / 2 &&
        gesture.moveX <
          fuseHolder.position.x - FuseHolderWidth / 2 + FuseHolderWidth &&
        fuseHolder.isBlank
      ) {
        result = {exist: true, position: fuseHolder.position};
        currentFuseHolderId.current = fuseHolder.id;
        setFuseHolders(prevState => {
          const newState = [...prevState];
          newState[fuseHolder.id].isBlank = false;
          newState[fuseHolder.id].inputValue = value;
          return newState;
        });
        return true;
      }
    });

    return result;
  };
  return (
    <Animated.View
      style={[{transform: pan.getTranslateTransform()}, styles.fuse]}
      {...panResponder.panHandlers}>
      <Text style={styles.text}>{value}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  fuse: {
    position: 'absolute',
    backgroundColor: '#1abc9c',
    width: FuseWidth,
    height: FuseHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 25,
  },
});
export default Fuse;
