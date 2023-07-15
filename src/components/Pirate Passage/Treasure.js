import {View} from 'react-native';
import {useContext} from 'react';
import {constants} from '../../utilities/Pirate Passage';
import {PiratePassageContext} from '../../providers/PiratePassage.Provider';
import TreasureMarkSvg from './SVG/TreasureMarkSvg';

const {shipSize} = constants;

const Treasure = ({index}) => {
  const {matrix} = useContext(PiratePassageContext);
  const coordinates = matrix[index[0]][index[1]].position;

  return (
    <View
      pointerEvents={'none'}
      style={{
        height: shipSize,
        width: shipSize,
        position: 'absolute',
        left: coordinates.x - shipSize / 2,
        top: coordinates.y - shipSize / 2,
      }}>
      <TreasureMarkSvg height={shipSize} width={shipSize} />
    </View>
  );
};

export default Treasure;
