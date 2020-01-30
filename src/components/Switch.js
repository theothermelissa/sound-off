import React, { useState, useRef, useContext } from 'react';
import '../App.css';
import {useAudio} from 'react-use';
import soundSignal from '../assets/800hz.mp3';
import signalElements from '../assets/signalElements';
import { GameContext } from "./GameMaster";


const Switch = () => {
  const { dispatch } = useContext(GameContext);
  // const initialState = {
  //   switchIsPressed: false,
  //   pressTime: "",
  // }
  // const [signalInfo, setSignalInfo] = useState(initialState);
  // const duration = (start, end) => (end - start) / 1000;

  // let [pressTime, setPressTime] = useState(0);
  let pressTime = useRef(0);
  const [switchIsPressed, setSwitchIsPressed] = useState(false);
//   const [audio, state, controls, ref] = useAudio ({
//     src: soundSignal,
//     autoPlay: false,
//   });

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

  const onPress = (event) => {
    // controls.play();
    console.log("Time onPress: ", event.timeStamp)
    pressTime.current = event.timeStamp;
    setSwitchIsPressed(true);
  };
  
  const onRelease = (signalType, releaseTime) => {
    console.log("pressTime on switch release: ", pressTime.current)
    console.log("releaseTime on switch release: ", releaseTime)
    setSwitchIsPressed(false);
    // controls.pause();
    // transmitSignal(determineSignalsignalType(duration(startTime, newTime)), startTime, newTime);
    // transmitSignal((signalType), signalInfo.pressTime, newTime);
    dispatch({
      type: signalType,
      startTime: pressTime.current,
      endTime: releaseTime,
    })
  };

  return (
    <>
    <button onMouseDown={(event) => onPress(event)} onMouseUp={(event) => onRelease("dot", event.timeStamp)}>dot</button>
    {/* <button onMouseDown={(event) => onPress("dash", event.timeStamp )} onMouseUp={(event) => onRelease("dash", event.timeStamp)}>dash</button> */}
    {/* <button onMouseDown={(event) => onPress("error", event.timeStamp)} onMouseUp={(event) => onRelease("error", event.timeStamp)}>error</button> */}
    </>
  )
}

//   return(
//     <div className="buttonContainer">
//       {audio}
//       <div onMouseDown={onPress} onMouseUp={onRelease} className={`switchButton${(switchIsPressed) ? ' pressed' : ''}`}></div>
//     </div>
//   )
// }

export default Switch;