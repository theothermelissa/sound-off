import React, { useState, useEffect } from 'react';
import '../App.css';
import {useAudio} from 'react-use';
import soundSignal from '../assets/800hz.mp3';

const SignalSwitch = (props) => {

  const [audio, state, controls, ref] = useAudio ({
    src: soundSignal,
    autoPlay: false,
  });

  const [completePrompt, setCompletePrompt] = useState(false);

  const handlePress = () => {
    controls.play();
    // props.startTimer(props.event);
  };

  const handleRelease = () => {
    controls.pause();
    // props.stopTimer(props.event);
    // props.checkSignal();
    // console.log("Props given to handleRelease: ", event)
    props.increaseCount();
  }


  return(
    <div className="buttonContainer">
      {audio}
      <button onMouseDown={handlePress} onMouseUp={handleRelease} className="switchButton"></button>
    </div>
  )
}

export default SignalSwitch;