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
  console.log('gameover', gameOver);
  const {
    initialFollowerFrogPosition,
    initialLeaderFrogPosition,
    lillipadPositions,
    frogPositions,
    circularBuffer,
    initialSetOfLeaderFrogPositions,
  } = useMemo(() => {
    const lillipadPositions = randomLillipadPositions(10);
    const frogPositions = lillipadPositions.map(lillipad => {
      return {
        x: lillipad.x + (lillipadSize - followerFrogSize) / 2,
        y: lillipad.y + (lillipadSize - followerFrogSize) / 2,
      };
    });
    const indexForIntialFrogPosition = Math.floor(
      Math.random() * frogPositions.length,
    );
    const initialFollowerFrogPosition =
      frogPositions[indexForIntialFrogPosition];

    const initialLeaderFrogPosition = getInitialLeaderFrogPosition(
      frogPositions,
      indexForIntialFrogPosition,
    );
    const circularBuffer = new CircularBuffer(2);
    circularBuffer.push(initialFollowerFrogPosition);

    const initialSetOfLeaderFrogPositions = generateSetOfLeaderFrogPositions(
      initialLeaderFrogPosition,
      circularBuffer,
      frogPositions,
      3,
    );

    return {
      initialFollowerFrogPosition,
      initialLeaderFrogPosition,
      lillipadPositions,
      frogPositions,
      circularBuffer,
      initialSetOfLeaderFrogPositions,
    };
  }, []);

  const [followerFrogPosition, setFollowerFrogPosition] = useState({
    x: initialFollowerFrogPosition.x,
    y: initialFollowerFrogPosition.y,
  });
  const recentFollowerFrogPositions = useRef(circularBuffer);

  const [leaderFrogPosition, setLeaderFrogPosition] = useState(
    initialSetOfLeaderFrogPositions,
  );

  const leaderFrogPositionHistory = useRef(
    initialSetOfLeaderFrogPositions.map(item =>
      frogPositions.findIndex(
        frogPosition =>
          frogPosition.x ===
            item.x -
              (lillipadSize - leaderFrogSize) / 2 +
              (lillipadSize - followerFrogSize) / 2 &&
          frogPosition.y ===
            item.y -
              (lillipadSize - leaderFrogSize) / 2 +
              (lillipadSize - followerFrogSize) / 2,
      ),
    ),
  );
  console.log(leaderFrogPositionHistory.current);
  const currentLeaderFrogPosition = useRef(initialLeaderFrogPosition);

  return (
    <FrogGameContext.Provider
      value={{
        lillipadPositions,
        frogPositions,
        followerFrogPosition,
        initialFollowerFrogPosition,
        initialLeaderFrogPosition,
        setFollowerFrogPosition,
        setLeaderFrogPosition,
        leaderFrogPosition,
        disabled,
        setDisabled,
        recentFollowerFrogPositions,
        currentLeaderFrogPosition,
        leaderFrogPositionHistory,
      }}>
      {children}
    </FrogGameContext.Provider>
  );
};
