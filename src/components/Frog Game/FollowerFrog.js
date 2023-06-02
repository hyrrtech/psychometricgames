import React, {useRef, useEffect, useContext} from 'react';
import {Animated, StyleSheet} from 'react-native';
import {FrogGameContext} from '../../providers/FrogGame.Provider';
import {constants} from '../../utilities/Frog Jump';
const {followerFrogSize, speed, lillipadSize} = constants;

const FollowerFrog = () => {
  const {
    followerFrogPosition: currentPosition,
    initialFollowerFrogPosition: initialPosition,
    setDisabled,
  } = useContext(FrogGameContext);

  //navigation and check here if gameover

  const animation = useRef(
    new Animated.ValueXY({
      x: initialPosition.position.x + (lillipadSize - followerFrogSize) / 2,
      y: initialPosition.position.y + (lillipadSize - followerFrogSize) / 2,
    }),
  ).current;
  const previousPosition = useRef(initialPosition);
  const distance = Math.sqrt(
    Math.pow(currentPosition.position.x - previousPosition.current.x, 2) +
      Math.pow(currentPosition.position.y - previousPosition.current.y, 2),
  );
  const duration = (distance * 1000) / speed;

  useEffect(() => {
    setDisabled(true);
    Animated.timing(animation, {
      toValue: {
        x: currentPosition.position.x + (lillipadSize - followerFrogSize) / 2,
        y: currentPosition.position.y + (lillipadSize - followerFrogSize) / 2,
      },
      duration: duration,
      useNativeDriver: true,
    }).start(({finished}) => {
      if (finished) {
        animation.setValue({
          x: currentPosition.position.x + (lillipadSize - followerFrogSize) / 2,
          y: currentPosition.position.y + (lillipadSize - followerFrogSize) / 2,
        });
        previousPosition.current = currentPosition.position;
        setDisabled(false);
      }
    });
  }, [currentPosition]);
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
