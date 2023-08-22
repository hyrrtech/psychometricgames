import React, {
  useState,
  useEffect,
  useContext,
  useReducer,
  useRef,
  useMemo,
} from 'react';
import {ActivityIndicator} from 'react-native';
import CompletedPopup from '../../components/CompletedPopup';
import {GameWrapper} from '../../components/GameWrapper';
import BackgroundImage from '../../values/BackgroundImage';
import {COLORS} from '../../values/Colors';
import {TrainOfThoughtsContext} from '../../providers/TrainOfThoughts.Provider';
import {AuthContext} from '../../providers/AuthProvider';
import db from '../../firebase/database';
import {ACTIONS, reducer} from './reducer';
import {constants, getRandomColor} from '../../utilities/Train of Thoughts';
import {Train, Map} from '../../components/Train of Thoughts/';
import initialState from './initialState';
const {initialSpawnSpeed, scoreIncrement} = constants;
const TrainOfThoughts = ({navigation}) => {
  const {trainColors, TIME} = useContext(TrainOfThoughtsContext);
  const {user} = useContext(AuthContext);

  const GameRef = db.ref(`/users/${user.uid}/TrainOfThoughts/`);

  let trainCount = useRef(0);
  const spawnSpeed = useRef(initialSpawnSpeed);

  const [trains, setTrains] = useState([
    {color: getRandomColor(trainColors), trainId: 0, departureTime: TIME},
  ]);
  const [completedPopup, setCompletedPopup] = useState(false);
  const [loading, setLoading] = useState(true);

  const [state, dispatch] = useReducer(reducer, initialState);

  const scoreArray = useRef([]);

  useEffect(() => {
    if (scoreArray.current.length === 0) {
      scoreArray.current = [
        {score: state.score, spawnSpeed: spawnSpeed.current},
      ];
    } else {
      const lastScore = scoreArray.current[scoreArray.current.length - 1].score;
      const scoreDifference = state.score - lastScore;
      scoreArray.current = [
        ...scoreArray.current,
        {score: scoreDifference, spawnSpeed: spawnSpeed.current},
      ];
    }

    if (spawnSpeed.current > 2600) {
      if (scoreArray.current.length > 4) {
        const negativeScores = scoreArray.current.filter(
          score => score.score < 0,
        );
        if (negativeScores.length / scoreArray.current.length > 0.6) {
          spawnSpeed.current = spawnSpeed.current + initialSpawnSpeed * 0.1;
        } else {
          spawnSpeed.current = spawnSpeed.current - initialSpawnSpeed * 0.15;
        }
      }
    }
  }, [state.score]);

  useEffect(() => {
    GameRef.once('value', snapshot => {
      const exists = snapshot.exists();
      if (exists) {
        const data = snapshot.val();
        data.status === 'COMPLETED'
          ? setCompletedPopup(true)
          : GameRef.set({
              status: 'IN_PROGRESS',
            });
      }
    })
      .then(() => setLoading(false))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    if (!loading) {
      const intervalId = setInterval(() => {
        const departureTime = TIME;
        const newTrain = {
          color: getRandomColor(trainColors),
          trainId: ++trainCount.current,
          departureTime: departureTime,
        };
        setTrains(prevTrains => [...prevTrains, newTrain]);
      }, spawnSpeed.current);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [trainCount.current, spawnSpeed.current, loading]);

  useEffect(() => {
    if (TIME === '00:00') {
      dispatch({type: ACTIONS.ON_TIME_UP, payload: {uid: user.uid}});
      navigation.navigate('Transition', {
        state: state,
        cameFrom: 'TrainOfThoughts',
      });
    }
  }, [TIME]);

  return loading ? (
    <ActivityIndicator size="large" color="#0000ff" />
  ) : completedPopup ? (
    <CompletedPopup gameName="TRAIN OF THOUGHS" />
  ) : (
    <GameWrapper
      imageURL={BackgroundImage.TrainofThoughts}
      backgroundGradient={COLORS.trainOfThoughtsBGColor}
      scoreboard={[
        {title: 'Spawn Speed', value: `${spawnSpeed.current / 1000}s`},
        {title: 'Time', value: TIME},
        {title: 'Score', value: state.score},
      ]}>
      <Map />

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
