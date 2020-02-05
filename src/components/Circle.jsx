import React, { useMemo } from 'react';
import { useEffect } from 'react';


const Circle = ({
  radius,
  strokeWidth,
  strokeColor,
  fillColor,
  isPressed,
  // baseClassName,
  progress,
  strokeDasharray,
}) => {
  useEffect(() => {

  }, [strokeDasharray]);
  // const pressed = useMemo(() => (isPressed), [isPressed]);
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  // console.log('strokeDashoffset', strokeDashoffset);
  // console.log('strokeDasharray', strokeDasharray);

  return (
    <svg height={radius * 2} width={radius * 2}>
      <circle
        stroke={strokeColor}
        fill={fillColor}
        strokeWidth={strokeWidth}
        // className={`${baseClassName}${pressed ? ' pressed' : ''}`}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        strokeLinecap="round"
        strokeDasharray={strokeDasharray}
        style={{ strokeDashoffset, transformOrigin: '50% 50%' }}
      />
    </svg>
  );
};

export default Circle;
