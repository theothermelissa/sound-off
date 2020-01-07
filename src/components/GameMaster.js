import React, { Component } from 'react';
import '../App.css';
import thingsToSay from '../assets/thingsToSay';
import Prompt from './Prompt';
import SignalSwitch from './SignalSwitch'


class GameMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentJoke: 0,
      activeCharacter: 0,
      timeStart: 0,
      timeEnd: 0,
    };
  };

  makePromptList = (msg) => {
    return thingsToSay[msg]["call"].split();
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

  // completePrompt = () => {

  // }

  render() {
    return (
      <div>
        <div>{this.makePromptList(this.state.currentJoke)}</div>
        <SignalSwitch startTimer={this.saveCurrentStartTime} stopTimer={this.saveCurrentEndTime}/>
      </div>
    )
  }
};

export default GameMaster;