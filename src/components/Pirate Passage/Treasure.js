import {View} from 'react-native';
import {useContext} from 'react';
import {constants} from '../../utilities/Pirate Passage';
import {PiratePassageContext} from '../../providers/PiratePassage.Provider';
import TreasureMarkSvg from './SVG/TreasureMarkSvg';

const {treasureMarkSize} = constants;

const Treasure = ({index}) => {
  const {matrix} = useContext(PiratePassageContext);
  const coordinates = matrix[index[0]][index[1]].position;

  return (
    <View
      pointerEvents={'none'}
      style={{
        height: treasureMarkSize,
        width: treasureMarkSize,
        position: 'absolute',
        left: coordinates.x - treasureMarkSize / 2,
        top: coordinates.y - treasureMarkSize / 2,
      }}>
      <TreasureMarkSvg height={treasureMarkSize} width={treasureMarkSize} />
    </View>
  );
};

export default Treasure;
