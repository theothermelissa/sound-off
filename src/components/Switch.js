import React, { useState, useRef, useContext } from 'react';
import '../App.css';
import {useAudio} from 'react-use';
import soundSignal from '../assets/800hz.mp3';
import signalElements from '../assets/signalElements';
import { GameContext } from "./GameMaster";

const Switch = () => {
  const { gameDispatch } = useContext(GameContext);

  const [pressTime, setPressTime] = useState(0);
  const [switchIsPressed, setSwitchIsPressed] = useState(false);

  const [audio, state, controls, ref] = useAudio ({
    src: soundSignal,
    autoPlay: false,
  });

  const duration = (start, end) => (end - start) / 1000;

  const determineSignalType = (totalTime) => {
    const dotMin = signalElements.dot.minDuration;
    const dotMax = signalElements.dot.maxDuration;
    const dashMin = signalElements.dash.minDuration;
    const dashMax = signalElements.dash.maxDuration;
    if (dotMin <= totalTime && totalTime <= dotMax) {
      return "dot";
    } else if (dashMin < totalTime && totalTime <= dashMax) {
      return "dash";
    } else {
      return "invalidSignal";
    }
  };

  const onPress = (event) => {
    controls.play();
    setPressTime(event.timeStamp);
    setSwitchIsPressed(true);
  };
  
  const onRelease = (releaseTime) => {
    setSwitchIsPressed(false);
    controls.pause();
    console.log(determineSignalType(duration(pressTime, releaseTime)), " received.")
    gameDispatch({
      type: determineSignalType(duration(pressTime, releaseTime)),
      startTime: pressTime,
      endTime: releaseTime,
    })
  };

  return(
    <div className="buttonContainer">
      {audio}
      <div
        onMouseDown={(event) => onPress(event)}
        onMouseUp={(event) => onRelease(event.timeStamp)}
        className={`switchButton${(switchIsPressed) ? ' pressed' : ''}`}>
      </div>
    </div>
  )
}

export default Switch;