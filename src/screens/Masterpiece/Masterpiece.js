import {useContext, useEffect} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import Piece from '../../components/Masterpiece/Piece';
import CombinedPiece from '../../components/Masterpiece/CombinedPiece';
import {MasterpieceContext} from '../../providers/Masterpiece.Provider';
import {constants} from '../../utilities/Masterpiece';
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
  } = useContext(MasterpieceContext);

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

  return (
    <View style={styles.container}>
      <CombinedPiece
        position={combinedPiecePosition}
        viewBox={data.fullSVGComponent.viewBox}
        dimensions={combinedPieceDimensions}
        fill={data.fillColor}
        paths={elementsData}
      />
      <View
        style={{
          position: 'absolute',
          top: barrierY,
          left: barrierX,
          height: barrierHeight,
          width: barrierWidth,
          backgroundColor: 'rgba(0,0,0,0.4)',
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
      <View
        style={{
          flexDirection: 'row',
          bottom: 0,
          position: 'absolute',
          width: '100%',
          justifyContent: 'space-around',
        }}>
        <Button title="rotate left" onPress={() => handleRotate('left')} />
        <Button title="rotate right" onPress={() => handleRotate('right')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Masterpiece;
