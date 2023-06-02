import {Animated, StyleSheet} from 'react-native';
import {useEffect, useRef, useContext} from 'react';
import {constants} from '../../utilities/Frog Jump';
import {FrogGameContext} from '../../providers/FrogGame.Provider';
const {speed, leaderFrogSize, lillipadSize} = constants;
const LeaderFrog = () => {
  const {
    setDisabled,
    leaderFrogPosition,
    initialLeaderFrogPosition,
    currentLeaderFrogPosition,
    followerFrogPosition,
  } = useContext(FrogGameContext);

  const index = useRef(0);
  const previousLeaderFrogPosition = useRef(initialLeaderFrogPosition);

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

  const Animate = (from, to) => {
    setDisabled(true);
    const distance = Math.sqrt(
      Math.pow(to.position.x - from.position.x, 2) +
        Math.pow(to.position.y - from.position.y, 2),
    );
    const duration = (distance * 1000) / speed;
    currentLeaderFrogPosition.current = to;
    Animated.sequence([
      Animated.delay(500),
      Animated.timing(animation, {
        toValue: {
          x: to.position.x + (lillipadSize - leaderFrogSize) / 2,
          y: to.position.y + (lillipadSize - leaderFrogSize) / 2,
        },
        duration: duration,
        useNativeDriver: true,
      }),
    ]).start(({finished}) => {
      if (finished) {
        previousLeaderFrogPosition.current = to;
        setDisabled(false);
        if (index.current < leaderFrogPosition.length - 1) {
          index.current = index.current + 1;
          Animate(to, leaderFrogPosition[index.current]);
        }
      }
    });
  };

  useEffect(() => {
    index.current = 0;
    Animate(
      previousLeaderFrogPosition.current,
      leaderFrogPosition[index.current],
    );
  }, [leaderFrogPosition]);

  return (
    <Animated.View
      style={[
        styles.leaderFrog,
        {
          transform: [{translateX: animation.x}, {translateY: animation.y}],
        },
      ]}></Animated.View>
  );
};

const styles = StyleSheet.create({
  leaderFrog: {
    position: 'absolute',
    width: leaderFrogSize,
    height: leaderFrogSize,
    backgroundColor: 'green',
    borderRadius: 10,
  },
});

export default LeaderFrog;
