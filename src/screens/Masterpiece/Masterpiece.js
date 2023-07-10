import {View, StyleSheet} from 'react-native';
import Piece from '../../components/Masterpiece/Piece';
import CombinedPiece from '../../components/Masterpiece/CombinedPiece';
import {useContext} from 'react';
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
    positionsState,
    combinedPieceDimensions,
  } = useContext(MasterpieceContext);
  const getCorrespondingPiecePositionFromId = id => {
    const item = piecesPosition.find(piece => piece.id === id);
    return item ? item.position : null;
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
          initialPosition={getCorrespondingPiecePositionFromId(element.id)}
          pieceCorrectPositon={element.pieceCorrectPositon}
        />
      ))}
      {positionsState.map((element, index) => (
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
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Masterpiece;
