import {constants, gameLevelData} from '../../utilities/Star Search';
import CompletedPopup from '../../components/CompletedPopup';
import {GameWrapper} from '../../components/GameWrapper';
import BackgroundImage from '../../values/BackgroundImage';
import {
  IncorrectIndicator,
  CorrectIndicator,
  Shape,
  Modal,
} from '../../components/Star Search/';
import {COLORS} from '../../values/Colors';
import {reducer, ACTIONS} from './reducer';
import initialState from './initialState';

import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  LayoutAnimation,
} from 'react-native';
import {useEffect, useState, useReducer} from 'react';

const StarSearch = ({navigation}) => {
  const {
    spawnAreaHeight,
    spawnAreaWidth,
    shapeSize,
    answerIndicatorAnimationTime,
  } = constants;
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showModal, setShowModal] = useState(true);
  const loading = false;
  const completedPopup = false;

  const [correctIndicator, setCorrectIndicator] = useState({
    show: false,
    position: {x: 0, y: 0},
  });
  const [incorrectIndicator, setIncorrectIndicator] = useState({
    show: false,
    position: {x: 0, y: 0},
  });

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

  const handlePress = shape => {
    setTimeout(() => {
      dispatch({
        type: ACTIONS.ON_TAP,
        payload: {
          isCorrect: shape.count === 1,
        },
      });
    }, (answerIndicatorAnimationTime * 3) / 2);

    if (shape.count === 1) {
      setCorrectIndicator({
        show: true,
        position: shape.position,
      });
    } else {
      const correctPiecePosition = state.shapeData.find(
        shape => shape.count === 1,
      ).position;

      setCorrectIndicator({
        show: true,
        position: correctPiecePosition,
      });
      setIncorrectIndicator({
        show: true,
        position: shape.position,
      });
    }
  };

  return loading ? (
    <ActivityIndicator size="large" color="#0000ff" />
  ) : completedPopup ? (
    <CompletedPopup gameName="STAR SEARCH" />
  ) : (
    <GameWrapper
      imageURL={BackgroundImage.SHARK}
      backgroundGradient={COLORS.starSearchBGColor}
      {...(!showModal
        ? {
            scoreboard: [
              {title: 'Level', value: state.level},
              {title: 'Score', value: state.score},
            ],
          }
        : {})}>
      {showModal ? (
        <Modal
          content={'Instructions \n click on the unique shape'}
          onPress={() => {
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut,
            );
            setShowModal(false);
          }}
        />
      ) : (
        <View
          style={{
            height: spawnAreaHeight,
            width: spawnAreaWidth,
          }}>
          {state.shapeData.map(shape => (
            <TouchableOpacity
              key={shape.id}
              activeOpacity={1}
              onPressIn={() => handlePress(shape)}
              style={{
                position: 'absolute',
                left: shape.position.x - shapeSize / 2,
                top: shape.position.y - shapeSize / 2,
              }}>
              <Shape
                id={shape.id}
                hasPattern={shape.hasPattern}
                initialRotationAngle={shape.initialRotationAngle}
                rotationAnimation={shape.rotationAnimation}
                color={shape.color}
                shape={shape.shape}
                position={shape.position}
                count={shape.count}
              />
            </TouchableOpacity>
          ))}
          {correctIndicator.show && (
            <CorrectIndicator
              position={correctIndicator.position}
              setCorrectIndicator={setCorrectIndicator}
            />
          )}
          {incorrectIndicator.show && (
            <IncorrectIndicator
              position={incorrectIndicator.position}
              setIncorrectIndicator={setIncorrectIndicator}
            />
          )}
        </View>
      )}
    </GameWrapper>
  );
};

export default StarSearch;
