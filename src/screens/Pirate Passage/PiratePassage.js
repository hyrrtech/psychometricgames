import {useContext, useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {
  Tile,
  Ship,
  Treasure,
  CollisionMark,
} from '../../components/Pirate Passage';
import CompletedPopup from '../../components/CompletedPopup';
import {GameWrapper} from '../../components/GameWrapper';
import BackgroundImage from '../../values/BackgroundImage';
import {COLORS} from '../../values/Colors';
import {PiratePassageContext} from '../../providers/PiratePassage.Provider';
import PirateShip from '../../components/Pirate Passage/PirateShip';

const PiratePassage = ({navigation}) => {
  const {
    disableGo,
    pathComponents,
    pathCoordinates,
    matrix,
    piratePathCoordinates,
    piratePathComponents,
    treasureIndex,
    dispatch,
    ACTIONS,
    showCollision,
    loading,
    completedPopup,
  } = useContext(PiratePassageContext);

  const handle_go = () => {
    dispatch({type: ACTIONS.GO});
  };

  const handle_undo = () => {
    dispatch({type: ACTIONS.UNDO});
  };

  useEffect(() => {
    if (showCollision.collided)
      setTimeout(() => {
        navigation.navigate('Transition', {
          cameFrom: 'PiratePassage',
        });
      }, 500);
  }, [showCollision]);

  return loading ? (
    <ActivityIndicator size="large" color="#0000ff" />
  ) : completedPopup ? (
    <CompletedPopup gameName="PIRATE PASSAGE" />
  ) : (
    <GameWrapper
      imageURL={BackgroundImage.SHARK}
      backgroundGradient={COLORS.piratePassageBGColor}
      scoreboard={[{title: 'Score', value: '1000'}]}
      controllerButtons={[
        {title: 'UNDO', onPress: handle_undo},
        {title: 'GO', onPress: handle_go},
      ]}>
      <View
        style={{
          position: 'absolute',
          backgroundColor: '#79eff2',
          left: 0,
          top: 0,
        }}>
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
              moveDirection={piratePath.moveDirection}
            />
          );
        })}

        <Ship shipPath={pathCoordinates} />
        <Treasure index={treasureIndex} />
        {showCollision.collided && (
          <CollisionMark position={showCollision.shipPosition} />
        )}
      </View>
    </GameWrapper>
  );
};
// const styles = StyleSheet.create({
//   buttonContaienr: {
//     position: 'absolute',
//     bottom: 0,
//     width: '100%',
//     height: 70,
//     flexDirection: 'row',
//   },
//   button: {
//     height: '100%',
//     width: '50%',
//     backgroundColor: '#3c6966',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   buttonText: {
//     ...FontStyle.h3,
//     color: '#79eff2',
//   },
// });
export default PiratePassage;
