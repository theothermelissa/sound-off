import React, { useState, useRef } from 'react';
import '../App.css';
import {useAudio} from 'react-use';
import soundSignal from '../assets/800hz.mp3';
import signalElements from '../assets/signalElements';

const Switch = (props) => {
  const { transmitSignal } = props;

  const [isPressed, setIsPressed] = useState(false);
  let [startTime, setStartTime] = useState(0);
  
  const [audio, state, controls, ref] = useAudio ({
    src: soundSignal,
    autoPlay: false,
  });
  
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
      return "error";
    }
  };

  let timeStamp = (event) => event.timeStamp;
  let duration = (start, end) => (end - start) / 1000;
  let newTime;

  const onPress = (pressEvent) => {
    newTime = timeStamp(pressEvent);
    controls.play();
    setIsPressed(true);
    setStartTime(newTime);
  };
  
  const onRelease = (releaseEvent) => {
    newTime = timeStamp(releaseEvent);
    controls.pause();
    setIsPressed(false);
    transmitSignal(determineSignalType(duration(startTime, newTime)), startTime, newTime);
  }

  return(
    <div className="buttonContainer">
      {audio}
      <div onMouseDown={onPress} onMouseUp={onRelease} className={`switchButton${(isPressed) ? ' pressed' : ''}`}></div>
    </div>
  )
}

export default Switch;