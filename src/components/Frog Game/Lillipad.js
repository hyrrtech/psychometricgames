import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import {
  constants,
  generateSetOfLeaderFrogPositions,
} from '../../utilities/Frog Jump';
import {useContext} from 'react';
import {FrogGameContext} from '../../providers/FrogGame.Provider';
const {lillipadSize, followerFrogSize, leaderFrogSize} = constants;
const Lillipad = ({position, id}) => {
  const {
    disabled,
    frogPositions,
    setLeaderFrogPosition,
    lillipadPositions,
    followerFrogPosition,
    setFollowerFrogPosition,
    recentLeaderFrogPositions,
  } = useContext(FrogGameContext);

  const handlePressIn = () => {
    const index = lillipadPositions.findIndex(item => {
      return item.x === position.x && item.y === position.y;
    });
    setFollowerFrogPosition({
      x: frogPositions[index].x,
      y: frogPositions[index].y,
    });

    setLeaderFrogPosition(() =>
      generateSetOfLeaderFrogPositions(
        {
          x: frogPositions[index].x,
          y: frogPositions[index].y,
        },
        recentLeaderFrogPositions.current,
        frogPositions,
        1,
      ),
    );
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
