import React, {
  useState, useMemo, useRef, useEffect,
} from 'react';


const ResetSpinner = ({ shouldRun }) => {
  const [isComplete, setIsComplete] = useState(false);
  const isRunning = useMemo(() => (shouldRun && !isComplete), [shouldRun, isComplete]);
  const [progress, setProgress] = useState(0);
  const radius = 100;
  const stroke = 2;

  useEffect(() => {
    const newProgress = progress + 1;
    if (isRunning) {
      if (progress === 100) {
        setIsComplete(true);
      }
      const interval = setInterval(() => {
        setProgress(newProgress);
      }, 22);
      return () => clearInterval(interval);
    }
  }, [isRunning, progress, isComplete]);

  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  return (
    <svg className="spinnerContainer" height={radius * 2} width={radius * 2}>
      <circle
        className="resetSpinner"
        // strokeWidth={stroke}
        strokeDasharray={circumference}
        style={{ strokeDashoffset, transformOrigin: '50% 50%' }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
    </svg>
  );
};

export default ResetSpinner;
