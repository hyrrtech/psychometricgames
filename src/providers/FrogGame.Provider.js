import React, {
  createContext,
  useState,
  useMemo,
  useRef,
  useEffect,
} from 'react';
import {
  randomLillipadPositions,
  constants,
  getInitialLeaderFrogPosition,
  generateSetOfLeaderFrogPositions,
} from '../utilities/Frog Jump';
import CircularBuffer from '../utilities/CircularBuffer';
const {lillipadSize, followerFrogSize, leaderFrogSize} = constants;

export const FrogGameContext = createContext();

export const FrogGameProvider = ({children}) => {
  const [disabled, setDisabled] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  // console.log('gameover', gameOver);
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
  const currentAndFutureFollowerFrogPositions = useRef(circularBuffer);
  const numberOfJumpsByFollowerFrog = useRef(0);

  const [leaderFrogPosition, setLeaderFrogPosition] = useState(
    initialSetOfLeaderFrogPositions,
  );

  const leaderFrogPositionHistory = useRef([
    initialLeaderFrogPosition.id,
    ...initialSetOfLeaderFrogPositions.map(item => item.id),
  ]);

  console.log(leaderFrogPositionHistory.current, 'history');
  const currentLeaderFrogPosition = useRef(initialLeaderFrogPosition);

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
      }}>
      {children}
    </FrogGameContext.Provider>
  );
};
