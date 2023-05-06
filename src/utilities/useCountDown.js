import {useState, useEffect} from 'react';

const useCountdown = (initialMinutes = 0, initialSeconds = 0) => {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isPaused, setIsPaused] = useState(false);

  const togglePause = bool => {
    setIsPaused(bool);
  };

  useEffect(() => {
    setMinutes(initialMinutes);
    setSeconds(initialSeconds);
  }, [initialMinutes, initialSeconds]);

  useEffect(() => {
    let intervalId;

    if (!isPaused && (seconds > 0 || minutes > 0)) {
      intervalId = setInterval(() => {
        if (seconds === 0 && minutes > 0) {
          setSeconds(59);
          setMinutes(minutes - 1);
        } else if (seconds > 0) {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isPaused, minutes, seconds]);

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  return {TIME: `${formattedMinutes}:${formattedSeconds}`, togglePause};
};

export default useCountdown;
