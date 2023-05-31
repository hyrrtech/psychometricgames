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
    frogPositions,
    setLeaderFrogPosition,
    lillipadPositions,
    followerFrogPosition,
    leaderFrogPositionHistory,
    setFollowerFrogPosition,
    recentFollowerFrogPositions,
    currentLeaderFrogPosition,
  } = useContext(FrogGameContext);

  const handlePressIn = () => {
    const indexOfLillipad = lillipadPositions.findIndex(item => {
      return item.x === position.x && item.y === position.y;
    });
    setFollowerFrogPosition({
      x: frogPositions[indexOfLillipad].x,
      y: frogPositions[indexOfLillipad].y,
    });
    recentFollowerFrogPositions.current.push(frogPositions[indexOfLillipad]);
    setLeaderFrogPosition(() => {
      const newPositions = generateSetOfLeaderFrogPositions(
        currentLeaderFrogPosition.current,
        recentFollowerFrogPositions.current,
        frogPositions,
        1,
      );
      const indexesOfNewPositions = newPositions.map(item =>
        frogPositions.findIndex(
          frogPosition =>
            frogPosition.x ===
              item.x -
                (lillipadSize - leaderFrogSize) / 2 +
                (lillipadSize - followerFrogSize) / 2 &&
            frogPosition.y ===
              item.y -
                (lillipadSize - leaderFrogSize) / 2 +
                (lillipadSize - followerFrogSize) / 2,
        ),
      );
      leaderFrogPositionHistory.current = [
        ...leaderFrogPositionHistory.current,
        ...indexesOfNewPositions,
      ];
      return newPositions;
    });
  };

  return (
    <TouchableOpacity
      disabled={
        disabled
        //  ||
        // (position.x ===
        //   followerFrogPosition.x - (lillipadSize - followerFrogSize) / 2 &&
        //   position.y ===
        //     followerFrogPosition.y - (lillipadSize - followerFrogSize) / 2)
      }
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
