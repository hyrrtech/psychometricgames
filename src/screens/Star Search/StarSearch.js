import {constants, gameLevelData} from '../../utilities/Star Search';
import Shape from '../../components/Star Search/Shape';
import {StarSearchContext} from '../../providers/StarSearch.Provider';
import CompletedPopup from '../../components/CompletedPopup';
import {GameWrapper} from '../../components/GameWrapper';
import {InfoLabel} from '../../components/InfoLabel';
import BackgroundImage from '../../values/BackgroundImage';
import styles from './styles';
import {COLORS} from '../../values/Colors';

import {View, ActivityIndicator} from 'react-native';
import {useContext, useEffect} from 'react';
import {ACTIONS} from './reducer';

const StarSearch = ({navigation}) => {
  const {spawnAreaHeight, spawnAreaWidth} = constants;
  const {state, dispatch} = useContext(StarSearchContext);
  const loading = false;
  const completedPopup = false;

  useEffect(() => {
    if (
      state.level === gameLevelData[gameLevelData.length - 1].level &&
      state.currentRound > state.rounds
    ) {
      navigation.navigate('Transition', {
        state: state,
        cameFrom: 'StarSearch',
      });
      return;
    }

    if (state.currentRound > state.rounds) {
      dispatch({type: ACTIONS.ON_LEVEL_COMPLETE});
    }
  }, [state]);

  return loading ? (
    <ActivityIndicator size="large" color="#0000ff" />
  ) : completedPopup ? (
    <CompletedPopup gameName="SHARK" />
  ) : (
    <GameWrapper
      imageURL={BackgroundImage.SHARK}
      backgroundGradient={COLORS.sharkBGGrandient}
      scoreboard={[
        <InfoLabel
          label={'Level'}
          value={state.level.toString()}
          style={styles.infoLabel}
          key="level"
        />,
        <InfoLabel
          label={'Score'}
          value={state.score.toString()}
          style={styles.infoLabel}
          key="score"
        />,
      ]}
      controllerButtons={[]}>
      <View
        style={{
          height: spawnAreaHeight,
          width: spawnAreaWidth,
        }}>
        {state.shapeData.map(shape => (
          <Shape
            key={shape.id}
            id={shape.id}
            hasPattern={shape.hasPattern}
            initialRotationAngle={shape.initialRotationAngle}
            rotationAnimation={shape.rotationAnimation}
            color={shape.color}
            shape={shape.shape}
            position={shape.position}
            count={shape.count}
          />
        ))}
      </View>
    </GameWrapper>
  );
};

export default StarSearch;
