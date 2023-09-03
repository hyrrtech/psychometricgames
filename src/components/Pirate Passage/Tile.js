import {Text, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import {PiratePassageContext} from '../../providers/PiratePassage.Provider';
import {constants, getShortestPath} from '../../utilities/Pirate Passage';
const {tileSize} = constants;

const Tile = ({position, index, disabled}) => {
  const {dispatch, ACTIONS} = useContext(PiratePassageContext);

  const handlePress = () => {
    dispatch({type: ACTIONS.ADD_PATH, payload: {tileIndex: index}});
  };

  return (
    // <>
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.5}
      onPressIn={handlePress}
      style={{
        height: tileSize,
        width: tileSize,

        position: 'absolute',
        backgroundColor: disabled ? 'transparent' : 'rgba(100, 215, 220,0.8)',
        left: position.x - tileSize / 2,
        top: position.y - tileSize / 2,
      }}>
      {/* <Text>
        [{index[0]},{index[1]}]
      </Text> */}
    </TouchableOpacity>
  );
  {
    /* <Animated.View
        style={{
          position: 'absolute',
          left: position.x - 10 / 2,
          top: position.y - 10 / 2,
          height: 10,
          width: 10,
          opacity: opacity,
          backgroundColor: 'white',
        }}></Animated.View>
    </> */
  }
};

export default Tile;
