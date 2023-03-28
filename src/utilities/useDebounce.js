import {useState} from 'react';

function useDebounce(callback, delay) {
  const [isReady, setIsReady] = useState(true);

  function handleClick() {
    if (isReady) {
      setIsReady(false);
      callback();

      setTimeout(() => {
        setIsReady(true);
      }, delay);
    }
  }

  return handleClick;
}

export default useDebounce;
