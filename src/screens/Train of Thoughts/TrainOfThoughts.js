import React, {
  useState,
  useEffect,
  useContext,
  useReducer,
  useRef,
  useMemo,
} from 'react';
import {View, ActivityIndicator} from 'react-native';
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
} from '../../utilities/Train of Thoughts';
import {
  Train,
  Switch,
  Station,
  Track,
} from '../../components/Train of Thoughts/';

import CurveSVG from '../../components/Train of Thoughts/SVG/CurveSVG';
import initialState from './initialState';
const TrainOfThoughts = () => {
  const navigation = useNavigation();
  const {
    trainColors,
    path,
    curveSize,
    switchSize,
    stationSize,
    originalSwitchDirections,
    TIME,
  } = useContext(TrainOfThoughtsContext);
  const {user} = useContext(AuthContext);
  const GameRef = db.ref(`/users/${user.uid}/TrainOfThoughts/`);
  const [spawnSpeed, setSpawnSpeed] = useState(3000);
  const [loading, setLoading] = useState(true);
  const [completedPopup, setCompletedPopup] = useState(false);
  const [trains, setTrains] = useState([
    {color: getRandomColor(trainColors), trainId: 0, departureTime: TIME},
  ]);
  const [state, dispatch] = useReducer(reducer, initialState);

  let trainCount = useRef(0);

  useMemo(() => {
    GameRef.once('value', snapshot => {
      const exists = snapshot.exists();
      if (exists) {
        const data = snapshot.val();
        let {status} = data;

        if (status === 'COMPLETED') {
          setCompletedPopup(true);
        } else {
          GameRef.set({
            status: 'IN_PROGRESS',
          });
          dispatch({
            type: ACTIONS.INIT_LEVEL,
          });
        }
      }
    })
      .then(() => setLoading(false))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const departureTime = TIME;
      const newTrain = {
        color: getRandomColor(trainColors),
        trainId: ++trainCount.current,
        departureTime: departureTime,
      };
      setTrains(prevTrains => [...prevTrains, newTrain]);
    }, spawnSpeed);

    return () => {
      clearInterval(intervalId);
    };
  }, [trainCount.current]);

  useEffect(() => {
    if (spawnSpeed > 2000) {
      const decreaseIntervalId = setInterval(() => {
        setSpawnSpeed(prevSpeed => prevSpeed - 300);
      }, 5000);
      return () => {
        clearInterval(decreaseIntervalId);
      };
    }
  }, [spawnSpeed]);

  useEffect(() => {
    if (TIME === '00:00') {
      dispatch({type: ACTIONS.ON_TIME_UP, payload: {uid: user.uid}});
      navigation.navigate('Transition', {
        state: state,
        cameFrom: 'TrainOfThoughts',
      });
    }
  }, [TIME]);

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

  return loading ? (
    <ActivityIndicator size="large" color="#0000ff" />
  ) : completedPopup ? (
    <CompletedPopup gameName="MemoryMatrix" />
  ) : (
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
          departureTime={train.departureTime}
        />
      ))}
    </GameWrapper>
  );
};

export default TrainOfThoughts;
