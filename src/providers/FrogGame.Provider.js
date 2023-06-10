import React, {createContext, useState, useMemo, useRef} from 'react';
import {
  initialState,
  MAX_NUM_OF_JUMPS,
} from '../screens/Frog Jump/initialState';

export const FrogGameContext = createContext();

export const FrogGameProvider = ({children}) => {
  const [disabled, setDisabled] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  const {
    initialFollowerFrogPosition,
    initialLeaderFrogPosition,
    lillipadPositions,
    circularBuffer,
    initialSetOfLeaderFrogPositions,
  } = initialState;

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
      }}>
      {children}
    </FrogGameContext.Provider>
  );
};
