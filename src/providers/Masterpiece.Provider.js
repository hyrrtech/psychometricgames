import React, {createContext, useContext, useMemo, useState} from 'react';
import {AuthContext} from './AuthProvider';
import db from '../firebase/database';
import {
  constants,
  getPiecesPosition,
  viewBoxUtils,
  populatePositions,
} from '../utilities/Masterpiece';
const {combinedPiecePosition} = constants;

export const MasterpieceContext = createContext();

const data = {
  fullSVGComponent: {
    paths: {
      0: 'M134 0L268 86V134H134V0Z',
      1: 'M268 134C268 141.617 266.267 149.159 262.9 156.196C259.533 163.233 254.598 169.627 248.376 175.012C242.155 180.398 234.769 184.67 226.64 187.585C218.511 190.5 209.799 192 201 192C192.201 192 183.489 190.5 175.36 187.585C167.231 184.67 159.845 180.398 153.624 175.012C147.402 169.626 142.467 163.233 139.1 156.196C135.733 149.159 134 141.617 134 134L268 134Z',
      2: 'M0 71.8351L134 3.57628e-06L134 134L0 71.8351Z',
    },
    viewBox: '0 0 268 192',
  },
  fillColor: '#4C4ACF',
};

export const MasterpieceProvider = ({children}) => {
  // const {user} = useContext(AuthContext);
  // const GameRef = db.ref(`/users/${user.uid}/Masterpiece/`);

  //   const [ifAnswerCorrect, setIfAnswerCorrect] = useState(null);
  //   const [loading, setLoading] = useState(true);
  //   const [completedPopup, setCompletedPopup] = useState(false);
  const {combinedPieceDimensions, pathsData, piecesPosition} = useMemo(() => {
    const combinedPieceDimensions = viewBoxUtils.getDimFromViewBox(
      data.fullSVGComponent.viewBox,
    );
    const pathsData = viewBoxUtils.getPathsData(
      data.fullSVGComponent.paths,
      combinedPiecePosition,
      combinedPieceDimensions,
    );
    const piecesPosition = getPiecesPosition(
      pathsData,
      combinedPiecePosition,
      combinedPieceDimensions,
    );
    return {
      combinedPieceDimensions,
      pathsData,
      piecesPosition,
    };
  }, []);
  const [elementsData, setElementsData] = useState(pathsData);
  const [positionsState, setPositionsState] = useState(
    populatePositions(elementsData),
  );
  const [pickedPieceId, setPickedPieceId] = useState(null);

  const isCorrect = useMemo(() => {
    const isAtCorrectPosition = positionsState.every(
      position => position.id === position.idOfPieceAtThisPosition,
    );
    const isAt0deg = elementsData.every(
      element => element.pieceRotationAngle % 360 === 0, //-0===0
    );
    return isAt0deg && isAtCorrectPosition;
  }, [elementsData, positionsState]);
  console.log(isCorrect);
  return (
    <MasterpieceContext.Provider
      value={{
        combinedPieceDimensions,
        elementsData,
        setElementsData,
        piecesPosition,
        elementsData,
        positionsState,
        setPositionsState,
        data,
        combinedPieceDimensions,
        pickedPieceId,
        setPickedPieceId,
        isCorrect,
      }}>
      {children}
    </MasterpieceContext.Provider>
  );
};
