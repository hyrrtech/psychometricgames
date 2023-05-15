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
const {lillipadSize, followerFrogSize} = constants;

export const FrogGameContext = createContext();

export const FrogGameProvider = ({children}) => {
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
    const circularBuffer = new CircularBuffer(3);
    circularBuffer.push(initialLeaderFrogPosition);

    const initialSetOfLeaderFrogPositions = generateSetOfLeaderFrogPositions(
      initialFollowerFrogPosition,
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
  const recentLeaderFrogPositions = useRef(circularBuffer);

  const [leaderFrogPosition, setLeaderFrogPosition] = useState(
    initialSetOfLeaderFrogPositions,
  );

  const [disabled, setDisabled] = useState(true);
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
        recentLeaderFrogPositions,
      }}>
      {children}
    </FrogGameContext.Provider>
  );
};
