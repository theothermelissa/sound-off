import React, { useState, useEffect } from 'react';
import '../App.css';
import {useAudio} from 'react-use';
import soundSignal from '../assets/800hz.mp3';
import signalElements from '../assets/signalElements';

const Switch = (props) => {
  const [isPressed, setIsPressed] = useState(false);
  const [timeStart, setTimeStart] = useState(0);

  const [audio, state, controls, ref] = useAudio ({
    src: soundSignal,
    autoPlay: false,
  });

    const saveCurrentStartTime = (pressEvent) => {
    console.log("Saving start time.")
      let start = pressEvent.timeStamp;
    setTimeStart(start);
    };
  
    const totalTimePressed = (releaseEvent) => {
    let end = releaseEvent.timeStamp
    let totalTime = (end - timeStart)/1000;
    console.log("Total time: ", totalTime)
    return totalTime;
    };

  const checkSignal = (totalTime) => {
    const dotMin = signalElements.dot.minDuration;
    const dotMax = signalElements.dot.maxDuration;
    const dashMin = signalElements.dash.minDuration;
    const dashMax = signalElements.dash.maxDuration;
    if (dotMin <= totalTime && totalTime <= dotMax) {
      console.log("That was a dot!");
      props.transmitSignal("dot")
    } else if (dashMin < totalTime && totalTime <= dashMax) {
      console.log("That was a dash!");
      props.transmitSignal("dash")
    } else {
      console.log("Oops. Try again!")
    }
  };

  const onPress = (pressEvent) => {
    controls.play();
    setIsPressed(true);
    saveCurrentStartTime(pressEvent);

  };

  const onRelease = (releaseEvent) => {
    controls.pause();
    setIsPressed(false);
    checkSignal(totalTimePressed(releaseEvent));
  }

  return(
    <div className="buttonContainer">
      {audio}
      <div onMouseDown={onPress} onMouseUp={onRelease} className={`switchButton${(isPressed) ? ' pressed' : ''}`}></div>
    </div>
  )
}

export default Switch;