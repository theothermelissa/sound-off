import React, { useState, useEffect } from 'react';
import '../App.css';
import {useAudio} from 'react-use';
import soundSignal from '../assets/800hz.mp3';

const SignalSwitch = () => {
  const [audio, controls] = useAudio ({
    src: soundSignal,
    autoPlay: false,
  });

  return(
    <div className="buttonContainer">
      {audio}
      <button onMouseDown={controls.play} onMouseUp={controls.pause} className="switchButton"></button>
    </div>
  )
}

export default SignalSwitch;