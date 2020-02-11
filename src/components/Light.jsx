import React, { useState, useContext, useEffect } from 'react';
import { SettingsContext } from '../App';
import { GameContext } from './GameMaster';

const Light = () => {
  const { gameState: { isPressed } } = useContext(GameContext);
  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    if (isPressed) {
      setIsOn(true);
    } else setIsOn(false);
  }, [isPressed]);

  return (
    <div className="light-container">
      { isOn && <div className="light-on" />}
      { !isOn && <div className="light-off" />}
    </div>
  );
};

export default Light;
