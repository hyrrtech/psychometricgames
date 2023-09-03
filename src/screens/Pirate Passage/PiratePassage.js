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

  const ModalFlow = useMemo(() => {
    if (!showDemo) return null;
    switch (demoState.demoStage) {
      case 2:
        return (
          <Modal
            showContinue={false}
            content="intro 2"
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
            content="tap here to check"
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
      {showDemo && demoState.demoStage === 1 ? (
        <Modal
          content="intro"
          onPress={() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
            setDemoState(prev => ({
              demoStage: prev.demoStage + 1,
              highlightedTileIndex: tapSequence[prev.tapSequenceIndex],
              tapSequenceIndex: prev.tapSequenceIndex + 1,
            }));
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
