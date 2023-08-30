import {useContext, useEffect, useMemo} from 'react';
import {View, LayoutAnimation} from 'react-native';
import Piece from '../../components/Masterpiece/Piece';
import CombinedPiece from '../../components/Masterpiece/CombinedPiece';
import Modal from '../../components/Masterpiece/modal';
import {MasterpieceContext} from '../../providers/Masterpiece.Provider';
import {constants} from '../../utilities/Masterpiece';
import {GameWrapper} from '../../components/GameWrapper';
import {COLORS} from '../../values';
import BackgroundImage from '../../values/BackgroundImage';

const {
  ratio,
  combinedPiecePosition,
  barrierHeight,
  barrierWidth,
  barrierX,
  barrierY,
} = constants;

const Demo = () => {
  const {
    data,
    piecesPosition,
    elementsData,
    setElementsData,
    pickedPieceId,
    combinedPieceDimensions,
    showDemo,
    demoState,
    setShowDemo,
    setDemoState,
  } = useContext(MasterpieceContext);

  const handleRotate = direction => {
    if (showDemo && demoState.demoStage !== 1) return;

    const newElementsData = elementsData.map(element => {
      if (element.id === pickedPieceId) {
        let newRotation = element.pieceRotationAngle;
        if (direction === 'left') newRotation -= 72;
        if (direction === 'right') newRotation += 72;
        return {
          ...element,
          pieceRotationAngle: newRotation,
        };
      }
      return element;
    });
    setElementsData(newElementsData);
  };

  useEffect(() => {
    const isAt0deg = elementsData.every(
      element => element.pieceRotationAngle % 360 === 0,
    );
    if (isAt0deg && demoState.demoStage === 1) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
      setDemoState(prev => ({...prev, demoStage: prev.demoStage + 1}));
    }
  }, [elementsData]);

  const ModalFlow = useMemo(() => {
    if (!showDemo) return null;
    switch (demoState.demoStage) {
      case 1:
        return (
          <Modal
            content="Tap on the piece to select it and rotate it the correct angle using the RROTATE LEFT and ROTATE RIGHT Buttons"
            style={{top: '10%'}}
            showContinue={false}
          />
        );
      case 2:
        return (
          <Modal
            content="Drag the piece to the correct position"
            style={{top: '10%'}}
            showContinue={false}
          />
        );

      default:
        return null;
    }
  }, [demoState, showDemo]);

  return (
    <GameWrapper
      imageURL={BackgroundImage.Masterpiece}
      backgroundGradient={COLORS.masterPieceBGColor}
      {...(demoState.demoStage !== 3
        ? {
            controllerButtons: [
              {title: 'rotate left', onPress: () => handleRotate('left')},
              {title: 'rotate right', onPress: () => handleRotate('right')},
            ],
          }
        : {})}>
      {demoState.demoStage === 3 ? (
        <Modal
          content={'Good job'}
          onPress={() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
            setShowDemo(false);
          }}
        />
      ) : (
        <>
          <CombinedPiece
            position={combinedPiecePosition}
            viewBox={data.fullSVGComponent.viewBox}
            dimensions={combinedPieceDimensions}
            fill={data.fillColor}
            paths={elementsData}
          />

          <View style={{flex: 1, position: 'absolute', left: 0, top: 0}}>
            <View
              style={{
                position: 'absolute',
                top: barrierY,
                left: barrierX,
                height: barrierHeight,
                width: barrierWidth,
                zIndex: -1,
              }}
            />
            {elementsData.map(element => (
              <Piece
                id={element.id}
                key={element.id}
                pathD={element.path}
                viewBox={element.viewBox}
                initialPosition={piecesPosition[element.id].position}
                pieceCorrectPositon={element.pieceCorrectPositon}
                rotation={element.pieceRotationAngle}
              />
            ))}
          </View>
          {ModalFlow}
        </>
      )}
    </GameWrapper>
  );
};

export default Demo;
