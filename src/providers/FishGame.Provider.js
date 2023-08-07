import React, {createContext, useState, useEffect} from 'react';

export const FishGameContext = createContext();

export const FishGameProvider = ({children}) => {
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (disabled)
      setTimeout(() => {
        setDisabled(false);
      }, 3000);
  }, [disabled]);

  return (
    <FishGameContext.Provider
      value={{
        disabled,
        setDisabled,
      }}>
      {children}
    </FishGameContext.Provider>
  );
};
