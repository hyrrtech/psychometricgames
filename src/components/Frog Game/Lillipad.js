import {TouchableOpacity} from 'react-native';
import Svg, {Path, G} from 'react-native-svg';
import {
  constants,
  generateSetOfLeaderFrogPositions,
} from '../../utilities/Frog Jump';
import {useContext} from 'react';
import {FrogGameContext} from '../../providers/FrogGame.Provider';
const {lillipadSize} = constants;
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
    setGameOver,
  } = useContext(FrogGameContext);

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
      setGameOver(true);
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

  return (
    <TouchableOpacity
      disabled={disabled}
      onPressIn={handlePressIn}
      activeOpacity={0.5}
      style={{
        position: 'absolute',
        top: position.y,
        left: position.x,
        transform: [{rotateZ: rotation + 'deg'}],
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

        <Path
          d="M147.5 274C219.573 274 278 216.469 278 145.5C278 74.5314 219.573 17 147.5 17C75.4268 17 17 74.5314 17 145.5C17 216.469 75.4268 274 147.5 274Z"
          fill="#82af58"
        />
        <Path
          d="M146 150L65.3155 41C54.5589 48.4412 45.5729 58.1751 39 69.5061L146 150Z"
          fill="#103134"
        />
      </Svg>
    </TouchableOpacity>
  );
};

export default Lillipad;
