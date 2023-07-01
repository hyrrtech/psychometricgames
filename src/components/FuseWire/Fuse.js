import {useRef, useContext, useEffect, useState} from 'react';
import {PanResponder, Animated, StyleSheet, Text} from 'react-native';
import {FuseWireContext} from '../../providers/FuseWire.Provider';
import {constants} from '../../utilities/FuseWire';
import FuseSvg from './SVG/FuseSVG';
const {FuseHeight, FuseWidth, FuseHolderHeight, FuseHolderWidth} = constants;

const Fuse = ({position, value}) => {
  const {fuseHolders, level, dispatch, ACTIONS} = useContext(FuseWireContext);
  const currentFuseHolderId = useRef(null);
  const pan = useRef(new Animated.ValueXY(position)).current;
  const [fusePicked, setFusePicked] = useState(false);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      pan.setOffset(pan.__getValue());
      pan.setValue({x: 0, y: 0});
      setFusePicked(true);
    },
    onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
      useNativeDriver: false,
    }),

    onPanResponderRelease: (e, gesture) => {
      pan.flattenOffset();
      const {exist, position} = isDropZone(gesture);
      setFusePicked(false);
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
      dispatch({
        type: ACTIONS.RESET_FUSEHOLDER,
        payload: {
          currentFuseHolderId: currentFuseHolderId.current,
        },
      });
      currentFuseHolderId.current = null;
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

        dispatch({
          type: ACTIONS.SET_FUSEHOLDER,
          payload: {
            id: fuseHolder.id,
            value,
            currentFuseHolderId: currentFuseHolderId.current,
          },
        });
        currentFuseHolderId.current = fuseHolder.id;

        return true;
      }
    });

    return result;
  };

  useEffect(() => {
    pan.flattenOffset();
    Animated.spring(pan, {
      toValue: position,
      useNativeDriver: false,
    }).start();
  }, [level]);
  console.log(currentFuseHolderId.current);
  return (
    <Animated.View
      style={[{transform: pan.getTranslateTransform()}, styles.fuse]}
      {...panResponder.panHandlers}>
      <FuseSvg
        height={FuseHeight}
        width={FuseWidth}
        color={'#FFB906'}
        showPlugs={!fusePicked && currentFuseHolderId.current ? false : true}
      />
      <Text style={styles.text}>{value}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  fuse: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 25,
    position: 'absolute',
    textAlign: 'center',
  },
});
export default Fuse;
