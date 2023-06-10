import {View} from 'react-native';
import {useContext} from 'react';
import {constants} from '../../utilities/Pirate Passage';
import {PiratePassageContext} from '../../providers/PiratePassage.Provider';

const {shipSize} = constants;

const Treasure = ({color, index}) => {
  const {matrix} = useContext(PiratePassageContext);
  const coordinates = matrix[index[0]][index[1]].position;

  return (
    <View
      pointerEvents={'none'}
      style={{
        height: shipSize,
        width: shipSize,
        backgroundColor: color,
        position: 'absolute',
        left: coordinates.x - shipSize / 2,
        top: coordinates.y - shipSize / 2,
      }}></View>
  );
};

export default Treasure;
