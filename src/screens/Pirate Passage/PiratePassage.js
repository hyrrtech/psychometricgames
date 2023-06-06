import {useRef, useMemo, useContext} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Tile, Ship} from '../../components/Pirate Passage';
import {PiratePassageContext} from '../../providers/PiratePassage.Provider';
import {FontStyle} from '../../values/Font';
import PirateShip from '../../components/Pirate Passage/PirateShip';

const PiratePassage = () => {
  const {
    pathComponents,
    pathCoordinates,
    matrix,
    setPathIndexes,
    piratePathCoordinates,
    piratePathComponents,
    setGo,
  } = useContext(PiratePassageContext);

  const handle_go = () => {
    setGo(true);
  };
  const handle_undo = () => {
    setPathIndexes(prev => {
      const prevIndexes = prev.indexes;
      const prev_number_of_indexes_added = prev.number_of_indexes_added;
      if (prevIndexes.length === 1) {
        return prev;
      }

      const number_of_indexes_added_in_last_segment =
        prev_number_of_indexes_added[prev_number_of_indexes_added.length - 1];
      //remove number of indexes added in last segment from prevIndexes from end
      prevIndexes.splice(
        prevIndexes.length - number_of_indexes_added_in_last_segment,
        number_of_indexes_added_in_last_segment,
      );
      //remove number of indexes added in last segment from prev_number_of_indexes_added from end
      prev_number_of_indexes_added.pop();
      return {
        indexes: [...prevIndexes],
        number_of_indexes_added: [...prev_number_of_indexes_added],
      };
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#79eff2'}}>
      {matrix.map((row, rowIndex) => {
        return row.map((tile, colIndex) => {
          return (
            <Tile
              key={`${rowIndex}-${colIndex}`}
              index={tile.index}
              position={tile.position}
            />
          );
        });
      })}
      {piratePathComponents.map((line, index) => {
        return line.map(path => path);
      })}
      {pathComponents.map((line, index) => {
        return line;
      })}
      {piratePathCoordinates.map((piratePath, index) => {
        return (
          <PirateShip
            key={index}
            color={piratePath.color}
            shipPath={piratePath.pathCoordinates}
            initialPosition={piratePath.initialShipCoordinates}
            initialPositionIndex={piratePath.initialShipCoordinatesIndex}
            isLoop={piratePath.isLoop}
          />
        );
      })}

      <Ship color="yellow" shipPath={pathCoordinates} />

      <View style={styles.buttonContaienr}>
        <TouchableOpacity style={styles.button} onPress={handle_undo}>
          <Text style={styles.buttonText}>Undo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handle_go}>
          <Text style={styles.buttonText}>Go</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  buttonContaienr: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 70,
    flexDirection: 'row',
  },
  button: {
    height: '100%',
    width: '50%',
    backgroundColor: '#3c6966',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    ...FontStyle.h3,
    color: '#79eff2',
  },
});
export default PiratePassage;
