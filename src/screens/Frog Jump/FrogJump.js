import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import {useMemo, useState, useRef, useEffect} from 'react';

const {width: WINDOW_WIDTH, height: WINDOW_HEIGHT} = Dimensions.get('window');
const spawnAreaHeight = WINDOW_HEIGHT * 0.7;
const spawnAreaWidth = WINDOW_WIDTH * 0.9;
const lillipadSize = spawnAreaHeight * 0.17;
const followerFrogSize = lillipadSize * 0.4;
const leaderFrogSize = lillipadSize * 0.5;
const speed = 500;

const randomLillipadPosition = (num_of_lillipads, lillipadSize) => {
  let lillipads = [];
  for (let i = 0; i < num_of_lillipads; i++) {
    let newLillipad = {};
    const lillipadMaxTop = spawnAreaHeight - lillipadSize;
    const lillipadMaxLeft = spawnAreaWidth - lillipadSize;
    let lillipadY, lillipadX;
    do {
      lillipadY = Math.floor(Math.random() * lillipadMaxTop);
      lillipadX = Math.floor(Math.random() * lillipadMaxLeft);
    } while (
      lillipads.some(
        lillipad =>
          lillipad.x + lillipadSize > lillipadX &&
          lillipad.y + lillipadSize > lillipadY &&
          lillipad.x < lillipadX + lillipadSize &&
          lillipad.y < lillipadY + lillipadSize,
      )
    );
    newLillipad = {x: lillipadX, y: lillipadY};
    lillipads.push(newLillipad);
  }
  return lillipads;
};

const generateInitialSetOfLeaderFrogPositions = (
  frogPosition,
  frogPositions,
  number_of_initial_positions,
) => {
  let initialSetOfLeaderFrogPositions = [];
  let choosenFrogPositions = [];

  for (let i = 0; i < number_of_initial_positions; i++) {
    let newPositionIndex = Math.floor(Math.random() * frogPositions.length);
    while (
      choosenFrogPositions.includes(newPositionIndex) ||
      newPositionIndex ===
        frogPositions.findIndex(
          item => item.x === frogPosition.x && item.y === frogPosition.y,
        )
    ) {
      newPositionIndex = Math.floor(Math.random() * frogPositions.length);
    }
    choosenFrogPositions.push(newPositionIndex);
    let leaderFrogPosition = {
      x:
        frogPositions[newPositionIndex].x -
        (lillipadSize - followerFrogSize) / 2 +
        (lillipadSize - leaderFrogSize) / 2,
      y:
        frogPositions[newPositionIndex].y -
        (lillipadSize - followerFrogSize) / 2 +
        (lillipadSize - leaderFrogSize) / 2,
    };
    initialSetOfLeaderFrogPositions.push(leaderFrogPosition);
  }
  return initialSetOfLeaderFrogPositions;
};

const FollowerFrog = ({initialPosition, position}) => {
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
    Animated.timing(animation, {
      toValue: {x: position.x, y: position.y},
      duration: duration,
      useNativeDriver: true,
    }).start(({finished}) => {
      if (finished) {
        animation.setValue({x: position.x, y: position.y});
        previousPosition.current = position;
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

const LeaderFrog = ({leaderFrogPosition}) => {
  const currentPosition = useRef(0);
  const initialPosition = leaderFrogPosition[currentPosition.current];
  const animation = useRef(
    new Animated.ValueXY({x: initialPosition.x, y: initialPosition.y}),
  ).current;

  const Animate = (from, to) => {
    const distance = Math.sqrt(
      Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2),
    );
    const duration = (distance * 1000) / speed;

    Animated.sequence([
      Animated.delay(500),
      Animated.timing(animation, {
        toValue: {x: to.x, y: to.y},
        duration: duration,
        useNativeDriver: true,
      }),
    ]).start(({finished}) => {
      if (finished && currentPosition.current < leaderFrogPosition.length - 1) {
        currentPosition.current = currentPosition.current + 1;
        Animate(to, leaderFrogPosition[currentPosition.current]);
      }
    });
  };

  useEffect(() => {
    Animate(initialPosition, leaderFrogPosition[currentPosition.current + 1]);
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

const Lillipad = ({
  position,
  lillipadPositions,
  frogPositions,
  setFollowerFrogPosition,
}) => {
  return (
    <TouchableOpacity
      onPressIn={() => {
        const index = lillipadPositions.findIndex(item => {
          return item.x === position.x && item.y === position.y;
        });
        setFollowerFrogPosition({
          x: frogPositions[index].x,
          y: frogPositions[index].y,
        });
      }}
      activeOpacity={0.5}
      style={[
        styles.lillipad,
        {top: position.y, left: position.x},
      ]}></TouchableOpacity>
  );
};

const FrogJump = () => {
  const [lillipadPositions, frogPositions] = useMemo(() => {
    const lillipadPositions = randomLillipadPosition(7, lillipadSize);
    const frogPositions = lillipadPositions.map(lillipad => {
      return {
        x: lillipad.x + (lillipadSize - followerFrogSize) / 2,
        y: lillipad.y + (lillipadSize - followerFrogSize) / 2,
      };
    });
    return [lillipadPositions, frogPositions];
  }, []);

  const initialFrogPosition =
    frogPositions[Math.floor(Math.random() * frogPositions.length)];

  const [followerFrogPosition, setFollowerFrogPosition] = useState({
    x: initialFrogPosition.x,
    y: initialFrogPosition.y,
  });
  const [leaderFrogPosition, setLeaderFrogPosition] = useState(
    generateInitialSetOfLeaderFrogPositions(
      followerFrogPosition,
      frogPositions,
      4,
    ),
  );

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View
        style={{
          height: spawnAreaHeight,
          width: spawnAreaWidth,
          backgroundColor: '#1b5256',
        }}>
        {lillipadPositions.map((lillipad, index) => {
          return (
            <Lillipad
              key={index}
              position={lillipad}
              lillipadPositions={lillipadPositions}
              frogPositions={frogPositions}
              setFollowerFrogPosition={setFollowerFrogPosition}
            />
          );
        })}
        <FollowerFrog
          position={followerFrogPosition}
          initialPosition={followerFrogPosition}
        />
        <LeaderFrog leaderFrogPosition={leaderFrogPosition} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  lillipad: {
    position: 'absolute',
    width: lillipadSize,
    height: lillipadSize,
    backgroundColor: '#569e53',
    borderColor: '#0f3730',
    borderWidth: 5,
    borderRadius: lillipadSize / 2,
  },
  frog: {
    position: 'absolute',
    width: followerFrogSize,
    height: followerFrogSize,
    backgroundColor: 'red',
    borderRadius: 10,
    // zIndex: 2,
  },
  leaderFrog: {
    position: 'absolute',
    width: followerFrogSize + 10,
    height: followerFrogSize + 10,
    backgroundColor: 'green',
    borderRadius: 10,
  },
});

export default FrogJump;
