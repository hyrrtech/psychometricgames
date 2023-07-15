import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import {
  constants,
  generateSetOfLeaderFrogPositions,
} from '../../utilities/Frog Jump';
import {useContext} from 'react';
import {FrogGameContext} from '../../providers/FrogGame.Provider';
const {lillipadSize} = constants;
const Lillipad = ({position, id}) => {
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
      style={[styles.lillipad, {top: position.y, left: position.x}]}>
      <Text style={{color: 'white'}}>{id}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  lillipad: {
    position: 'absolute',
    width: lillipadSize,
    height: lillipadSize,
    backgroundColor: '#a9d26c',
    borderColor: '#0f3730',
    borderWidth: 5,
    borderRadius: lillipadSize / 2,
  },
});
export default Lillipad;
