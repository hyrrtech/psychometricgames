import React, {
  createContext,
  useContext,
  useState,
  useReducer,
  useEffect,
} from 'react';
import {AuthContext} from './AuthProvider';
import db from '../firebase/database';
import {reducer, ACTIONS} from '../screens/Fuse Wire/reducer';
import initialState from '../screens/Fuse Wire/initialState';
import {stateGeneratorAsync} from '../utilities/FuseWire';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const FuseWireContext = createContext();

export const FuseWireProvider = ({children}) => {
  const {user} = useContext(AuthContext);
  const GameRef = db.ref(`/users/${user.uid}/FuseWire/`);

  const [state, dispatch] = useReducer(reducer, initialState);
  const [ifAnswerCorrect, setIfAnswerCorrect] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completedPopup, setCompletedPopup] = useState(false);
  const [showPattern, setShowPattern] = useState(true);
  const [showDemo, setShowDemo] = useState(false);
  const [demoState, setDemoState] = useState({demoStage: 1});

  const {fuseHolders, blankValues, level, lives, fuse, startTime} = state;

  const initDemo = async () => {
    const newState = await stateGeneratorAsync(1);
    dispatch({
      type: ACTIONS.INIT_LEVEL,
      payload: {
        state: newState,
        lives: 1,
      },
    });
    setShowDemo(true);
    setLoading(false);
  };

  const fetchData = async () => {
    try {
      let level = state.level;
      let lives = state.lives;

      const snapshot = await GameRef.once('value');
      const exists = snapshot.exists();

      if (exists) {
        const data = snapshot.val();
        level = data.level;
        lives = data.lives;

        if (data.status === 'COMPLETED') {
          setCompletedPopup(true);
          setLoading(false);
          return;
        }
      } else {
        await GameRef.set({
          level: 1,
          lives: state.lives,
          status: 'IN_PROGRESS',
        });
      }

      const newState = await stateGeneratorAsync(level);

      dispatch({
        type: ACTIONS.INIT_LEVEL,
        payload: {
          state: newState,
          lives: lives,
        },
      });

      setLoading(false);
    } catch (error) {
      console.log(error);
      //navigate to home
    }
  };

  const initGame = async () => {
    try {
      const value = await AsyncStorage.getItem('COLORMATCH_DEMO');
      if (value === null) {
        initDemo();
      } else {
        fetchData();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    initGame();
  }, [showDemo]);

  return (
    <FuseWireContext.Provider
      value={{
        state,
        fuseHolders,
        blankValues,
        level,
        lives,
        fuse,
        startTime,
        dispatch,
        ACTIONS,
        loading,
        completedPopup,
        ifAnswerCorrect,
        setIfAnswerCorrect,
        showPattern,
        setShowPattern,
        showDemo,
        setShowDemo,
        demoState,
        setDemoState,
      }}>
      {children}
    </FuseWireContext.Provider>
  );
};
