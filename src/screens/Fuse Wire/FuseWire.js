import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';

import {AuthContext} from '../../providers/AuthProvider';
import CompletedPopup from '../../components/CompletedPopup';
import {GameWrapper} from '../../components/GameWrapper';
import BackgroundImage from '../../values/BackgroundImage';
import {COLORS} from '../../values/Colors';

import {gameRoundData, stateGeneratorAsync} from '../../utilities/FuseWire';
import {FuseWireContext} from '../../providers/FuseWire.Provider';
import FuseHolder from '../../components/FuseWire/FuseHolder';
import Fuse from '../../components/FuseWire/Fuse';
import HolderBoard from '../../components/FuseWire/HolderBoard';
import FuseBoard from '../../components/FuseWire/FuseBoard';
import BatteryContainer from '../../components/FuseWire/BatteryContainer';

import Demo from './Demo';

const FuseWire = ({navigation}) => {
  const {
    state,
    fuseHolders,
    fuse,
    level,
    lives,
    loading,
    completedPopup,
    dispatch,
    ACTIONS,
    setIfAnswerCorrect,
    showDemo,
  } = useContext(FuseWireContext);
  const {user} = useContext(AuthContext);
  // console.log(fuseHolders);
  // console.log(
  //   fuseHolders.map(fuseHolder => fuseHolder.sequence),
  //   'sequence',
  // );
  // console.log(
  //   fuseHolders.map(fuseHolder => fuseHolder.inputValue),
  //   'inputs',
  // );

  const handleCheck = async () => {
    const checkIfCorrect = () => {
      const initiallyBlank = fuseHolders.filter(
        fuseHolder => fuseHolder.initiallyBlank,
      );
      // console.log(initiallyBlank.map(item => (item.sequence, item.inputValue)));
      return initiallyBlank.every(
        fuseHolder => fuseHolder.sequence == fuseHolder.inputValue,
      );
    };
    const ifCorrect = checkIfCorrect();
    // console.log(ifCorrect);
    setIfAnswerCorrect(ifCorrect);
    if (level === gameRoundData[gameRoundData.length - 1].level && ifCorrect) {
      dispatch({type: ACTIONS.GAME_OVER, payload: {uid: user.uid}});
      setTimeout(() => {
        navigation.navigate('Transition', {
          state: state,
          cameFrom: 'FuseWire',
        });
      }, 1000);

      return;
    }
    let nextLevelState;
    if (ifCorrect) nextLevelState = await stateGeneratorAsync(level + 1);
    dispatch({
      type: ACTIONS.ON_CHECK,
      payload: {
        result: ifCorrect,
        uid: user.uid,
        nextLevelState: nextLevelState,
      },
    });
  };

  useEffect(() => {
    if (lives === 0) {
      dispatch({
        type: ACTIONS.GAME_OVER,
        payload: {uid: user.uid},
      });
      setTimeout(() => {
        navigation.navigate('Transition', {
          state: state,
          cameFrom: 'FuseWire',
        });
      });
    }
  }, [lives]);

  return loading ? (
    <ActivityIndicator size="large" color="#0000ff" />
  ) : completedPopup ? (
    <CompletedPopup gameName="FUSE WIRE" />
  ) : showDemo ? (
    <Demo />
  ) : (
    <GameWrapper
      imageURL={BackgroundImage.FuseWire}
      backgroundGradient={COLORS.fuseWireBGColor}
      scoreboard={[
        {
          title: 'Lives',
          value: state.lives > 0 ? '★'.repeat(state.lives) : '-',
        },
        {title: 'Level', value: state.level},
      ]}
      controllerButtons={[{title: 'Check', onPress: handleCheck}]}>
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
    </GameWrapper>
  );
};

export default FuseWire;
