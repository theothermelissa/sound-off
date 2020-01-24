import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';

const Timer = ({ timerShouldRun, transmitElapsedSeconds }) => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const elapsedSeconds = useRef(0);

  const isRunning = useMemo(() => (timerShouldRun === true) ? true : false, [timerShouldRun])

  useEffect(() => {
    if (isRunning) {
      const timeout = setTimeout(() => {
        const date = new Date();
        elapsedSeconds.current = elapsedSeconds.current + 1;
        setTime(date.toLocaleTimeString());
        // transmitElapsedSeconds(elapsedSeconds.current);
      }, 1000);
      return () => { clearTimeout(timeout) };
    } else {
      elapsedSeconds.current = 0;
    }
  }, [isRunning, time, elapsedSeconds, transmitElapsedSeconds]);
  return (
    <div>
      <div>{elapsedSeconds.current}</div>
    </div>
  )
};

export default Timer;
