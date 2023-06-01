import {useContext} from 'react';
import {View} from 'react-native';
import {FollowerFrog, Lillipad} from '../../components/Frog Game';
import {FrogGameContext} from '../../providers/FrogGame.Provider';
import {constants} from '../../utilities/Frog Jump';

const {spawnAreaHeight, spawnAreaWidth} = constants;

const FrogJump = () => {
  const {lillipadPositions} = useContext(FrogGameContext);

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
              position={lillipad.position}
              id={lillipad.id}
            />
          );
        })}
        <FollowerFrog />
        {/* <LeaderFrog /> */}
      </View>
    </View>
  );
};

export default FrogJump;
