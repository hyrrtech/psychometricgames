import React, {
  createContext,
  useReducer,
  useState,
  useRef,
  useEffect,
} from 'react';
import initialState from '../screens/Pirate Passage/initialState';
import {reducer, ACTIONS} from '../screens/Pirate Passage/reducer';
import {constants, collisionDetection} from '../utilities/Pirate Passage';

const {time_to_cover_each_tile} = constants;

export const PiratePassageContext = createContext();

export const PiratePassageProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showCollision, setShowCollision] = useState({collided: false});
  const [disableGo, setDisableGo] = useState(true);
  const [completedPopup, setCompletedPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showDemo, setShowDemo] = useState(true);
  const [demoState, setDemoState] = useState({
    demoStage: 1,
    highlightedTileIndex: [],
    tapSequenceIndex: 0,
  });
  console.log(demoState);

  const checkPathToTreasure = () => {
    const {indexes} = state.shipPathIndexes;
    const {treasureIndex} = state;
    const lastPosition = indexes[indexes.length - 1];
    if (
      lastPosition[0] === treasureIndex[0] &&
      lastPosition[1] === treasureIndex[1]
    ) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    setLoading(true);

    Promise.resolve(
      dispatch({
        type: ACTIONS.INIT_LEVEL,
        payload: {level: 1, ifDemo: showDemo, lives: 1},
      }),
    ).then(() => {
      setTimeout(() => setLoading(false), 1000); //mimic fetch
    });
  }, [showDemo]);

  useEffect(() => {
    if (checkPathToTreasure()) {
      setDisableGo(false);
    }
  }, [state.shipPathIndexes.indexes]);

  useEffect(() => {
    if (state.go) {
      let time = 0;
      const interval = setInterval(() => {
        time++;
        const {collided, shipPosition} = collisionDetection(
          state.shipPathIndexes.indexes,
          state.piratePathIndexes,
          time,
        );
        if (collided) {
          setShowCollision({collided: true, shipPosition});
        }
      }, time_to_cover_each_tile);
      return () => clearInterval(interval);
    }
  }, [state.go]);

  return (
    <PiratePassageContext.Provider
      value={{
        ...state,
        disableGo,
        dispatch,
        ACTIONS,
        showCollision,
        loading,
        completedPopup,
        showDemo,
        setShowDemo,
        demoState,
        setDemoState,
      }}>
      {children}
    </PiratePassageContext.Provider>
  );
};
