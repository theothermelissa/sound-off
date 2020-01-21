import React, { useState, useEffect } from 'react';
import '../App.css';
import {useAudio} from 'react-use';
import soundSignal from '../assets/800hz.mp3';
import signalElements from '../assets/signalElements';

const Switch = (props) => {
  const { transmitStartTime, transmitSignal, transmitEndTime } = props;

  const [isPressed, setIsPressed] = useState(false);
  const [timeSignalStarted, setTimeSignalStarted] = useState(0);

  const [audio, state, controls, ref] = useAudio ({
    src: soundSignal,
    autoPlay: false,
  });

    let eventTimeStamp = (event) => event.timeStamp;

    const saveCurrentStartTime = (pressEvent) => {
      setTimeSignalStarted(eventTimeStamp(pressEvent));
    };
  
    const totalTimePressed = (releaseEvent) => {
    let totalTime = (eventTimeStamp(releaseEvent) - timeSignalStarted)/1000;
    return totalTime;
    };

  const determineSignalType = (totalTime) => {
    const dotMin = signalElements.dot.minDuration;
    const dotMax = signalElements.dot.maxDuration;
    const dashMin = signalElements.dash.minDuration;
    const dashMax = signalElements.dash.maxDuration;
    if (dotMin <= totalTime && totalTime <= dotMax) {
      transmitSignal("dot")
    } else if (dashMin < totalTime && totalTime <= dashMax) {
      transmitSignal("dash")
    }
  };

  const onPress = (pressEvent) => {
    controls.play();
    setIsPressed(true);
    saveCurrentStartTime(pressEvent);
    transmitStartTime(eventTimeStamp(pressEvent));
    };

  const onRelease = (releaseEvent) => {
    controls.pause();
    setIsPressed(false);
    determineSignalType(totalTimePressed(releaseEvent));
    transmitEndTime(eventTimeStamp(releaseEvent));
  }

  return(
    <div className="buttonContainer">
      {audio}
      <div onMouseDown={onPress} onMouseUp={onRelease} className={`switchButton${(isPressed) ? ' pressed' : ''}`}></div>
    </div>
  )
}

export default Switch;