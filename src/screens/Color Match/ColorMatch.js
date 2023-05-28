import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
} from 'react';
import {View, Text, Animated, ActivityIndicator} from 'react-native';
import styles from './styles';
import {GameWrapper} from '../../components/GameWrapper';
import CompletedPopup from '../../components/CompletedPopup';
import {COLORS} from '../../values/Colors';
import {Button} from '../../components/Button';
import {InfoLabel} from '../../components/InfoLabel';
import BackgroundImage from '../../values/BackgroundImage';
import useCountDown from '../../utilities/useCountDown';
import useDebounce from '../../utilities/useDebounce';
import initialState, {time, timeout} from './initialState';
import {reducer, ACTIONS} from './reducer';
import {ResultPopup} from '../../components/ResultPopup';
import db from '../../firebase/database';
import {AuthContext} from '../../providers/AuthProvider';

const ColorMatch = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const GameRef = db.ref(`/users/${user.uid}/ColorMatch/`);
  const [loading, setLoading] = useState(true);
  const [completedPopup, setCompletedPopup] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [result, setResult] = useState({show: false, value: 'correct'});
  const {TIME} = useCountDown(time.minutes, time.seconds);
  const opacity = useRef(new Animated.Value(1)).current;

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
        cameFrom: 'ColorMatch',
      });
    }
  }, [!completedPopup && TIME]);

  const handlePress = useDebounce(answer => {
    const correctAnswer = state.colorSet.meaningColor === state.colorSet.color;
    answer === correctAnswer
      ? setResult({show: true, value: 'correct'})
      : setResult({show: true, value: 'wrong'});

    setTimeout(() => {
      dispatch({
        type: ACTIONS.NEXT_COLOR_SET,
        payload: {correct: answer === correctAnswer},
      });
      setResult({...result, show: false});
    }, timeout);

    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 0,
        duration: timeout,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: timeout,
        useNativeDriver: true,
      }),
    ]).start();
  }, 2 * timeout);

  return loading ? (
    <ActivityIndicator size="large" color="#0000ff" />
  ) : completedPopup ? (
    <CompletedPopup gameName="SHARK" />
  ) : (
    <GameWrapper
      imageURL={BackgroundImage.SHARK}
      backgroundGradient={COLORS.sharkBGGrandient}
      scoreboard={[
        <InfoLabel
          label={'Time'}
          value={TIME}
          style={styles.infoLabel}
          key="time"
        />,
        <InfoLabel
          label={'Score'}
          value={state.score.toString()}
          style={styles.infoLabel}
          key="score"
        />,
      ]}
      controllerButtons={[
        <Button
          key="No"
          style={styles.button}
          title={'No'}
          onPressIn={() => handlePress(false)}
        />,
        <Button
          key="Yes"
          style={styles.button}
          title={'Yes'}
          onPressIn={() => handlePress(true)}
        />,
      ]}>
      <>
        <Text style={styles.helperText1}>
          Does the meaning match the text color?
        </Text>
        <View style={styles.row}>
          <View style={styles.boxContainer}>
            <View style={styles.box}>
              <Animated.Text style={[styles.boxText, {opacity: opacity}]}>
                {state.colorSet.meaningColor}
              </Animated.Text>
            </View>
            <Text style={styles.helperText2}>meaning</Text>
          </View>

          <View style={styles.boxContainer}>
            <View style={styles.box}>
              <Animated.Text
                style={[
                  styles.boxText,
                  {color: state.colorSet.colorValue, opacity: opacity},
                ]}>
                {state.colorSet.textColor}
              </Animated.Text>
            </View>
            <Text style={styles.helperText2}>text color</Text>
          </View>
        </View>
        {result.show ? (
          <ResultPopup result={result.value} animationDuration={timeout} />
        ) : null}
      </>
    </GameWrapper>
  );
};

export default ColorMatch;
