import {useContext} from 'react';
import {constants} from '../../utilities/Pirate Passage';
import {View} from 'react-native';
const {collisionMarkSize} = constants;
import {PiratePassageContext} from '../../providers/PiratePassage.Provider';
import CollisionMarkSvg from './SVG/CollisionMarkSvg';
const CollisionMark = ({position}) => {
  const {matrix} = useContext(PiratePassageContext);
  const coordinates = matrix[position[0]][position[1]].position;

  return (
    <View
      style={{
        width: collisionMarkSize,
        height: collisionMarkSize,
        position: 'absolute',
        top: coordinates.y - collisionMarkSize / 2,
        left: coordinates.x - collisionMarkSize / 2,
        zIndex: 1000,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <CollisionMarkSvg height={collisionMarkSize} width={collisionMarkSize} />
    </View>
  );
};

export default CollisionMark;
