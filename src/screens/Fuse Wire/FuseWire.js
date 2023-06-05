import React, {useContext, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from 'react-native';

import {AuthContext} from '../../providers/AuthProvider';
import CompletedPopup from '../../components/CompletedPopup';
import {GameWrapper} from '../../components/GameWrapper';
import {InfoLabel} from '../../components/InfoLabel';
import db from '../../firebase/database';
import BackgroundImage from '../../values/BackgroundImage';
import {COLORS} from '../../values/Colors';
import styles from './styles';

import {getFusePositions, generateCloseValues} from '../../utilities/FuseWire';
import {FuseWireContext} from '../../providers/FuseWire.Provider';
import FuseHolder from '../../components/FuseWire/FuseHolder';
import Fuse from '../../components/FuseWire/Fuse';

const FuseWire = () => {
  const {
    fuseHolders,
    blankValues,
    level,
    lives,
    loading,
    completedPopup,
    dispatch,
    ACTIONS,
  } = useContext(FuseWireContext);
  const {user} = useContext(AuthContext);
  const fuse = getFusePositions([
    ...blankValues,
    ...generateCloseValues(blankValues),
  ]);

  const handleCheck = () => {
    const checkIfCorrect = () =>
      fuseHolders
        .filter(fuseHolder => fuseHolder.initiallyBlank)
        .every(fuseHolder => fuseHolder.sequence === fuseHolder.inputValue);
    const result = checkIfCorrect();
    dispatch({action: ACTIONS.ON_CHECK, payload: {result, uid: user.uid}});
  };

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
      ]}>
      <View style={stylest.mainContainer}>
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
        <TouchableOpacity style={stylest.button} onPressIn={handleCheck}>
          <Text style={stylest.text}>Check</Text>
        </TouchableOpacity>
      </View>
    </GameWrapper>
  );
};

const stylest = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    width: '100%',
    top: 0,
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
