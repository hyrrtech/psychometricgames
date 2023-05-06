import {useState} from 'react';

function useDebounce(callback, delay) {
  const [isReady, setIsReady] = useState(true);

  function handleClick(...args) {
    if (isReady) {
      setIsReady(false);
      callback(...args);

      setTimeout(() => {
        setIsReady(true);
      }, delay);
    }
  }

  return handleClick;
}

export default useDebounce;
