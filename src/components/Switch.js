import React, { useState, useEffect } from 'react';
import '../App.css';
import {useAudio} from 'react-use';
import soundSignal from '../assets/800hz.mp3';

const Switch = (props) => {

  const [audio, state, controls, ref] = useAudio ({
    src: soundSignal,
    autoPlay: false,
  });

  const [completePrompt, setCompletePrompt] = useState(false);

    // saveCurrentStartTime = (pressEvent) => {
  //   let start = pressEvent.timeStamp
  //   this.setState({timeStart: start})
  //   return start;
  // };
  
  // saveCurrentEndTime = (releaseEvent) => {
  //   let end = releaseEvent.timeStamp
  //   // this.setState({timeEnd: end});
  //   let totalTime = (end - this.state.timeStart)/1000;
  //   console.log("Total time: ", totalTime)
  //   return totalTime;
  // };

  // checkSignal = (minDuration, totalTime, maxDuration) => {
  //   if (minDuration <= totalTime <= maxDuration) {
  //     this.setState ({ elementStatus: "Complete" });
  //   } else {
  //     return null
  //   }
  // };

  const onPress = () => {
    controls.play();
    // props.startTimer(props.event);

  };

  const onRelease = () => {
    controls.pause();
    // props.stopTimer(props.event);
    // props.checkSignal();
    // console.log("Props given to onRelease: ", event)
    props.transmitSignal("dot");
    // props.completeElement(props.activeElementIndex, props.activeElementsLength, props.activeCharIndex, props.activeMessageLength);
  }


  return(
    <div className="buttonContainer">
      {audio}
      <button onMouseDown={onPress} onMouseUp={onRelease} className="switchButton"></button>
    </div>
  )
}

export default Switch;