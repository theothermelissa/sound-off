import React, {
  useState, useMemo, useRef, useEffect,
} from 'react';
import Circle from './Circle';


const ResetSpinner = ({ radius, stroke, shouldRun }) => {
  const [isComplete, setIsComplete] = useState(false);
  const isRunning = useMemo(() => (shouldRun && !isComplete), [shouldRun, isComplete]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const newProgress = progress + 1;
    if (isRunning) {
      if (progress === 100) {
        setIsComplete(true);
      }
      const interval = setInterval(() => {
        setProgress(newProgress);
      }, 30);
      return () => clearInterval(interval);
    } if (!isComplete) {
      setProgress(0);
    }
  }, [isRunning, progress, isComplete]);

  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  // const strokeDashOffset = circumference - (progress / 100) * circumference;
  return (
    <Circle
      radius={radius}
      strokeWidth={stroke}
      strokeColor="red"
      fillColor="transparent"
      isPressed={isRunning}
      strokeDasharray={circumference}
      progress={progress}
      // cy={radius}
    />
  );
};

export default ResetSpinner;
