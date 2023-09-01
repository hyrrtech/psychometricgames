import React, {createContext, useState, useEffect} from 'react';
import {interpolate} from 'flubber';
import {frames} from '../components/Fish Game/frames';

export const FishGameContext = createContext();

export const FishGameProvider = ({children}) => {
  const [interpolations, setInterpolations] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showDemo, setShowDemo] = useState(true);

  const calculateInterpolations = async () => {
    const interpolations = await new Promise(resolve => {
      setTimeout(() => {
        const result = Object.keys(frames[0]).reduce((acc, key) => {
          acc[key] = frames.map((frame, index) =>
            interpolate(frame[key], frames[(index + 1) % frames.length][key], {
              maxSegmentLength: 13,
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
    if (disabled)
      setTimeout(() => {
        setDisabled(false);
      }, 3000);
  }, [disabled]);

  useEffect(() => {
    calculateInterpolations();
  }, []);

  return (
    <FishGameContext.Provider
      value={{
        disabled,
        setDisabled,
        loading,
        setLoading,
        interpolations,
        showDemo,
        setShowDemo,
      }}>
      {children}
    </FishGameContext.Provider>
  );
};
