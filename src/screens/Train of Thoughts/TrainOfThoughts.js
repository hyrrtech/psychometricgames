import React, {useState, useEffect, useContext, useReducer} from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CompletedPopup from '../../components/CompletedPopup';
import {GameWrapper} from '../../components/GameWrapper';
import {InfoLabel} from '../../components/InfoLabel';
import BackgroundImage from '../../values/BackgroundImage';
import {COLORS} from '../../values/Colors';
import styles from './styles';
import {TrainOfThoughtsContext} from '../../providers/TrainOfThoughts.Provider';
import {AuthContext} from '../../providers/AuthProvider';
import db from '../../firebase/database';
import {ACTIONS, reducer} from './reducer';
import {
  adjustCoordinates,
  getRandomColor,
  stateGenerator,
} from '../../utilities/Train of Thoughts';
import {useCountdown} from '../../utilities';
import {
  Train,
  Switch,
  Station,
  Track,
} from '../../components/Train of Thoughts/';

import CurveSVG from '../../components/Train of Thoughts/SVG/CurveSVG';

const TrainOfThoughts = () => {
  const {
    trainColors,
    path,
    curveSize,
    switchSize,
    stationSize,
    originalSwitchDirections,
  } = useContext(TrainOfThoughtsContext);
  const navigation = useNavigation();
  const {user} = useContext(AuthContext);
  const GameRef = db.ref(`/users/${user.uid}/TrainOfThoughts/`);
  const [state, dispatch] = useReducer(reducer, stateGenerator(1));
  const [loading, setLoading] = useState(true);
  const [completedPopup, setCompletedPopup] = useState(false);

  const [trains, setTrains] = useState([
    {color: getRandomColor(trainColors), trainId: 0},
  ]);

  const {TIME, togglePause} = useCountdown(
    state.duration.minutes,
    state.duration.seconds,
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setTrains([{color: getRandomColor(trainColors), trainId: 0}]);
      togglePause(false);
    });

    return unsubscribe;
  }, [navigation, state.level]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const lastIndex = trains.length === 0 ? 0 : trains.length - 1;
      const newTrain =
        trains.length === 0
          ? {color: getRandomColor(trainColors), trainId: 0}
          : {
              color: getRandomColor(trainColors),
              trainId: trains[lastIndex].trainId + 1,
            };
      setTrains([...trains, newTrain]);
    }, state.spawnSpeed);

    return () => {
      clearInterval(intervalId);
    };
  }, [trains]);

  useEffect(() => {
    if (TIME === '00:00') {
      dispatch({type: ACTIONS.ON_TIME_UP, payload: {uid: user.uid}});

      if (state.level !== state.totalLevels) {
        dispatch({type: ACTIONS.NEXT_LEVEL});
      }
      togglePause(true);
      navigation.navigate('Transition', {
        state: state,
        cameFrom: 'TrainOfThoughts',
      });
    }
  }, [
    // !completedPopup &&
    TIME,
  ]);

  const renderMap = switchObj => {
    let elements = [];
    let id = switchObj.id;
    let direction0 = originalSwitchDirections[id][0];
    let direction1 = originalSwitchDirections[id][1];
    let path0 = switchObj[direction0];
    let path1 = switchObj[direction1];
    elements.push(
      Switch({x: switchObj.x, y: switchObj.y}, switchSize, id, [
        direction0,
        direction1,
      ]),
    );
    elements.push(Track(path0.path));
    elements.push(Track(path1.path));
    if (path0.switch) {
      elements.push(...renderMap(path0.switch));
    }
    if (path1.switch) {
      elements.push(...renderMap(path1.switch));
    }
    if (path0.destination) {
      elements.push(
        Station(
          path0.destination,
          {x: switchObj.x, y: switchObj.y},
          stationSize,
        ),
      );
    }
    if (path1.destination) {
      elements.push(
        Station(
          path1.destination,
          {x: switchObj.x, y: switchObj.y},
          stationSize,
        ),
      );
    }
    return elements;
  };

  const curveCoordinates = adjustCoordinates({x: 370, y: 626});
  return (
    <GameWrapper
      imageURL={BackgroundImage.TrainofThoughts}
      backgroundGradient={COLORS.trainOfThoughtsBGGradient}
      scoreboard={[
        <InfoLabel
          label={'Time'}
          value={TIME}
          style={styles.infoLabel}
          key="time"
        />,
        <InfoLabel
          label={'Score'}
          value={state.score.toString()}
          style={styles.infoLabel}
          key="score"
          showAnimation={true}
        />,
      ]}>
      {[
        Track([
          {x: 375, y: 850},
          {x: 375, y: 650},
        ]),
        <View
          style={{
            position: 'absolute',
            left: curveCoordinates.x,
            top: curveCoordinates.y,
          }}
          key="curve">
          <CurveSVG height={curveSize} width={curveSize} />
        </View>,
        Track([
          {x: 375, y: 625},
          {x: 300, y: 625},
        ]),
        ,
        ...renderMap(path.switch),
      ]}

      {trains.map(train => (
        <Train
          key={train.trainId}
          id={train.trainId}
          color={train.color}
          setTrains={setTrains}
          dispatch={dispatch}
          ACTIONS={ACTIONS}
        />
      ))}
    </GameWrapper>
  );
};

export default TrainOfThoughts;
