import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
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

const levelData = {
  fullSVGComponent: {
    paths: {
      0: 'M134 0L268 86V134H134V0Z',
      1: 'M268 134C268 141.617 266.267 149.159 262.9 156.196C259.533 163.233 254.598 169.627 248.376 175.012C242.155 180.398 234.769 184.67 226.64 187.585C218.511 190.5 209.799 192 201 192C192.201 192 183.489 190.5 175.36 187.585C167.231 184.67 159.845 180.398 153.624 175.012C147.402 169.626 142.467 163.233 139.1 156.196C135.733 149.159 134 141.617 134 134L268 134Z',
      2: 'M0 71.8351L134 3.57628e-06L134 134L0 71.8351Z',
    },
    viewBox: '0 0 268 192',
  },
  fillColor: '#1e2448',
};

const demoData = {
  fullSVGComponent: {
    paths: {
      0: 'M0.5 0H106V90.5H0.5V0Z',
    },
    viewBox: '0 0 106 99',
  },
  fillColor: '#1e2448',
};

//

export const MasterpieceProvider = ({children}) => {
  // const {user} = useContext(AuthContext);
  // const GameRef = db.ref(`/users/${user.uid}/Masterpiece/`);

  //   const [ifAnswerCorrect, setIfAnswerCorrect] = useState(null);
  // const [loading, setLoading] = useState(true);
  //   const [completedPopup, setCompletedPopup] = useState(false);
  const [showDemo, setShowDemo] = useState(true);
  const [demoState, setDemoState] = useState({demoStage: 1});

  const [elementsData, setElementsData] = useState([]);
  const [positionsState, setPositionsState] = useState([]);
  const [pickedPieceId, setPickedPieceId] = useState(null);

  const data = useMemo(() => {
    return showDemo ? demoData : levelData;
  }, [showDemo]);

  const initLevel = data => {
    // setLoading(true);
    const combinedPieceDimensions = viewBoxUtils.getDimFromViewBox(
      data.fullSVGComponent.viewBox,
    );
    const pathsData = viewBoxUtils.getPathsData(
      data.fullSVGComponent.paths,
      combinedPieceDimensions,
    );
    const piecesPosition = getPiecesPosition(
      pathsData,
      combinedPieceDimensions,
    );

    setElementsData(pathsData);
    setPositionsState(populatePositions(pathsData));
    setPickedPieceId(null);
    // setLoading(false);
    return {
      combinedPieceDimensions,
      piecesPosition,
    };
  };

  const {combinedPieceDimensions, piecesPosition} = useMemo(
    () => initLevel(data),
    [data, showDemo],
  );

  const isCorrect = useMemo(() => {
    const isAtCorrectPosition = positionsState.every(
      position => position.id === position.idOfPieceAtThisPosition,
    );
    const isAt0deg = elementsData.every(
      element => element.pieceRotationAngle % 360 === 0,
    );
    return isAt0deg && isAtCorrectPosition;
  }, [elementsData, positionsState]);

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
        pickedPieceId,
        setPickedPieceId,
        isCorrect,
        showDemo,
        setShowDemo,
        demoState,
        setDemoState,
      }}>
      {children}
    </MasterpieceContext.Provider>
  );
};
