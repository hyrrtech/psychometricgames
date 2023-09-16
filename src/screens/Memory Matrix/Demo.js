import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TouchableOpacity, View, LayoutAnimation} from 'react-native';
import {GameWrapper} from '../../components/GameWrapper';

import {Tile, Modal} from '../../components/Memory Matrix';
import {stateGenerator} from '../../utilities/Memory Matrix/';

import BackgroundImage from '../../values/BackgroundImage';
import {COLORS} from '../../values/Colors';
import styles from './styles';

const Demo = ({setShowDemo}) => {
  const [tileDisabled, setTileDisabled] = useState(true);
  const [triggerCloseTiles, setTriggerCloseTiles] = useState(0);
  const [demoState, setDemoState] = useState({
    ...stateGenerator(1),
    demoStage: 1,
  });

  useEffect(() => {
    setTileDisabled(true);
    setTimeout(() => {
      setTileDisabled(false);
    }, demoState.correctScreenTime + 2000);
  }, [demoState.lives, demoState.level]);

  useEffect(() => {
    if (demoState.remainingClickCount === 0) {
      setTileDisabled(true);

      setTimeout(() => {
        setTriggerCloseTiles(prev => prev + 1);
      }, 1500);

      setTimeout(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
        setDemoState(prev => ({
          ...prev,
          demoStage: prev.demoStage + 1,
        }));
      }, 3000);
    }
  }, [demoState.remainingClickCount]);

  const handlePress = (rowIndex, colIndex) => {
    setDemoState(state => {
      let tile = state.matrix[rowIndex][colIndex];
      if (!tile.isCorrect) return state;

      if (tile.isSelected || state.remainingClickCount === 0) return state;

      tile.isSelected = true;

      let newState = {...state};

      newState.remainingClickCount--;

      if (state.remainingClickCount === 1) {
        tile.isLastClick = true;
      }

      newState.matrix[rowIndex][colIndex] = tile;

      return newState;
    });
  };

  return (
    <GameWrapper
      imageURL={BackgroundImage.MemoryMatrix}
      backgroundGradient={COLORS.memoryMatrixBGColor}>
      {demoState.demoStage !== 2 ? (
        <Modal
          content={
            demoState.demoStage === 1
              ? `Instructions:\n\nYour goal is to memorize the pattern displayed in the matrix within a limited timeframe.\n\n"Get ready to observe the tiles as they are revealed on the screen. Your task is to remember their positions. Pay attention!"`
              : `"Nice job! You successfully recreated the pattern. You're advancing to the next round. Get ready for more challenging patterns!"`
          }
          onPress={async () => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
            if (demoState.demoStage === 3) {
              try {
                await AsyncStorage.setItem('MEMORYMATRIX_DEMO', 'FINISHED');
                LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
                setShowDemo(false);
              } catch (error) {
                console.error('Error saving data:', error);
              }
            }
            setDemoState(prev => ({...prev, demoStage: prev.demoStage + 1}));
          }}
        />
      ) : (
        <>
          <Modal
            content={`"Alright, now it's your turn. Click on the tiles in the same positions as they were shown earlier to recreate the pattern. Good luck!"`}
            showContinue={false}
            style={{position: 'relative', marginBottom: '5%'}}
          />
          <View style={styles.tilesBox}>
            {demoState.matrix.map((row, i) => (
              <View key={i} style={styles.row}>
                {row.map((col, j) => (
                  <TouchableOpacity
                    disabled={tileDisabled}
                    activeOpacity={1}
                    key={`${i}-${j}`}
                    onPressIn={() => handlePress(i, j)}>
                    <Tile
                      props={{
                        ...col,
                        remainingClickCount: demoState.remainingClickCount,
                        correctScreenTime: demoState.correctScreenTime,
                        lives: 1,
                        level: 1,
                        triggerCloseTiles: triggerCloseTiles,
                      }}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        </>
      )}
    </GameWrapper>
  );
};

export default Demo;
