import React, {createContext, useState, useEffect} from 'react';

export const TrainOfThoughtsContext = createContext();

export const TrainOfThoughtsProvider = ({children}) => {
  const [trains, setTrains] = useState([0]);
  const [path, setPath] = useState([
    {x: 50, y: 50},
    {x: 50, y: 700},
    {x: 400, y: 700},
    {x: 400, y: 50},
    {x: 50, y: 50},
  ]);

  //   useEffect(() => {
  //     const intervalId = setInterval(() => {
  //       //colors can be used to differentiate trains
  //       setTrains([...trains, trains[trains.length - 1] + 1]);
  //     }, 2000);

  //     return () => {
  //       clearInterval(intervalId);
  //     };
  //   }, [trains]);

  return (
    <TrainOfThoughtsContext.Provider
      value={{
        trains,
        setTrains,
        path,
        setPath,
      }}>
      {children}
    </TrainOfThoughtsContext.Provider>
  );
};
