import {useContext} from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  Tile,
  Ship,
  Treasure,
  CollisionMark,
} from '../../components/Pirate Passage';
import CompletedPopup from '../../components/CompletedPopup';
import {GameWrapper} from '../../components/GameWrapper';
import {InfoLabel} from '../../components/InfoLabel';
import {Button} from '../../components/Button';
import BackgroundImage from '../../values/BackgroundImage';
import {COLORS} from '../../values/Colors';
import styles from './styles';
import {PiratePassageContext} from '../../providers/PiratePassage.Provider';
import {FontStyle} from '../../values/Font';
import PirateShip from '../../components/Pirate Passage/PirateShip';

const PiratePassage = () => {
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

  return loading ? (
    <ActivityIndicator size="large" color="#0000ff" />
  ) : completedPopup ? (
    <CompletedPopup gameName="SHARK" />
  ) : (
    <GameWrapper
      imageURL={BackgroundImage.SHARK}
      backgroundGradient={COLORS.sharkBGGrandient}
      scoreboard={[
        <InfoLabel
          label={'Score'}
          value={'1000'}
          style={styles.infoLabel}
          key="score"
        />,
      ]}
      controllerButtons={[
        <Button
          key="undo"
          style={styles.button}
          title={'UNDO'}
          onPress={handle_undo}
        />,
        <Button
          key="go"
          style={styles.button}
          disabled={disableGo}
          title={'GO'}
          onPress={handle_go}
        />,
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
