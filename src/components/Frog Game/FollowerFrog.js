import React, {useRef, useEffect, useContext, useState, createRef} from 'react';
import {Animated, StyleSheet, Easing} from 'react-native';
import {FrogGameContext} from '../../providers/FrogGame.Provider';
import {constants} from '../../utilities/Frog Jump';
import {followerElementColors as elementColors, frames} from './frames';
import Svg, {Path} from 'react-native-svg';
const {followerFrogSize, speed, lillipadSize, interpolations} = constants;
const getNewAngle = (a, b) => {
  const angle = Math.atan2(b.y - a.y, b.x - a.x) * (180 / Math.PI);
  return `${angle - 60}deg`;
};
const FollowerFrog = ({interpolations}) => {
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
  const rotationAnimation = useRef(new Animated.Value(0)).current;
  const rotationAngle = useRef({from: '-60deg', to: '-60deg'});
  const interpolateAnimation = useRef(new Animated.Value(0)).current;

  const refs = useRef(
    Object.keys(frames[0]).reduce((acc, key) => {
      acc[key] = createRef();
      return acc;
    }, {}),
  ).current;

  const distance = Math.sqrt(
    Math.pow(
      currentPosition.position.x - previousPosition.current.position.x,
      2,
    ) +
      Math.pow(
        currentPosition.position.y - previousPosition.current.position.y,
        2,
      ),
  );
  const duration = (distance * 1000) / speed;
  const rotateTo = getNewAngle(
    previousPosition.current.position,
    currentPosition.position,
  );

  rotationAngle.current.from = rotationAngle.current.to;
  rotationAngle.current.to = rotateTo;

  useEffect(() => {
    const listener = ({value}) => {
      const frameIndex = Math.floor(value * (frames.length - 1));
      const progress = value * (frames.length - 1) - frameIndex;

      Object.keys(frames[0]).forEach(key => {
        if (refs[key].current) {
          const path = interpolations[key][frameIndex](progress);
          refs[key].current.setNativeProps({d: path});
        }
      });
    };

    interpolateAnimation.addListener(listener);

    return () => {
      interpolateAnimation.removeListener(listener);
    };
  }, []);

  useEffect(() => {
    setDisabled(true);
    Animated.sequence([
      Animated.timing(rotationAnimation, {
        toValue: 1,
        duration: duration,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
      Animated.parallel([
        Animated.timing(interpolateAnimation, {
          toValue: 1,
          duration: duration,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: {
            x:
              currentPosition.position.x +
              (lillipadSize - followerFrogSize) / 2,
            y:
              currentPosition.position.y +
              (lillipadSize - followerFrogSize) / 2,
          },
          duration: duration,
          useNativeDriver: true,
        }),
      ]),
    ]).start(({finished}) => {
      if (finished) {
        animation.setValue({
          x: currentPosition.position.x + (lillipadSize - followerFrogSize) / 2,
          y: currentPosition.position.y + (lillipadSize - followerFrogSize) / 2,
        });
        interpolateAnimation.setValue(0);
        rotationAnimation.setValue(0);
        previousPosition.current = currentPosition;
        setDisabled(false);
      }
    });
  }, [currentPosition]);
  return (
    <Animated.View
      pointerEvents={'none'}
      style={[
        styles.frog,
        {
          transform: [
            {translateX: animation.x},
            {translateY: animation.y},
            {
              rotateZ: rotationAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [
                  rotationAngle.current.from,
                  rotationAngle.current.to,
                ],
              }),
            },
          ],
        },
      ]}>
      <Svg
        width={followerFrogSize}
        height={followerFrogSize}
        viewBox="0 0 453 453">
        {Object.keys(frames[0]).map(key => (
          <Path
            key={key}
            d={frames[0][key]}
            ref={refs[key]}
            fill={elementColors[key]}
          />
        ))}
      </Svg>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  frog: {
    position: 'absolute',
  },
});

export default FollowerFrog;
