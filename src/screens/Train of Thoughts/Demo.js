import React, {useEffect, useContext, useMemo, useState} from 'react';
import {LayoutAnimation} from 'react-native';
import {GameWrapper} from '../../components/GameWrapper';
import BackgroundImage from '../../values/BackgroundImage';
import {COLORS} from '../../values/Colors';
import {TrainOfThoughtsContext} from '../../providers/TrainOfThoughts.Provider';
import {DemoTrain, Map, Modal} from '../../components/Train of Thoughts/';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Demo = () => {
  const {setDemoState, setShowDemo, demoState} = useContext(
    TrainOfThoughtsContext,
  );
  const [trains, setTrains] = useState([
    {color: demoState.trainColor, trainId: 0},
  ]);
  const ModalFlow = useMemo(() => {
    switch (demoState.demoStage) {
      case 1:
        return (
          <Modal
            content={`"Click on the junction points to switch tracks and guide the train to its matching color station."`}
            style={{zIndex: 99999}}
            // showContinue={true}
            onPress={() =>
              setDemoState(prev => ({
                ...prev,
                stopTrain: false,
                demoStage: prev.demoStage + 1,
                disableSwitch: false,
              }))
            }
          />
        );

      case false:
        return (
          <Modal
            content={`Oh no! The train arrived at the wrong station.Lets Try again!`}
            style={{zIndex: 99999}}
            onPress={() => {
              setTrains(prev => {
                let newTrains = [...prev];
                newTrains.splice(0, 1);
                newTrains.push({color: demoState.trainColor, trainId: 1});
                return newTrains;
              });
              setDemoState(prev => ({
                ...prev,
                demoStage: 0,
                disableSwitch: false,
              }));
            }}
          />
        );

      case true:
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
    setTimeout(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
      setDemoState(prev => ({
        ...prev,
        stopTrain: true,
        demoStage: prev.demoStage + 1,
      }));
    }, 1500);
  }, []);
  // console.log(trains);
  return (
    <GameWrapper
      imageURL={BackgroundImage.TrainofThoughts}
      backgroundGradient={COLORS.trainOfThoughtsBGColor}>
      {demoState.demoStage !== true && (
        <>
          <Map />
          {trains.map((train, index) => (
            <DemoTrain id={train.trainId} color={train.color} key={index} />
          ))}
        </>
      )}
      {ModalFlow}
    </GameWrapper>
  );
};

export default Demo;
