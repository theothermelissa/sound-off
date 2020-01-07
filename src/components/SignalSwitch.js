import React, { useState, useEffect } from 'react';
import '../App.css';
import {useAudio} from 'react-use';
import soundSignal from '../assets/800hz.mp3';

const SignalSwitch = (props) => {

  const [audio, state, controls, ref] = useAudio ({
    src: soundSignal,
    autoPlay: false,
  });

  const handlePress = (event) => {
    controls.play();
    props.startTimer(event);
  };

  const handleRelease = (event) => {
    controls.pause();
    props.stopTimer(event);
  }

  return(
    <div className="buttonContainer">
      {audio}
      <button onMouseDown={handlePress} onMouseUp={handleRelease} className="switchButton"></button>
    </div>
  )
}

export default SignalSwitch;