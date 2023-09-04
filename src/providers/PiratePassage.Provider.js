import React, {
  createContext,
  useReducer,
  useState,
  useRef,
  useEffect,
} from 'react';
import initialState from '../screens/Pirate Passage/initialState';
import {reducer, ACTIONS} from '../screens/Pirate Passage/reducer';
import {
  constants,
  collisionDetection,
  positionsOverlap,
} from '../utilities/Pirate Passage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const {time_to_cover_each_tile} = constants;

export const PiratePassageContext = createContext();

export const PiratePassageProvider = ({children}) => {
  const navigation = useNavigation();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showCollision, setShowCollision] = useState({collided: false});
  const [disableGo, setDisableGo] = useState(true);
  const [completedPopup, setCompletedPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showDemo, setShowDemo] = useState(false);
  const [demoState, setDemoState] = useState({
    demoStage: 1,
    highlightedTileIndex: state.tapSequence[0],
    tapSequenceIndex: 0,
    level: 1,
  });

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

  const initGame = async () => {
    setLoading(true);
    try {
      const value = await AsyncStorage.getItem('PIRATEPASSAGE_DEMO');
      if (value === null) setShowDemo(true);
      Promise.resolve(
        dispatch({
          type: ACTIONS.INIT_LEVEL,
          payload: {
            level: value !== null ? 1 : demoState.level, //: 1 will be fetched from previous progress
            ifDemo: value !== null ? false : showDemo,
            lives: 1,
          },
        }),
      ).then(() => {
        setTimeout(() => setLoading(false), 500); //mimic fetch
      });
    } catch (err) {
      console.log(err);
      navigation.navigate('Tabs');
    }
  };

  useEffect(() => {
    initGame();
  }, [showDemo, demoState.level]);

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
          clearInterval(interval);
        } else if (positionsOverlap(shipPosition, state.treasureIndex)) {
          if (showDemo) {
            setDemoState(prev => ({
              ...prev,
              demoStage: prev.demoStage + 1,
            }));
          }
          clearInterval(interval);
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
