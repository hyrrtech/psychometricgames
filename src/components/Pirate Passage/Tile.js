import {
  Animated,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';
import React, {useRef, useContext} from 'react';
import {PiratePassageContext} from '../../providers/PiratePassage.Provider';
import {constants, getShortestPath} from '../../utilities/Pirate Passage';
const {tileSize} = constants;

const Tile = ({position, index}) => {
  const {setPathIndexes, matrix} = useContext(PiratePassageContext);
  // const opacity = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    setPathIndexes(prev => {
      const prevIndexes = prev.indexes;
      const prev_number_of_indexes_added = prev.number_of_indexes_added;
      let nextPath = getShortestPath(
        matrix,
        prev.indexes[prev.indexes.length - 1],
        index,
      );
      nextPath.splice(0, 1);
      const length_of_new_path_indexes = nextPath.length;

      return {
        indexes: [...prevIndexes, ...nextPath],
        number_of_indexes_added: [
          ...prev_number_of_indexes_added,
          length_of_new_path_indexes,
        ],
      };
    });
    // Animated.sequence([
    //   Animated.timing(opacity, {
    //     toValue: 1,
    //     duration: 300,
    //     useNativeDriver: true,
    //   }),
    //   Animated.timing(opacity, {
    //     toValue: 0,
    //     duration: 300,
    //     useNativeDriver: true,
    //   }),
    // ]).start();
  };

  return (
    // <>
    <TouchableOpacity
      activeOpacity={0.5}
      onPressIn={handlePress}
      style={{
        height: tileSize,
        width: tileSize,

        position: 'absolute',
        backgroundColor: '#64d7dc',
        left: position.x - tileSize / 2,
        top: position.y - tileSize / 2,
      }}>
      <Text>
        [{index[0]},{index[1]}]
      </Text>
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
