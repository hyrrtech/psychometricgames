import {Text, TouchableOpacity, Animated} from 'react-native';
import React, {useContext, useEffect, useRef, useMemo} from 'react';
import {PiratePassageContext} from '../../providers/PiratePassage.Provider';
import {constants} from '../../utilities/Pirate Passage';
const {tileSize} = constants;
const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);
const Tile = ({position, index, disabled}) => {
  const {dispatch, ACTIONS, demoState, showDemo, setDemoState, tapSequence} =
    useContext(PiratePassageContext);
  const highlightAnimation = useRef(new Animated.Value(0)).current;
  const colorInterpolate = highlightAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(100, 215, 220,0.8)', 'rgba(100, 215, 220,0.1)'],
  });

  const handlePress = () => {
    dispatch({type: ACTIONS.ADD_PATH, payload: {tileIndex: index}});
    if (showDemo) {
      setDemoState(prev => {
        let {tapSequenceIndex, demoStage, highlightedTileIndex} = prev;

        if (tapSequenceIndex === tapSequence.length) {
          demoStage++;
          highlightedTileIndex = [-1, -1];
        } else {
          highlightedTileIndex = tapSequence[tapSequenceIndex];
        }
        return {
          ...prev,
          tapSequenceIndex: tapSequenceIndex + 1,
          demoStage,
          highlightedTileIndex,
        };
      });
    }
  };

  const disableTap = useMemo(() => {
    if (
      showDemo &&
      demoState.highlightedTileIndex[0] === index[0] &&
      demoState.highlightedTileIndex[1] === index[1]
    )
      return false;
    if (
      showDemo &&
      demoState.highlightedTileIndex[0] !== index[0] &&
      demoState.highlightedTileIndex[1] !== index[1]
    )
      return true;
    return disabled;
  }, [disabled, demoState, showDemo]);

  useEffect(() => {
    if (showDemo) {
      if (
        demoState.highlightedTileIndex[0] === index[0] &&
        demoState.highlightedTileIndex[1] === index[1]
      ) {
        Animated.loop(
          Animated.sequence([
            Animated.timing(highlightAnimation, {
              toValue: 1,
              duration: 500,
              useNativeDriver: false,
            }),
            Animated.timing(highlightAnimation, {
              toValue: 0,
              duration: 500,
              useNativeDriver: false,
            }),
          ]),
        ).start();
      } else {
        highlightAnimation.setValue(0);
      }
    }
  }, [demoState, showDemo]);

  return (
    // <>
    <AnimatedTouchableOpacity
      disabled={disableTap}
      activeOpacity={0.5}
      onPressIn={handlePress}
      style={{
        height: tileSize,
        width: tileSize,

        position: 'absolute',
        backgroundColor: disabled ? 'transparent' : colorInterpolate,
        left: position.x - tileSize / 2,
        top: position.y - tileSize / 2,
      }}>
      {/* <Text>
        [{index[0]},{index[1]}]
      </Text> */}
    </AnimatedTouchableOpacity>
  );
  {
    /* <Animated.View
        style={{
          position: 'absolute',
          left: position.x - 10 / 2,
          top: position.y - 10 / 2,
          height: 10,
          width: 10,
          opacity: opacity,
          backgroundColor: 'white',
        }}></Animated.View>
    </> */
  }
};

export default Tile;
