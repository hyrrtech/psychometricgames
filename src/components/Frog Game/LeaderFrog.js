import {Animated, StyleSheet, Easing} from 'react-native';
import {useEffect, useRef, useContext, useState, createRef} from 'react';
import {constants} from '../../utilities/Frog Jump';
import {FrogGameContext} from '../../providers/FrogGame.Provider';
import Svg, {Path} from 'react-native-svg';
import {leaderElementColors as elementColors, frames} from './frames';
const {speed, leaderFrogSize, lillipadSize, spawnAreaHeight} = constants;

const getNewAngle = (a, b) => {
  const angle = Math.atan2(b.y - a.y, b.x - a.x) * (180 / Math.PI);
  return `${angle}deg`;
};
const LeaderFrog = () => {
  const {
    setDisabled,
    leaderFrogPosition,
    initialLeaderFrogPosition,
    currentLeaderFrogPosition,
    followerFrogPosition,
    interpolations,
  } = useContext(FrogGameContext);

  const [rotationAngle, setRotationAngle] = useState({
    from: '0deg',
    to: '0deg',
  });
  const index = useRef(0);
  const previousLeaderFrogPosition = useRef(initialLeaderFrogPosition);
  const rotationAnimation = useRef(new Animated.Value(0)).current;

  const animation = useRef(
    new Animated.ValueXY({
      x:
        previousLeaderFrogPosition.current.position.x +
        (lillipadSize - leaderFrogSize) / 2,
      y:
        previousLeaderFrogPosition.current.position.y +
        (lillipadSize - leaderFrogSize) / 2,
    }),
  ).current;
  const interpolateAnimation = useRef(new Animated.Value(0)).current;

  const refs = useRef(
    Object.keys(frames[0]).reduce((acc, key) => {
      acc[key] = createRef();
      return acc;
    }, {}),
  ).current;

  const Animate = (from, to) => {
    setDisabled(true);
    const distance = Math.sqrt(
      Math.pow(to.position.x - from.position.x, 2) +
        Math.pow(to.position.y - from.position.y, 2),
    );
    const duration = (distance * spawnAreaHeight) / speed;
    const rotateTo = getNewAngle(from.position, to.position);

    setRotationAngle(rotationAngle => {
      return {...rotationAngle, to: rotateTo};
    });
    currentLeaderFrogPosition.current = to;

    Animated.sequence([
      Animated.timing(rotationAnimation, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.delay(500),
      Animated.parallel([
        Animated.timing(interpolateAnimation, {
          toValue: 1,
          duration: duration,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: {
            x: to.position.x + (lillipadSize - leaderFrogSize) / 2,
            y: to.position.y + (lillipadSize - leaderFrogSize) / 2,
          },
          duration: duration,
          useNativeDriver: true,
        }),
      ]),
    ]).start(({finished}) => {
      if (finished) {
        previousLeaderFrogPosition.current = to;
        setDisabled(false);
        interpolateAnimation.setValue(0);
        rotationAnimation.setValue(0);
        setRotationAngle(rotationAngle => {
          return {...rotationAngle, from: rotationAngle.to};
        });
        if (index.current < leaderFrogPosition.length - 1) {
          index.current = index.current + 1;
          Animate(to, leaderFrogPosition[index.current]);
        }
      }
    });
  };

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
    index.current = 0;
    Animate(
      previousLeaderFrogPosition.current,
      leaderFrogPosition[index.current],
    );
  }, [leaderFrogPosition]);

  return (
    <Animated.View
      pointerEvents={'none'}
      style={[
        styles.leaderFrog,
        {
          transform: [
            {translateX: animation.x},
            {translateY: animation.y},
            {
              rotateZ: rotationAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [rotationAngle.from, rotationAngle.to],
              }),
            },
          ],
        },
      ]}>
      <Svg
        width={leaderFrogSize}
        height={leaderFrogSize}
        viewBox="0 0 453 453"
        style={{transform: [{rotateZ: '30deg'}]}}>
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
  leaderFrog: {
    position: 'absolute',
  },
});

export default LeaderFrog;
