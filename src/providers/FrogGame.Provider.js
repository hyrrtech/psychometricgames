import React, {
  createContext,
  useState,
  useMemo,
  useRef,
  useEffect,
  useContext,
} from 'react';
import {AuthContext} from './AuthProvider';
import db from '../firebase/database';
import {interpolate} from 'flubber';
import {frames} from '../components/Frog Game/frames';
import {constants, stateGenerator} from '../utilities/Frog Jump';

const {NUM_OF_LILLIPADS, MAX_NUM_OF_JUMPS, LIVES} = constants;

export const FrogGameContext = createContext();

export const FrogGameProvider = ({children}) => {
  const {user} = useContext(AuthContext);
  const GameRef = db.ref(`/users/${user.uid}/FollowThatFrog/`);
  const [disabled, setDisabled] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [showDemo, setShowDemo] = useState(true);
  const [completedPopup, setCompletedPopup] = useState(false);
  const [interpolations, setInterpolations] = useState({});
  const [demoState, setDemoState] = useState({demoStage: 1});
  const [loading, setLoading] = useState(true);

  const [followerFrogPosition, setFollowerFrogPosition] = useState([]);
  const [leaderFrogPosition, setLeaderFrogPosition] = useState([]);
  const [lives, setLives] = useState(LIVES);
  const [correctLillipadId, setCorrectLillipadId] = useState(null);

  const numberOfJumpsByFollowerFrog = useRef(0);
  const currentAndFutureFollowerFrogPositions = useRef([]);
  const leaderFrogPositionHistory = useRef([]);
  const currentLeaderFrogPosition = useRef(0);

  const {
    initialFollowerFrogPosition,
    initialLeaderFrogPosition,
    lillipadPositions,
  } = useMemo(() => {
    const values = stateGenerator(NUM_OF_LILLIPADS);
    setFollowerFrogPosition(values.initialFollowerFrogPosition);
    setLeaderFrogPosition(values.initialSetOfLeaderFrogPositions);
    numberOfJumpsByFollowerFrog.current = 0;
    currentLeaderFrogPosition.current = values.initialLeaderFrogPosition;
    leaderFrogPositionHistory.current = [
      values.initialLeaderFrogPosition.id,
      ...values.initialSetOfLeaderFrogPositions.map(item => item.id),
    ];
    currentAndFutureFollowerFrogPositions.current = values.circularBuffer;

    return values;
  }, [showDemo]);

  const calculateInterpolations = async () => {
    const interpolations = await new Promise(resolve => {
      setTimeout(() => {
        const result = Object.keys(frames[0]).reduce((acc, key) => {
          acc[key] = frames.map((frame, index) =>
            interpolate(frame[key], frames[(index + 1) % frames.length][key], {
              maxSegmentLength: 7,
            }),
          );

          return acc;
        }, {});

        resolve(result);
      }, 0);
    });
    setInterpolations(interpolations);
    setLoading(false);
  };

  useEffect(() => {
    GameRef.once('value', snapshot => {
      const exists = snapshot.exists();
      if (exists) {
        setCompletedPopup(true);
        setLoading(false);
      } else {
        calculateInterpolations();
      }
    }).catch(err => console.log(err));
  }, []);

  return (
    <FrogGameContext.Provider
      value={{
        lillipadPositions,
        followerFrogPosition,
        initialFollowerFrogPosition,
        initialLeaderFrogPosition,
        setFollowerFrogPosition,
        setLeaderFrogPosition,
        leaderFrogPosition,
        disabled,
        setDisabled,
        currentAndFutureFollowerFrogPositions,
        currentLeaderFrogPosition,
        leaderFrogPositionHistory,
        numberOfJumpsByFollowerFrog,
        setGameOver,
        gameOver,
        MAX_NUM_OF_JUMPS,
        showDemo,
        setShowDemo,
        loading,
        setLoading,
        interpolations,
        completedPopup,
        demoState,
        setDemoState,
        lives,
        setLives,
        correctLillipadId,
        setCorrectLillipadId,
      }}>
      {children}
    </FrogGameContext.Provider>
  );
};
