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
            content={
              'start instructions, guide the train to the yellow station,tell user to tap on the valid switch'
            }
            style={{zIndex: 99999}}
            showContinue={false}
          />
        );
      case 3:
        return (
          <Modal
            content={'good job'}
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
