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

export const FuseWireContext = createContext();

export const FuseWireProvider = ({children}) => {
  const {user} = useContext(AuthContext);
  const GameRef = db.ref(`/users/${user.uid}/FuseWire/`);
  const [loading, setLoading] = useState(true);
  const [completedPopup, setCompletedPopup] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    GameRef.once('value', snapshot => {
      const exists = snapshot.exists();
      if (exists) {
        const data = snapshot.val();
        let {level, status, lives} = data;
        if (status === 'COMPLETED') {
          setCompletedPopup(true);
          return;
        }
        level = level ? level : 1;
        dispatch({
          type: ACTIONS.INIT_LEVEL,
          payload: {
            level: level,
            lives: lives,
          },
        });
      }
    })
      .then(() => setLoading(false))
      .catch(err => console.log(err));
  }, []);

  return (
    <FuseWireContext.Provider
      value={{
        state,
        fuseHolders: state.fuseHolders,
        blankValues: state.blankValues,
        level: state.level,
        lives: state.lives,
        dispatch,
        ACTIONS,
        loading,
        completedPopup,
      }}>
      {children}
    </FuseWireContext.Provider>
  );
};
