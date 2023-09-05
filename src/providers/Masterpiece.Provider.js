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
  getPiecesPosition,
  viewBoxUtils,
  populatePositions,
  levelData,
  demoData,
} from '../utilities/Masterpiece';
// import AsyncStorage from '@react-native-async-storage/async-storage';

export const MasterpieceContext = createContext();

//

export const MasterpieceProvider = ({children}) => {
  // const {user} = useContext(AuthContext);
  // const GameRef = db.ref(`/users/${user.uid}/Masterpiece/`);

  //   const [ifAnswerCorrect, setIfAnswerCorrect] = useState(null);
  // const [loading, setLoading] = useState(true);
  //   const [completedPopup, setCompletedPopup] = useState(false);
  const [state, setState] = useState({level: 1});
  const [showDemo, setShowDemo] = useState(true);
  const [demoState, setDemoState] = useState({demoStage: 1});

  const [elementsData, setElementsData] = useState([]);
  const [positionsState, setPositionsState] = useState([]);
  const [pickedPieceId, setPickedPieceId] = useState(null);

  const data = useMemo(() => {
    return showDemo ? demoData : {...levelData[state.level - 1]};
  }, [showDemo, state]);

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
  }, [elementsData, positionsState, state]);

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
        state,
        setState,
      }}>
      {children}
    </MasterpieceContext.Provider>
  );
};
