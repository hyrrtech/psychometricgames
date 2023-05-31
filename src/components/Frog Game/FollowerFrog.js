import React, {useRef, useEffect, useContext} from 'react';
import {Animated, StyleSheet} from 'react-native';
import {FrogGameContext} from '../../providers/FrogGame.Provider';
import {
  constants,
  generateSetOfLeaderFrogPositions,
} from '../../utilities/Frog Jump';
const {followerFrogSize, speed} = constants;

const FollowerFrog = () => {
  const {
    followerFrogPosition: position,
    initialFollowerFrogPosition: initialPosition,
    setDisabled,
    recentFollowerFrogPositions,
    frogPositions,
    setLeaderFrogPosition,
    currentLeaderFrogPosition,
    leaderFrogPositionHistory,
  } = useContext(FrogGameContext);

  const animation = useRef(
    new Animated.ValueXY({x: initialPosition.x, y: initialPosition.y}),
  ).current;
  const previousPosition = useRef(initialPosition);
  const distance = Math.sqrt(
    Math.pow(position.x - previousPosition.current.x, 2) +
      Math.pow(position.y - previousPosition.current.y, 2),
  );
  const duration = (distance * 1000) / speed;

  useEffect(() => {
    setDisabled(true);
    Animated.timing(animation, {
      toValue: {x: position.x, y: position.y},
      duration: duration,
      useNativeDriver: true,
    }).start(({finished}) => {
      if (finished) {
        animation.setValue({x: position.x, y: position.y});
        previousPosition.current = position;
        setDisabled(false);
      }
    });
  }, [position]);
  return (
    <Animated.View
      style={[
        styles.frog,
        {
          transform: [{translateX: animation.x}, {translateY: animation.y}],
        },
      ]}></Animated.View>
  );
};

const styles = StyleSheet.create({
  frog: {
    position: 'absolute',
    width: followerFrogSize,
    height: followerFrogSize,
    backgroundColor: 'red',
    borderRadius: 10,
  },
});

export default FollowerFrog;
