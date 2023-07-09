import {View, StyleSheet} from 'react-native';
import Piece from '../../components/Masterpiece/Piece';
import CombinedPiece from '../../components/Masterpiece/CombinedPiece';
import {
  viewBoxUtils,
  constants,
  getPiecesPosition,
} from '../../utilities/Masterpiece';
const {
  ratio,
  windowHeight,
  windowWidth,
  barrierHeight,
  barrierWidth,
  barrierX,
  barrierY,
} = constants;
const data = {
  fullSVGComponent: {
    paths: {
      1: 'M134 0L268 86V134H134V0Z',
      2: 'M268 134C268 141.617 266.267 149.159 262.9 156.196C259.533 163.233 254.598 169.627 248.376 175.012C242.155 180.398 234.769 184.67 226.64 187.585C218.511 190.5 209.799 192 201 192C192.201 192 183.489 190.5 175.36 187.585C167.231 184.67 159.845 180.398 153.624 175.012C147.402 169.626 142.467 163.233 139.1 156.196C135.733 149.159 134 141.617 134 134L268 134Z',
      3: 'M0 71.8351L134 3.57628e-06L134 134L0 71.8351Z',
    },
    viewBox: '0 0 268 192',
  },
  fillColor: '#4C4ACF',
};

const Masterpiece = () => {
  const combinedPiecePosition = {x: windowWidth / 2, y: windowHeight / 2};
  console.log(combinedPiecePosition, windowHeight, windowWidth);
  const combinedPieceDimensions = viewBoxUtils.getDimFromViewBox(
    data.fullSVGComponent.viewBox,
  );
  const elementsData = viewBoxUtils.getPathsData(
    data.fullSVGComponent.paths,
    combinedPiecePosition,
    combinedPieceDimensions,
  );

  const piecesPosition = getPiecesPosition(
    elementsData,
    combinedPiecePosition,
    combinedPieceDimensions,
  );

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
      {elementsData.map((element, index) => (
        <View
          key={`${element.pieceCorrectPositon.x}-${element.pieceCorrectPositon.y}`}
          style={{
            position: 'absolute',
            height: ratio * 3,
            width: ratio * 3,
            backgroundColor: 'white',
            left: element.pieceCorrectPositon.x - (ratio * 3) / 2,
            top: element.pieceCorrectPositon.y - (ratio * 3) / 2,
          }}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'flex-start',
  },
});

export default Masterpiece;
