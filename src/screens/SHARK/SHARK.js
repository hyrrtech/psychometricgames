import React, {useReducer, useEffect, useContext, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {PlaySound, useDebounce} from '../../utilities';
import {GameWrapper} from '../../components/GameWrapper';
import {SharkMatrix} from '../../components/Shark';
import {ResultPopup} from '../../components/ResultPopup';
import {AuthContext} from '../../providers/AuthProvider';
import CompletedPopup from '../../components/CompletedPopup';
import db from '../../firebase/database';
import initialState, {ResultAnimationTime} from './initialState';
import {reducer, ACTIONS} from './reducer';
import BackgroundImage from '../../values/BackgroundImage';
import {COLORS} from '../../values/Colors';
import {useCountdown} from '../../utilities';

import correct_sound from '../../assets/sounds/correct_sound.mp3';
import wrong_sound from '../../assets/sounds/wrong_sound.mp3';

const SHARK = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const GameRef = db.ref(`/users/${user.uid}/SHARK/`);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(true);
  const [completedPopup, setCompletedPopup] = useState(false);
  const [result, setResult] = useState({show: false, value: 'correct'});
  const minutes = state.time.minutes;
  const seconds = state.time.seconds;
  const {TIME} = useCountdown(minutes, seconds);

  useEffect(() => {
    GameRef.once('value', snapshot => {
      const exists = snapshot.exists();
      if (exists) {
        const data = snapshot.val();
        const {status} = data;
        if (status === 'COMPLETED') {
          setCompletedPopup(true);
        }
      }
    })
      .then(() => setLoading(false))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    if (TIME === '00:00') {
      if (state.total_rounds_played === 0) {
        navigation.navigate('Home');
        return;
      }
      dispatch({type: ACTIONS.ON_TIME_UP, payload: {uid: user.uid}});

      navigation.navigate('Transition', {
        state: state,
        cameFrom: 'SHARK',
      });
    }
  }, [!completedPopup && TIME]);

  const handlePress = useDebounce(direction => {
    //get middle shark direction
    const matrix = state.matrix;
    const middleRow = Math.floor(state.rows / 2);
    const middleColumn = Math.floor(state.cols / 2);
    const middleSharkDirection = matrix[middleRow][middleColumn];

    //show result
    const checkIfCorrect = middleSharkDirection === direction;
    checkIfCorrect ? PlaySound(correct_sound) : PlaySound(wrong_sound);
    checkIfCorrect
      ? setResult({show: true, value: 'correct'})
      : setResult({show: true, value: 'wrong'});
    setTimeout(() => {
      dispatch({
        type: ACTIONS.NEXT_LEVEL,
        payload: {correct: checkIfCorrect, uid: user.uid},
      });
      setResult({...result, show: false});
    }, ResultAnimationTime * 2);
  }, ResultAnimationTime * 2);

  return loading ? (
    <ActivityIndicator size="large" color="#0000ff" />
  ) : completedPopup ? (
    <CompletedPopup gameName="SHARK" />
  ) : (
    <GameWrapper
      imageURL={BackgroundImage.SHARK}
      backgroundGradient={COLORS.sharkBGColor}
      scoreboard={[{title: 'Time', value: TIME}]}
      controllerButtons={[
        {title: 'LEFT', onPress: () => handlePress('LEFT')},
        {title: 'RIGHT', onPress: () => handlePress('RIGHT')},
      ]}>
      <SharkMatrix matrix={state.matrix} />
      {result.show ? (
        <ResultPopup
          result={result.value}
          animationDuration={ResultAnimationTime}
        />
      ) : null}
    </GameWrapper>
  );
};

export default SHARK;
