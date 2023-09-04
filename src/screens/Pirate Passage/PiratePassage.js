import {useContext, useEffect, useState, useMemo} from 'react';
import {View, ActivityIndicator, LayoutAnimation} from 'react-native';
import {
  Tile,
  Ship,
  Treasure,
  CollisionMark,
  Modal,
  PointerModal,
} from '../../components/Pirate Passage';
import CompletedPopup from '../../components/CompletedPopup';
import {GameWrapper} from '../../components/GameWrapper';
import BackgroundImage from '../../values/BackgroundImage';
import {COLORS} from '../../values/Colors';
import {PiratePassageContext} from '../../providers/PiratePassage.Provider';
import PirateShip from '../../components/Pirate Passage/PirateShip';
import {demoData} from '../../utilities/Pirate Passage';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    showDemo,
    demoState,
    setDemoState,
    tapSequence,
    setShowDemo,
    reachedTreasure,
  } = useContext(PiratePassageContext);

  const [buttonProps, setButtonProps] = useState({
    x: 0,
    y: 0,
    height: 0,
    width: 0,
  });

  const handle_go = () => {
    if (disableGo) return;
    dispatch({type: ACTIONS.GO});
  };

  const handle_undo = () => {
    if (showDemo) return;
    dispatch({type: ACTIONS.UNDO});
  };

  useEffect(() => {
    if (showCollision.collided || reachedTreasure)
      setTimeout(() => {
        navigation.navigate('Transition', {
          cameFrom: 'PiratePassage',
        });
      }, 500);
  }, [showCollision, reachedTreasure]);

  const ModalFlow = useMemo(() => {
    if (!showDemo) return null;
    switch (demoState.demoStage) {
      case 2:
        return (
          <Modal
            showContinue={false}
            content="Tap on the highlighted tile to create a path for your ship."
            style={{top: '10%'}}
            onPress={() => {
              LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
              setDemoState(prev => ({
                demoStage: prev.demoStage + 1,
                highlightedTileIndex: tapSequence[prev.tapSequenceIndex],
                tapSequenceIndex: prev.tapSequenceIndex + 1,
              }));
            }}
          />
        );

      case 3:
        return (
          <PointerModal
            content="Tap on the 'Go' button to begin your journey."
            buttonNumber={2}
            relativeDim={buttonProps}
          />
        );
      default:
        return null;
    }
  }, [showDemo, demoState]);

  return loading ? (
    <ActivityIndicator size="large" color="#0000ff" />
  ) : completedPopup ? (
    <CompletedPopup gameName="PIRATE PASSAGE" />
  ) : (
    <GameWrapper
      imageURL={BackgroundImage.SHARK}
      backgroundGradient={COLORS.piratePassageBGColor}
      {...(!showDemo ? {scoreboard: [{title: 'Score', value: '1000'}]} : {})}
      {...(showDemo && demoState.demoStage === 1
        ? {}
        : {
            controllerButtons: [
              {title: 'UNDO', onPress: handle_undo},
              {
                title: 'GO',
                onPress: handle_go,
                onLayout: event => {
                  event.target.measure((x, y, width, height, pageX, pageY) => {
                    setButtonProps({
                      x: x + pageX,
                      y: y + pageY,
                      height,
                      width,
                    });
                  });
                },
              },
            ],
          })}>
      {showDemo && (demoState.demoStage === 1 || demoState.demoStage === 4) ? (
        <Modal
          content={
            demoState.demoStage === 1
              ? `Instructions:\n\nNavigate your ship through treacherous seas while avoiding encounters with Pirate's dangerous ships.`
              : demoState.level < demoData.length
              ? 'Tap to begin next demo'
              : 'Great job! You have completed the demo.'
          }
          onPress={async () => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
            if (demoState.demoStage === 1) {
              setDemoState(prev => ({
                ...prev,
                demoStage: prev.demoStage + 1,
                highlightedTileIndex: tapSequence[0],
                tapSequenceIndex: prev.tapSequenceIndex + 1,
              }));
              return;
            }
            if (demoState.demoStage === 4) {
              if (demoState.level < demoData.length) {
                setDemoState(prev => ({
                  ...prev,
                  demoStage: 2,
                  level: prev.level + 1,
                  tapSequenceIndex: 1,
                  highlightedTileIndex: demoData[prev.level].tapSequence[0],
                }));
              } else {
                try {
                  await AsyncStorage.setItem('PIRATEPASSAGE_DEMO', 'FINISHED');
                  setShowDemo(false);
                } catch (err) {
                  console.log(err);
                  navigation.navigate('Tabs');
                }
              }
            }
          }}
        />
      ) : (
        <>
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
                    disabled={tile.disabled}
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
          {ModalFlow}
        </>
      )}
    </GameWrapper>
  );
};

export default PiratePassage;
