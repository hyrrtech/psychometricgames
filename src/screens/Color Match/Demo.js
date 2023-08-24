import React, {useState, useEffect, useMemo, useRef} from 'react';
import {
  View,
  Text,
  Animated,
  UIManager,
  Platform,
  LayoutAnimation,
} from 'react-native';
import styles from './styles';
import {GameWrapper} from '../../components/GameWrapper';
import {COLORS} from '../../values/Colors';
import BackgroundImage from '../../values/BackgroundImage';
import useDebounce from '../../utilities/useDebounce';
import {constants} from '../../utilities/Color Match';
import {ResultPopup} from '../../components/ResultPopup';
import {PointerModal, Modal} from '../../components/Color Match';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {transform} from '@babel/core';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const {timeout} = constants;

const colorSet = [
  {
    color: 'red',
    colorValue: '#ff1000',
    meaningColor: 'black',
    textColor: 'blue',
  },
  {
    color: 'yellow',
    colorValue: '#f6be1b',
    meaningColor: 'orange',
    textColor: 'yellow',
  },
  {
    color: 'red',
    colorValue: '#ff1000',
    meaningColor: 'orange',
    textColor: 'orange',
  },
  {
    color: 'yellow',
    colorValue: '#f6be1b',
    meaningColor: 'yellow',
    textColor: 'red',
  },
];

const Demo = ({setShowDemo}) => {
  const [result, setResult] = useState({show: false, value: 'correct'});
  const opacity = useRef(new Animated.Value(1)).current;
  const meaningScale = useRef(new Animated.Value(0)).current;
  const textColorScale = useRef(new Animated.Value(0)).current;
  const [demoState, setDemoState] = useState({
    noDisabled: true,
    yesDisabled: true,
    demoStage: 1,
    colorStage: 0,
  });
  const [noButtonProps, setNoButtonProps] = useState({
    x: 0,
    y: 0,
    height: 0,
    width: 0,
  });
  const [yesButtonProps, setYesButtonProps] = useState({
    x: 0,
    y: 0,
    height: 0,
    width: 0,
  });
  const ModalFlow = useMemo(() => {
    switch (demoState.demoStage) {
      case 1:
        return (
          <Modal
            style={{position: 'absolute'}}
            content={'instructions'}
            onPress={() => {
              LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
              setDemoState(prev => ({
                ...prev,
                demoStage: prev.demoStage + 1,
              }));
              setTimeout(() => {
                scaleMeaning(1);
              }, 700);
            }}
          />
        );
      case 4:
      case 5:
      case 6:
        return (
          <PointerModal
            content={'say why it is not the correct answer'}
            relativeDim={noButtonProps}
            buttonNumber={1}
          />
        );
      case 7:
        return (
          <PointerModal
            content={'why it is the correct answer'}
            relativeDim={yesButtonProps}
            buttonNumber={2}
          />
        );
      case 8:
        return (
          <Modal
            content={'well done, bla bla text'}
            onPress={async () => {
              try {
                await AsyncStorage.setItem('COLORMATCH_DEMO', 'FINISHED');
                LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
                setShowDemo(false);
              } catch (error) {
                console.error('Error saving data:', error);
              }
            }}
          />
        );
      default:
        return null;
    }
  });
  const scaleMeaning = value => {
    Animated.timing(meaningScale, {
      toValue: value,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const scaleTextColor = value => {
    Animated.timing(textColorScale, {
      toValue: value,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const meaningScaleInterpolate = meaningScale.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });

  const textColorScaleInterpolate = textColorScale.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });

  const handlePress = useDebounce(answer => {
    if (demoState.demoStage < 4 || demoState.demoStage > 7) return;

    const correctAnswer =
      colorSet[demoState.colorStage].meaningColor ===
      colorSet[demoState.colorStage].color;

    if (answer !== correctAnswer) return;

    answer === correctAnswer
      ? setResult({show: true, value: 'correct'})
      : setResult({show: true, value: 'wrong'});

    setTimeout(() => {
      setResult({...result, show: false});
      if (demoState.colorStage === colorSet.length - 1) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
        setDemoState(prev => ({
          ...prev,
          demoStage: prev.demoStage + 1,
          yesDisabled: true,
        }));
        return;
      }

      setDemoState(prev => ({
        ...prev,
        colorStage: prev.colorStage + 1,
        demoStage: prev.demoStage + 1,
        noDisabled: demoState.colorStage === colorSet.length - 2,
        yesDisabled: demoState.colorStage === colorSet.length - 1,
      }));
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
      imageURL={BackgroundImage.ColorMatch}
      backgroundGradient={COLORS.colorMatchBGColor}
      controllerButtons={[
        {
          title: 'NO',
          onPress: () => handlePress(false),
          onLayout: event => {
            event.target.measure((x, y, width, height, pageX, pageY) => {
              setNoButtonProps({
                x: x + pageX,
                y: y + pageY,
                height,
                width,
              });
            });
          },
        },
        {
          title: 'YES',
          onPress: () => handlePress(true),
          onLayout: event => {
            event.target.measure((x, y, width, height, pageX, pageY) => {
              setYesButtonProps({
                x: x + pageX,
                y: y + pageY,
                height,
                width,
              });
            });
          },
        },
      ]}>
      {demoState.demoStage !== 8 && demoState.demoStage !== 1 && (
        <>
          <Text style={styles.helperText1}>
            Does the meaning match the text color?
          </Text>
          <View style={styles.row}>
            <Animated.View
              style={[
                styles.boxContainer,
                {transform: [{scale: meaningScaleInterpolate}]},
              ]}>
              <View style={styles.box}>
                <Animated.Text style={[styles.boxText, {opacity: opacity}]}>
                  {colorSet[demoState.colorStage].meaningColor}
                </Animated.Text>
              </View>
              <Text style={styles.helperText2}>meaning</Text>
            </Animated.View>

            <Animated.View
              style={[
                styles.boxContainer,
                {transform: [{scale: textColorScaleInterpolate}]},
              ]}>
              <View style={styles.box}>
                <Animated.Text
                  style={[
                    styles.boxText,
                    {
                      color: colorSet[demoState.colorStage].colorValue,
                      opacity: opacity,
                    },
                  ]}>
                  {colorSet[demoState.colorStage].textColor}
                </Animated.Text>
              </View>
              <Text style={styles.helperText2}>text color</Text>
            </Animated.View>
          </View>
          {demoState.demoStage === 2 && (
            <Modal
              style={{position: 'relative', marginTop: '5%'}}
              content={'bla bla text1 for meaning box'}
              onPress={() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
                setDemoState(prev => ({
                  ...prev,
                  demoStage: prev.demoStage + 1,
                }));
                scaleMeaning(0);
                scaleTextColor(1);
              }}
            />
          )}
          {demoState.demoStage === 3 && (
            <Modal
              style={{position: 'relative', marginTop: '5%'}}
              content={'bla bla text 2 for color box'}
              onPress={() => {
                scaleTextColor(0);
                LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
                setDemoState(prev => ({
                  ...prev,
                  demoStage: prev.demoStage + 1,
                  noDisabled: false,
                }));
              }}
            />
          )}

          {result.show ? (
            <ResultPopup result={result.value} animationDuration={timeout} />
          ) : null}
        </>
      )}
      {ModalFlow}
    </GameWrapper>
  );
};

export default Demo;
