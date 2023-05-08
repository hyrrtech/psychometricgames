import React, {useState, useEffect, useReducer, useRef} from 'react';
import {View, Text, Animated} from 'react-native';
import styles from './styles';
import {GameWrapper} from '../../components/GameWrapper';
import {COLORS} from '../../values/Colors';
import {Button} from '../../components/Button';
import {InfoLabel} from '../../components/InfoLabel';
import BackgroundImage from '../../values/BackgroundImage';
import useCountDown from '../../utilities/useCountDown';
import useDebounce from '../../utilities/useDebounce';
import initialState, {time, timeout} from './initialState';
import {reducer, ACTIONS} from './reducer';
import {ResultPopup} from '../../components/ResultPopup';

const ColorMatch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [result, setResult] = useState({show: false, value: 'correct'});
  const {TIME} = useCountDown(time.minutes, time.seconds);
  const opacity = useRef(new Animated.Value(1)).current;

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

  return (
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
                  {color: state.colorSet.color, opacity: opacity},
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
