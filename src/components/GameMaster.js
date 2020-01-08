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
      activeCharacter: {
        char: "",
        status: "active",
      },
      timeStart: 0,
      timeEnd: 0,
    };
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

  // checkPrompt = () => {

  // }

  render() {
    return (
      <div className="game">
        <div className="promptField">
          <PromptList  index={this.state.currentJokeIndex} status={this.state.activeCharacter.status} />
        </div>
          <SignalSwitch startTimer={this.saveCurrentStartTime} stopTimer={this.saveCurrentEndTime}/>
      </div>
    )
  }
};

export default GameMaster;