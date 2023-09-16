import {TouchableOpacity, Text, Animated} from 'react-native';
import Svg, {Path, G} from 'react-native-svg';
import {
  constants,
  generateSetOfLeaderFrogPositions,
} from '../../utilities/Frog Jump';
import {useContext, useEffect, useMemo, useRef} from 'react';
import {FrogGameContext} from '../../providers/FrogGame.Provider';

const AnimatedPath = Animated.createAnimatedComponent(Path);

const {lillipadSize} = constants;
const shakeOffset = lillipadSize / 10;
const Lillipad = ({position, id, rotation}) => {
  const {
    disabled,
    setLeaderFrogPosition,
    lillipadPositions,
    leaderFrogPositionHistory,
    setFollowerFrogPosition,
    currentAndFutureFollowerFrogPositions,
    currentLeaderFrogPosition,
    numberOfJumpsByFollowerFrog,
    followerFrogPosition,
    setGameOver,
    lives,
    setLives,
    showDemo,
    correctLillipadId,
    setCorrectLillipadId,
  } = useContext(FrogGameContext);
  const highlightAnimation = useRef(new Animated.Value(0)).current;
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  const shakeInterpolate = shakeAnimation.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [0, -shakeOffset, 0, shakeOffset, 0],
  });

  const disableTap = useMemo(() => {
    if (!showDemo) return disabled;
    return (
      !disabled &&
      id !==
        leaderFrogPositionHistory.current[numberOfJumpsByFollowerFrog.current]
    );
  });

  const handlePressIn = () => {
    const indexOfLillipad = id;
    //reserve current position for the follower frog
    currentAndFutureFollowerFrogPositions.current.push(
      lillipadPositions[indexOfLillipad],
    );
    if (
      indexOfLillipad !==
      leaderFrogPositionHistory.current[numberOfJumpsByFollowerFrog.current]
    ) {
      setCorrectLillipadId(
        leaderFrogPositionHistory.current[numberOfJumpsByFollowerFrog.current],
      );

      return;
    }
    setFollowerFrogPosition({
      ...lillipadPositions[indexOfLillipad],
    });

    //reserving 2 future positions for the follower frog
    currentAndFutureFollowerFrogPositions.current.push(
      lillipadPositions[
        leaderFrogPositionHistory.current[
          numberOfJumpsByFollowerFrog.current + 1
        ]
      ],
      lillipadPositions[
        leaderFrogPositionHistory.current[
          numberOfJumpsByFollowerFrog.current + 2
        ]
      ],
    );
    numberOfJumpsByFollowerFrog.current =
      numberOfJumpsByFollowerFrog.current + 1;
    if (numberOfJumpsByFollowerFrog.current >= 2) {
      setLeaderFrogPosition(() => {
        const newPositions = generateSetOfLeaderFrogPositions(
          currentLeaderFrogPosition.current,
          currentAndFutureFollowerFrogPositions.current,
          lillipadPositions,
          numberOfJumpsByFollowerFrog.current % 5 === 0 ? 2 : 1,
        );
        const indexesOfNewPositions = newPositions.map(item => item.id);
        leaderFrogPositionHistory.current = [
          ...leaderFrogPositionHistory.current,
          ...indexesOfNewPositions,
        ];
        return newPositions;
      });
    }
  };

  useEffect(() => {
    if (correctLillipadId === id) {
      Animated.timing(shakeAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(({finished}) => {
        if (finished) {
          shakeAnimation.setValue(0);
          setCorrectLillipadId(null);
          if (lives === 1) {
            setGameOver(true);
          } else {
            setLives(lives - 1);
          }
        }
      });
    }
  }, [correctLillipadId]);

  useEffect(() => {
    if (
      showDemo &&
      id ===
        leaderFrogPositionHistory.current[numberOfJumpsByFollowerFrog.current]
    ) {
      // console.log(id);
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
  }, [followerFrogPosition, showDemo]);

  const interpolateColor = highlightAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#82af58', '#bafb7e'],
  });

  return (
    <TouchableOpacity
      disabled={disableTap}
      onPressIn={handlePressIn}
      activeOpacity={0.5}
      style={{
        position: 'absolute',
        top: position.y,
        left: position.x,
        transform: [
          {rotateZ: rotation + 'deg'},
          {translateX: shakeInterpolate},
        ],
      }}>
      <Svg
        width={lillipadSize}
        height={lillipadSize}
        viewBox="0 0 294 294"
        fill="none">
        <Path
          d="M147 294C228.186 294 294 228.186 294 147C294 65.8141 228.186 0 147 0C65.8141 0 0 65.8141 0 147C0 228.186 65.8141 294 147 294Z"
          fill="#103134"
        />

        <AnimatedPath
          d="M147.5 274C219.573 274 278 216.469 278 145.5C278 74.5314 219.573 17 147.5 17C75.4268 17 17 74.5314 17 145.5C17 216.469 75.4268 274 147.5 274Z"
          fill={interpolateColor}
        />
        <Path
          d="M146 150L65.3155 41C54.5589 48.4412 45.5729 58.1751 39 69.5061L146 150Z"
          fill="#103134"
        />
      </Svg>
      {/* <Text style={{position: 'absolute'}}>{id}</Text> */}
    </TouchableOpacity>
  );
};

export default Lillipad;
