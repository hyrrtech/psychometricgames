import {useContext} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Tile, Ship, Treasure} from '../../components/Pirate Passage';
import {PiratePassageContext} from '../../providers/PiratePassage.Provider';
import {FontStyle} from '../../values/Font';
import PirateShip from '../../components/Pirate Passage/PirateShip';

const PiratePassage = () => {
  const {
    pathComponents,
    pathCoordinates,
    matrix,
    piratePathCoordinates,
    piratePathComponents,
    treasureIndex,
    dispatch,
    ACTIONS,
  } = useContext(PiratePassageContext);

  const handle_go = () => {
    dispatch({type: ACTIONS.GO});
  };

  const handle_undo = () => {
    dispatch({type: ACTIONS.UNDO});
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
      {piratePathComponents.map(line => {
        return line.map(path => path);
      })}
      {pathComponents.map(line => {
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
      <Treasure color="orange" index={treasureIndex} />
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
