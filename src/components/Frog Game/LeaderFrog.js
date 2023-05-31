import {Animated, StyleSheet} from 'react-native';
import {useEffect, useRef, useContext} from 'react';
import {constants} from '../../utilities/Frog Jump';
import {FrogGameContext} from '../../providers/FrogGame.Provider';
const {speed, leaderFrogSize, lillipadSize, followerFrogSize} = constants;
const LeaderFrog = () => {
  const {
    setDisabled,
    leaderFrogPosition,
    initialLeaderFrogPosition,
    currentLeaderFrogPosition,
    followerFrogPosition,
    frogPositions,
  } = useContext(FrogGameContext);
  const index = useRef(0);
  const previousLeaderFrogPosition = useRef(initialLeaderFrogPosition);
  const animation = useRef(
    new Animated.ValueXY({
      x: previousLeaderFrogPosition.current.x,
      y: previousLeaderFrogPosition.current.y,
    }),
  ).current;

  const Animate = (from, to) => {
    const distance = Math.sqrt(
      Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2),
    );
    const duration = (distance * 1000) / speed;
    currentLeaderFrogPosition.current = to;
    Animated.sequence([
      Animated.delay(500),
      Animated.timing(animation, {
        toValue: {x: to.x, y: to.y},
        duration: duration,
        useNativeDriver: true,
      }),
    ]).start(({finished}) => {
      previousLeaderFrogPosition.current = to;
      if (finished && index.current < leaderFrogPosition.length - 1) {
        index.current = index.current + 1;
        Animate(to, leaderFrogPosition[index.current]);
      }
    });
  };

  useEffect(() => {
    index.current = 0;
    Animate(
      previousLeaderFrogPosition.current,
      leaderFrogPosition[index.current],
    );
  }, [followerFrogPosition]);

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
