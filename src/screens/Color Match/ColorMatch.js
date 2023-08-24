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
import BackgroundImage from '../../values/BackgroundImage';
import useCountDown from '../../utilities/useCountDown';
import useDebounce from '../../utilities/useDebounce';
import initialState from './initialState';
import {reducer, ACTIONS} from './reducer';
import {constants} from '../../utilities/Color Match';
import {ResultPopup} from '../../components/ResultPopup';
import db from '../../firebase/database';
import {AuthContext} from '../../providers/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Demo from './Demo';
const {time, timeout} = constants;

const ColorMatch = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const GameRef = db.ref(`/users/${user.uid}/ColorMatch/`);
  const [loading, setLoading] = useState(true);
  const [completedPopup, setCompletedPopup] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [result, setResult] = useState({show: false, value: 'correct'});
  const {TIME, togglePause} = useCountDown(time.minutes, time.seconds);
  const opacity = useRef(new Animated.Value(1)).current;
  const [showDemo, setShowDemo] = useState(false);

  const initGame = async () => {
    togglePause(true);
    try {
      const value = await AsyncStorage.getItem('COLORMATCH_DEMO');
      if (value === null) {
        setShowDemo(true);
        setLoading(false);
      } else {
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
          .then(() => {
            setLoading(false);
            togglePause(false);
          })
          .catch(err => console.log(err));
      }
    } catch (err) {
      console.log(err);
      setShowDemo(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    initGame();
  }, [showDemo]);

  useEffect(() => {
    if (TIME === '00:00') {
      if (state.total_rounds_played === 0) {
        navigation.goBack();
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
    <CompletedPopup gameName="COLOR MATCH" />
  ) : showDemo ? (
    <Demo setShowDemo={setShowDemo} />
  ) : (
    <GameWrapper
      imageURL={BackgroundImage.SHARK}
      backgroundGradient={COLORS.colorMatchBGColor}
      scoreboard={[
        {title: 'Time', value: TIME},
        {title: 'Score', value: state.score},
      ]}
      controllerButtons={[
        {title: 'NO', onPress: () => handlePress(false)},
        {
          title: 'YES',
          onPress: () => handlePress(true),
        },
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
