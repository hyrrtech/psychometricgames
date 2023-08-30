import {useContext} from 'react';
import {View, ActivityIndicator} from 'react-native';
import Piece from '../../components/Masterpiece/Piece';
import CombinedPiece from '../../components/Masterpiece/CombinedPiece';
import {MasterpieceContext} from '../../providers/Masterpiece.Provider';
import {constants} from '../../utilities/Masterpiece';
import {GameWrapper} from '../../components/GameWrapper';
import CompletedPopup from '../../components/CompletedPopup';
import {COLORS} from '../../values';
import BackgroundImage from '../../values/BackgroundImage';
import Demo from './Demo';

const {
  ratio,
  combinedPiecePosition,
  barrierHeight,
  barrierWidth,
  barrierX,
  barrierY,
} = constants;

const Masterpiece = () => {
  const {
    data,
    piecesPosition,
    elementsData,
    setElementsData,
    pickedPieceId,
    positionsState,
    combinedPieceDimensions,
    showDemo,
  } = useContext(MasterpieceContext);

  const loading = false;
  const completedPopup = false;

  const handleRotate = direction => {
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

  return loading ? (
    <ActivityIndicator size="large" color="#0000ff" />
  ) : completedPopup ? (
    <CompletedPopup gameName="MasterPiece" />
  ) : showDemo ? (
    <Demo />
  ) : (
    <GameWrapper
      imageURL={BackgroundImage.Masterpiece}
      backgroundGradient={COLORS.masterPieceBGColor}
      scoreboard={[
        {
          title: 'Level',
          value: 1,
        },
      ]}
      controllerButtons={[
        {title: 'rotate left', onPress: () => handleRotate('left')},
        {title: 'rotate right', onPress: () => handleRotate('right')},
      ]}>
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
        {/* {positionsState.map((element, index) => (
          <View
            key={element.id}
            style={{
              position: 'absolute',
              height: ratio * 3,
              width: ratio * 3,
              backgroundColor: 'white',
              left: element.position.x - (ratio * 3) / 2,
              top: element.position.y - (ratio * 3) / 2,
            }}
          />
        ))} */}
      </View>
    </GameWrapper>
  );
};

export default Masterpiece;
