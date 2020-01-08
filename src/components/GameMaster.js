import React, { Component, useState } from 'react';
import '../App.css';
import thingsToSay from '../assets/thingsToSay';
import Prompt from './Prompt';
import SignalSwitch from './SignalSwitch'


const PromptList = (props) => {
  let msg = thingsToSay[props.index]["call"].split("");
  return msg.map((letter, index) => {
    return <Prompt char={letter} status={props.status} key={letter+index}/>
  })
};

class GameMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentJokeIndex: 0,
      activeCharacter: "",
      status: "incomplete",
      minDuration: "",
      maxDuration: "",
      timeStart: 0,
      timeEnd: 0,
    };
    this.checkPrompt = this.checkPrompt.bind(this);
  };

  saveCurrentStartTime = (pressEvent) => {
    let start = pressEvent.timeStamp
    this.setState({timeStart: start})
    return start;
  };

  saveCurrentEndTime = (releaseEvent) => {
    let end = releaseEvent.timeStamp
    this.setState({timeEnd: end});
    let totalTime = (end - this.state.timeStart)/1000;
    console.log("Total time: ", totalTime)
    return totalTime;
  };

  checkPrompt = (minDuration, totalTime, maxDuration) => {
    if (minDuration <= totalTime <= maxDuration) {
      this.setState ({ status: "complete" });
    } else {
      return null
    }
  };



  render() {
    return (
      <div className="game">
        <div className="promptField">
          <PromptList checkPrompt={this.checkPrompt} index={this.state.currentJokeIndex} status={this.state.status} />
        </div>
          <SignalSwitch startTimer={this.saveCurrentStartTime} stopTimer={this.saveCurrentEndTime}/>
      </div>
    )
  }
};

export default GameMaster;