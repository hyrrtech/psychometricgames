import React, {
  createContext,
  useState,
  useMemo,
  useRef,
  useEffect,
  useContext,
} from 'react';
import {
  randomLillipadPositions,
  getInitialLeaderFrogPosition,
  generateSetOfLeaderFrogPositions,
} from '../utilities/Frog Jump';
import CircularBuffer from '../utilities/CircularBuffer';
import db from '../firebase/database';
import {AuthContext} from './AuthProvider';
export const FrogGameContext = createContext();

export const FrogGameProvider = ({children}) => {
  const {user} = useContext(AuthContext);
  const [disabled, setDisabled] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  const {
    initialFollowerFrogPosition,
    initialLeaderFrogPosition,
    lillipadPositions,
    circularBuffer,
    initialSetOfLeaderFrogPositions,
  } = useMemo(() => {
    const lillipadPositions = randomLillipadPositions(10);
    const initialFollowerFrogPosition =
      lillipadPositions[Math.floor(Math.random() * lillipadPositions.length)];

    const initialLeaderFrogPosition = getInitialLeaderFrogPosition(
      lillipadPositions,
      initialFollowerFrogPosition.id,
    );
    const circularBuffer = new CircularBuffer(2);
    circularBuffer.push(initialFollowerFrogPosition);

    const initialSetOfLeaderFrogPositions = generateSetOfLeaderFrogPositions(
      initialLeaderFrogPosition,
      circularBuffer,
      lillipadPositions,
      3,
    );
    return {
      initialFollowerFrogPosition,
      initialLeaderFrogPosition,
      lillipadPositions,
      circularBuffer,
      initialSetOfLeaderFrogPositions,
    };
  }, []);

  const [followerFrogPosition, setFollowerFrogPosition] = useState(
    initialFollowerFrogPosition,
  );
  const [leaderFrogPosition, setLeaderFrogPosition] = useState(
    initialSetOfLeaderFrogPositions,
  );

  const currentAndFutureFollowerFrogPositions = useRef(circularBuffer);
  const numberOfJumpsByFollowerFrog = useRef(0);

  const leaderFrogPositionHistory = useRef([
    initialLeaderFrogPosition.id,
    ...initialSetOfLeaderFrogPositions.map(item => item.id),
  ]);
  const currentLeaderFrogPosition = useRef(initialLeaderFrogPosition);

  useEffect(() => {
    if (gameOver) {
      const GameRef = db.ref(`/users/${user.uid}/FollowTheFrog/`);
      GameRef.update({
        numberOfJumpsByFollowerFrog: numberOfJumpsByFollowerFrog.current,
      });
    }
  }, [gameOver]);

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
      }}>
      {children}
    </FrogGameContext.Provider>
  );
};
