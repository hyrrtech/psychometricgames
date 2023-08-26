import React, {useEffect, useMemo, useState} from 'react';
import {PlaySound, useDebounce} from '../../utilities';
import {UIManager, Platform, LayoutAnimation} from 'react-native';
import {GameWrapper} from '../../components/GameWrapper';
import {SharkMatrix, Modal, PointerModal} from '../../components/Shark';
import {ResultPopup} from '../../components/ResultPopup';
import {generateMatrix, generateOddNumber} from '../../utilities/SHARK';
import initialState, {ResultAnimationTime} from './initialState';
import BackgroundImage from '../../values/BackgroundImage';
import {COLORS} from '../../values/Colors';
import correct_sound from '../../assets/sounds/correct_sound.mp3';
import wrong_sound from '../../assets/sounds/wrong_sound.mp3';
import AsyncStorage from '@react-native-async-storage/async-storage';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Demo = ({setShowDemo}) => {
  const [result, setResult] = useState({show: false, value: 'correct'});
  const totalStages = 6;
  const [demoState, setDemoState] = useState({...initialState, demoStage: 1});
  const [leftButtonProps, setLeftButtonProps] = useState({
    x: 0,
    y: 0,
    height: 0,
    width: 0,
  });
  const [rightButtonProps, setRightButtonProps] = useState({
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
            content="instructions"
            style={{position: 'absolute'}}
            onPress={() => {
              LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
              setDemoState(prev => ({...prev, demoStage: prev.demoStage + 1}));
            }}
          />
        );
      case totalStages:
        return (
          <Modal
            content="final modal"
            style={{position: 'absolute'}}
            onPress={async () => {
              try {
                await AsyncStorage.setItem('SHARK_DEMO', 'FINISHED');
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
  }, [demoState.demoStage]);

  const generateNewState = () => {
    const rows = generateOddNumber(3, 7);
    const cols = generateOddNumber(3, 5);
    const newState = {
      matrix: generateMatrix(rows, cols),
      rows: rows,
      cols: cols,
    };
    if (demoState.demoStage === totalStages - 1) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    }
    setDemoState(prev => ({
      ...prev,
      ...newState,
      demoStage: prev.demoStage + 1,
    }));
  };

  const {middleRow, middleColumn, middleSharkDirection} = useMemo(() => {
    const matrix = demoState.matrix;
    const middleRow = Math.floor(demoState.rows / 2);
    const middleColumn = Math.floor(demoState.cols / 2);
    const middleSharkDirection = matrix[middleRow][middleColumn];
    return {middleRow, middleColumn, middleSharkDirection};
  }, [demoState]);

  const handlePress = useDebounce(direction => {
    if (demoState.demoStage === totalStages || demoState.demoStage === 1)
      return;
    //show result
    const checkIfCorrect = middleSharkDirection === direction;
    if (!checkIfCorrect) return;
    checkIfCorrect ? PlaySound(correct_sound) : PlaySound(wrong_sound);
    checkIfCorrect
      ? setResult({show: true, value: 'correct'})
      : setResult({show: true, value: 'wrong'});
    setTimeout(() => {
      generateNewState();
      setResult({...result, show: false});
    }, ResultAnimationTime * 2);
  }, ResultAnimationTime * 2);

  return (
    <GameWrapper
      imageURL={BackgroundImage.SHARK}
      backgroundGradient={COLORS.sharkBGColor}
      controllerButtons={[
        {
          title: 'LEFT',
          onPress: () => handlePress('LEFT'),
          onLayout: event => {
            event.target.measure((x, y, width, height, pageX, pageY) => {
              setLeftButtonProps({
                x: x + pageX,
                y: y + pageY,
                height,
                width,
              });
            });
          },
        },
        {
          title: 'RIGHT',
          onPress: () => handlePress('RIGHT'),
          onLayout: event => {
            event.target.measure((x, y, width, height, pageX, pageY) => {
              setRightButtonProps({
                x: x + pageX,
                y: y + pageY,
                height,
                width,
              });
            });
          },
        },
      ]}>
      {demoState.demoStage !== totalStages && demoState.demoStage !== 1 && (
        <>
          <SharkMatrix
            matrix={demoState.matrix}
            highlightMiddle={true}
            mid={{middleRow, middleColumn}}
          />
          <PointerModal
            buttonNumber={middleSharkDirection === 'LEFT' ? 1 : 2}
            relativeDim={
              middleSharkDirection === 'LEFT'
                ? leftButtonProps
                : rightButtonProps
            }
            content={middleSharkDirection === 'LEFT' ? 'LEFT' : 'RIGHT'}
          />
        </>
      )}
      {ModalFlow}

      {result.show ? (
        <ResultPopup
          result={result.value}
          animationDuration={ResultAnimationTime}
        />
      ) : null}
    </GameWrapper>
  );
};

export default Demo;
