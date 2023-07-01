import React, {useContext, useEffect} from 'react';
import {StyleSheet, ActivityIndicator, View} from 'react-native';

import {AuthContext} from '../../providers/AuthProvider';
import CompletedPopup from '../../components/CompletedPopup';
import {GameWrapper} from '../../components/GameWrapper';
import {InfoLabel} from '../../components/InfoLabel';
import {Button} from '../../components/Button';
import BackgroundImage from '../../values/BackgroundImage';
import {COLORS} from '../../values/Colors';
import styles from './styles';

import {gameRoundData, stateGeneratorAsync} from '../../utilities/FuseWire';
import {FuseWireContext} from '../../providers/FuseWire.Provider';
import FuseHolder from '../../components/FuseWire/FuseHolder';
import Fuse from '../../components/FuseWire/Fuse';
import HolderBoard from '../../components/FuseWire/HolderBoard';
import FuseBoard from '../../components/FuseWire/FuseBoard';
import BatteryContainer from '../../components/FuseWire/BatteryContainer';

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
  } = useContext(FuseWireContext);
  const {user} = useContext(AuthContext);

  const handleCheck = async () => {
    const checkIfCorrect = () =>
      fuseHolders
        .filter(fuseHolder => fuseHolder.initiallyBlank)
        .every(fuseHolder => fuseHolder.sequence === fuseHolder.inputValue);
    if (
      level === gameRoundData[gameRoundData.length - 1].level &&
      checkIfCorrect()
    ) {
      dispatch({type: ACTIONS.GAME_OVER, payload: {uid: user.uid}});
      navigation.navigate('Transition', {
        state: state,
        cameFrom: 'FuseWire',
      });
      return;
    }
    const nextLevelState = await stateGeneratorAsync(level + 1);
    dispatch({
      type: ACTIONS.ON_CHECK,
      payload: {
        result: checkIfCorrect(),
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
      navigation.navigate('Transition', {
        state: state,
        cameFrom: 'FuseWire',
      });
    }
  }, [lives]);

  return loading ? (
    <ActivityIndicator size="large" color="#0000ff" />
  ) : completedPopup ? (
    <CompletedPopup gameName="MemoryMatrix" />
  ) : (
    <GameWrapper
      imageURL={BackgroundImage.MemoryMatrix}
      backgroundGradient={COLORS.memoryMatrixBGGradient}
      scoreboard={[
        <InfoLabel
          label={'Level'}
          value={level}
          style={styles.infoLabel}
          key="time"
          showAnimation={true}
        />,
        <InfoLabel
          label={'Lives'}
          value={lives > 0 ? '★'.repeat(lives) : '0'}
          style={styles.infoLabel}
          key="lives"
          showAnimation={true}
        />,
      ]}
      controllerButtons={[
        <Button
          key="check"
          style={styles.button}
          title={'Check'}
          onPressIn={handleCheck}
        />,
      ]}>
      <View style={stylest.mainContainer}>
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

const stylest = StyleSheet.create({
  mainContainer: {
    width: '100%',
    flex: 1,
  },
  button: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#2c3e50',
    padding: 10,
  },
  text: {
    color: '#fff',
    fontSize: 50,
  },
});

export default FuseWire;
