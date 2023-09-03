import React, {useContext, useEffect, useState, useRef, useMemo} from 'react';
import {ActivityIndicator, LayoutAnimation, View} from 'react-native';

import CompletedPopup from '../../components/CompletedPopup';
import {GameWrapper} from '../../components/GameWrapper';
import BackgroundImage from '../../values/BackgroundImage';
import {COLORS} from '../../values/Colors';

import {FuseWireContext} from '../../providers/FuseWire.Provider';
import FuseHolder from '../../components/FuseWire/FuseHolder';
import Fuse from '../../components/FuseWire/Fuse';
import HolderBoard from '../../components/FuseWire/HolderBoard';
import FuseBoard from '../../components/FuseWire/FuseBoard';
import BatteryContainer from '../../components/FuseWire/BatteryContainer';
import Pattern from '../../components/FuseWire/Pattern';
import Modal from '../../components/FuseWire/modal';
import PointerModal from '../../components/FuseWire/pointerModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Demo = ({navigation}) => {
  const {
    fuseHolders,
    fuse,
    loading,
    completedPopup,
    setIfAnswerCorrect,
    demoState,
    setDemoState,
    setShowPattern,
    state,
    setShowDemo,
  } = useContext(FuseWireContext);

  const [buttonProps, setButtonProps] = useState({
    x: 0,
    y: 0,
    height: 0,
    width: 0,
  });

  const checkIfEveryHolderIsNotBlank = () => {
    const initiallyBlank = fuseHolders.filter(
      fuseHolder => fuseHolder.initiallyBlank,
    );
    const checkifNotBlank = initiallyBlank.every(
      fuseHolder => fuseHolder.isBlank === false,
    );

    if (checkifNotBlank) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setDemoState({demoStage: 3});
    }
  };

  const handleCheck = async () => {
    if (demoState.demoStage === 2) return;

    const checkIfCorrect = () => {
      const initiallyBlank = fuseHolders.filter(
        fuseHolder => fuseHolder.initiallyBlank,
      );
      return initiallyBlank.every(
        fuseHolder => fuseHolder.sequence == fuseHolder.inputValue,
      );
    };
    const ifCorrect = checkIfCorrect();
    setIfAnswerCorrect(ifCorrect);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowPattern(false);

    if (!ifCorrect) {
      setDemoState({demoStage: false});
    }
  };

  const ModalFlow = useMemo(() => {
    switch (demoState.demoStage) {
      case 2:
        return (
          <Modal
            style={{top: '10%'}}
            content={'drag the fuse to the correct position'}
            showContinue={false}
          />
        );
      case 3:
        return (
          <PointerModal
            content={
              'good job now click here to check if your answer is correct'
            }
            buttonNumber={1}
            relativeDim={buttonProps}
          />
        );

      case false:
        return (
          <Modal
            style={{top: '10%'}}
            content={'lets try again'}
            showContinue={false}
          />
        );

      default:
        return null;
    }
  }, [demoState]);

  useEffect(() => {
    checkIfEveryHolderIsNotBlank();
  }, [state]);

  return loading ? (
    <ActivityIndicator size="large" color="#0000ff" />
  ) : completedPopup ? (
    <CompletedPopup gameName="FUSE WIRE" />
  ) : (
    <GameWrapper
      imageURL={BackgroundImage.FuseWire}
      backgroundGradient={COLORS.fuseWireBGColor}
      {...(demoState.demoStage !== 1
        ? {
            controllerButtons: [
              {
                title: 'Check',
                onPress: () => handleCheck(),
                onLayout: event => {
                  event.target.measure((x, y, width, height, pageX, pageY) => {
                    setButtonProps({
                      x: x + pageX,
                      y: y + pageY,
                      height,
                      width,
                    });
                  });
                },
              },
            ],
          }
        : {})}>
      {demoState.demoStage === 1 || demoState.demoStage === true ? (
        <Modal
          content={demoState.demoStage === 1 ? 'introductions' : 'final modal'}
          onPress={async () => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
            if (demoState.demoStage === true) {
              try {
                await AsyncStorage.setItem('FUSEWIRE_DEMO', 'DONE');
                setShowDemo(false);
                return;
              } catch (err) {
                console.log(err);
              }
            }
            setDemoState(prev => ({demoStage: prev.demoStage + 1}));
          }}
        />
      ) : (
        <>
          <View style={{width: '100%', flex: 1}}>
            <HolderBoard />
            <FuseBoard />
            <BatteryContainer />
            {fuseHolders.map((fuseHolder, index) => (
              <FuseHolder
                key={index}
                position={fuseHolder.position}
                value={fuseHolder.sequence}
                initiallyBlank={fuseHolder.initiallyBlank}
              />
            ))}
            {fuseHolders.map((fuseHolder, index) => (
              <Pattern
                key={fuseHolder.pattern}
                position={fuseHolder.position}
                pattern={fuseHolder.pattern}
              />
            ))}
            {fuse.map((row, rowIndex) =>
              row.map((fuse, colIndex) => (
                <Fuse
                  key={`${rowIndex}-${colIndex}`}
                  position={fuse.position}
                  value={fuse.value}
                />
              )),
            )}
          </View>
          {ModalFlow}
        </>
      )}
    </GameWrapper>
  );
};

export default Demo;
