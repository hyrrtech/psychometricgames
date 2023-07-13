import constants from './constants';

const {ratio, barrierWidth, barrierHeight, barrierX, barrierY} = constants;

const getPiecesPosition = (
  elementsData,
  combinedPiecePosition,
  combinedPieceDimensions,
) => {
  const piecesPosition = [];
  let {x: combinedPieceX, y: combinedPieceY} = combinedPiecePosition;
  let {width: combinedPieceWidth, height: combinedPieceHeight} =
    combinedPieceDimensions;
  combinedPieceWidth *= ratio;
  combinedPieceHeight *= ratio;
  combinedPieceX -= combinedPieceWidth / 2;
  combinedPieceY -= combinedPieceHeight / 2;

  elementsData.forEach(element => {
    const {width, height} = element.viewBox;
    const pieceWidth = width * ratio;
    const pieceHeight = height * ratio;

    let pieceX, pieceY;
    let isOverlapping;

    // Function to check if two rectangles overlap
    const doRectanglesOverlap = (rect1, rect2) => {
      return (
        rect1.x + rect1.width > rect2.x &&
        rect1.y + rect1.height > rect2.y &&
        rect1.x < rect2.x + rect2.width &&
        rect1.y < rect2.y + rect2.height
      );
    };

    // Generate random positions within the barrier until the piece does not overlap with the combined piece and other pieces
    do {
      pieceX =
        barrierX +
        Math.floor(Math.random() * (barrierWidth - pieceWidth)) +
        pieceWidth / 2;
      pieceY =
        barrierY +
        Math.floor(Math.random() * (barrierHeight - pieceHeight)) +
        pieceHeight / 2;

      isOverlapping = false;

      // Check if the generated piece overlaps with the combined piece
      if (
        doRectanglesOverlap(
          {
            x: combinedPieceX,
            y: combinedPieceY,
            width: combinedPieceWidth,
            height: combinedPieceHeight,
          },
          {
            x: pieceX - pieceWidth / 2,
            y: pieceY - pieceHeight / 2,
            width: pieceWidth,
            height: pieceHeight,
          },
        )
      ) {
        isOverlapping = true;
        continue; // Restart the loop to generate new positions
      }

      // Check if the generated piece overlaps with any other existing piece
      for (const piece of piecesPosition) {
        if (
          doRectanglesOverlap(
            {
              x: piece.position.x,
              y: piece.position.y,
              width: piece.dimensions.width,
              height: piece.dimensions.height,
            },
            {
              x: pieceX,
              y: pieceY,
              width: pieceWidth,
              height: pieceHeight,
            },
          )
        ) {
          isOverlapping = true;
          break;
        }
      }
    } while (isOverlapping);

    piecesPosition.push({
      position: {x: pieceX, y: pieceY},
      id: element.id,
      dimensions: {width: pieceWidth, height: pieceHeight},
    });
  });

  return piecesPosition;
};

export default getPiecesPosition;
