import React, {useEffect, useContext, useMemo} from 'react';
import {LayoutAnimation} from 'react-native';
import {GameWrapper} from '../../components/GameWrapper';
import BackgroundImage from '../../values/BackgroundImage';
import {COLORS} from '../../values/Colors';
import {TrainOfThoughtsContext} from '../../providers/TrainOfThoughts.Provider';
import {DemoTrain, Map, Modal} from '../../components/Train of Thoughts/';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Demo = () => {
  const {setDemoState, setShowDemo, showDemo, demoState} = useContext(
    TrainOfThoughtsContext,
  );
  //switch id is 5
  const ModalFlow = useMemo(() => {
    switch (demoState.demoStage) {
      case 1:
        return (
          <Modal
            content={`"Alright, let's begin! Your train is ready to depart. Observe the track layout and station colors carefully. Click on the junction points to switch tracks and guide the train to its matching color station."`}
            style={{zIndex: 99999}}
            showContinue={false}
          />
        );
      case 3:
        return (
          <Modal
            content={`"Congratulations! You completed the Train of Thoughts game. Your track-switching skills are impressive! But the challenge doesn't stop here. Trains of different colors will continue departing, and it's up to you to guide as many as possible to their respective stations.\n\nKeep those trains running smoothly!"`}
            style={{zIndex: 99999}}
            onPress={async () => {
              try {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
                await AsyncStorage.setItem('TOT_DEMO', 'FINISHED');
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

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
  }, [demoState.demoStage, showDemo]);

  useEffect(() => {
    setTimeout(() => {
      setDemoState(prev => ({
        ...prev,
        stopTrain: true,
        disableSwitch: false,
        demoStage: prev.demoStage + 1,
      }));
    }, 1500);
  }, []);

  return (
    <GameWrapper
      imageURL={BackgroundImage.TrainofThoughts}
      backgroundGradient={COLORS.trainOfThoughtsBGColor}>
      {demoState.demoStage !== 3 && (
        <>
          <Map />
          <DemoTrain id={0} color={'#f8de22'} />
        </>
      )}
      {ModalFlow}
    </GameWrapper>
  );
};

export default Demo;
