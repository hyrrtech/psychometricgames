import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import {
  ActivityIndicator,
  Animated,
  TouchableOpacity,
  View,
} from 'react-native';
import CompletedPopup from '../../components/CompletedPopup';
import {GameWrapper} from '../../components/GameWrapper';
import {InfoLabel} from '../../components/InfoLabel';
import db from '../../firebase/database';
import {AuthContext} from '../../providers/AuthProvider';

import {Tile} from '../../components/Memory Matrix';
import {gameRoundData, stateGenerator} from '../../utilities/Memory Matrix/';
import {ACTIONS, reducer} from './reducer';

import BackgroundImage from '../../values/BackgroundImage';
import {COLORS} from '../../values/Colors';
import styles from './styles';

const MemoryMatrix = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const GameRef = db.ref(`/users/${user.uid}/MemoryMatrix/`);
  const [state, dispatch] = useReducer(reducer, stateGenerator(1));
  const [tileDisabled, setTileDisabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [completedPopup, setCompletedPopup] = useState(false);

  useEffect(() => {
    GameRef.once('value', snapshot => {
      const exists = snapshot.exists();
      if (exists) {
        const data = snapshot.val();
        let {level, status, lives, score} = data;
        level = level ? level : 1;
        lives = lives ? lives : state.lives;
        if (status === 'COMPLETED') {
          setCompletedPopup(true);
          return;
        }
        dispatch({
          type: ACTIONS.INIT_LEVEL,
          payload: {
            level: level,
            lives: lives,
            uid: user.uid,
            score: score,
          },
        });
      }
    })
      .then(() => setLoading(false))
      .catch(err => console.log(err));
  }, []);

  const handleGameOver = () => {
    const payload = {uid: user.uid};
    dispatch({type: ACTIONS.GAME_OVER, payload});
    navigation.navigate('Transition', {
      state: state,
      cameFrom: 'MemoryMatrix',
    });
  };

  useEffect(() => {
    setTileDisabled(true);
    setTimeout(() => {
      setTileDisabled(false);
    }, state.correctScreenTime + 2500);

    if (state.lives === 0) {
      setTimeout(() => {
        handleGameOver();
      }, 600);
    }
  }, [state.lives, state.level]);

  useEffect(() => {
    // animation if the matrix size changes
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 1.1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [state.matrix.length]);

  useEffect(() => {
    const handleNextState = () => {
      setTileDisabled(false);
      const payload = {uid: user.uid};
      const type =
        state.rightAnswerCount !== state.correctTileCount
          ? ACTIONS.FAIL
          : ACTIONS.NEXT_LEVEL;

      dispatch({type, payload});
    };
    if (state.remainingClickCount === 0) {
      setTileDisabled(true);
      let timeoutId =
        state.level === gameRoundData[gameRoundData.length - 1].level
          ? setTimeout(handleGameOver, 1000)
          : setTimeout(handleNextState, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [state.remainingClickCount]);

  const handlePress = (rowIndex, colIndex) => {
    dispatch({
      type: ACTIONS.ON_TAP,
      payload: {uid: user.uid, rowIndex: rowIndex, colIndex: colIndex},
    });
  };

  return loading ? (
    <ActivityIndicator size="large" color="#0000ff" />
  ) : completedPopup ? (
    <CompletedPopup gameName="MemoryMatrix" />
  ) : (
    <GameWrapper
      imageURL={BackgroundImage.MemoryMatrix}
      backgroundGradient={COLORS.memoryMatrixBGColor}
      scoreboard={[
        {
          title: 'Lives',
          value: state.lives > 0 ? '★'.repeat(state.lives) : '-',
        },
        {title: 'Score', value: state.score},
        {title: 'Level', value: state.level},
      ]}>
      <Animated.View
        style={[styles.tilesBox, {transform: [{scale: animatedValue}]}]}>
        {state.matrix.map((row, i) => (
          <View key={i} style={styles.row}>
            {row.map((col, j) => (
              <TouchableOpacity
                disabled={tileDisabled}
                activeOpacity={1}
                key={`${i}-${j}`}
                onPressIn={() => handlePress(i, j)}>
                <Tile
                  props={{
                    ...col,
                    remainingClickCount: state.remainingClickCount,
                    correctScreenTime: state.correctScreenTime,
                    lives: state.lives,
                    level: state.level,
                  }}
                />
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </Animated.View>
    </GameWrapper>
  );
};

export default MemoryMatrix;
