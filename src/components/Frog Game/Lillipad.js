import {useRef} from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import {
  constants,
  generateSetOfLeaderFrogPositions,
} from '../../utilities/Frog Jump';
import {useContext} from 'react';
import {FrogGameContext} from '../../providers/FrogGame.Provider';
const {lillipadSize, leaderFrogSize, followerFrogSize} = constants;
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
  } = useContext(FrogGameContext);

  const handlePressIn = () => {
    const indexOfLillipad = id;

    currentAndFutureFollowerFrogPositions.current.push(
      lillipadPositions[indexOfLillipad],
    );
    setFollowerFrogPosition({
      ...lillipadPositions[indexOfLillipad],
    });

    currentAndFutureFollowerFrogPositions.current.push(
      lillipadPositions[
        leaderFrogPositionHistory.current[
          numberOfJumpsByFollowerFrog.current + 1
        ]
      ],
    );
    numberOfJumpsByFollowerFrog.current =
      numberOfJumpsByFollowerFrog.current + 1;

    setLeaderFrogPosition(() => {
      const newPositions = generateSetOfLeaderFrogPositions(
        currentLeaderFrogPosition.current,
        currentAndFutureFollowerFrogPositions.current,
        lillipadPositions,
        1,
      );
      const indexesOfNewPositions = newPositions.map(item => item.id);
      leaderFrogPositionHistory.current = [
        ...leaderFrogPositionHistory.current,
        ...indexesOfNewPositions,
      ];
      return newPositions;
    });
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
    backgroundColor: '#569e53',
    borderColor: '#0f3730',
    borderWidth: 5,
    borderRadius: lillipadSize / 2,
  },
});
export default Lillipad;
