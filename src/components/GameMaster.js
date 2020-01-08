import React, { Component } from 'react';
import '../App.css';
import PromptField from './PromptField';
import SignalSwitch from './SignalSwitch';

class GameMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentJokeIndex: 0,
      charLastComplete: 3,
      elementLastComplete: 4,
      timeStart: 0,
      testCount: 0,
    };
    this.increaseCount = this.increaseCount.bind(this);
    // this.checkPrompt = this.checkPrompt.bind(this);
    // this.checkPrompt = this.checkPrompt.bind(this);
  };

  saveCurrentStartTime = (pressEvent) => {
    let start = pressEvent.timeStamp
    this.setState({timeStart: start})
    return start;
  };

  saveCurrentEndTime = (releaseEvent) => {
    let end = releaseEvent.timeStamp
    // this.setState({timeEnd: end});
    let totalTime = (end - this.state.timeStart)/1000;
    console.log("Total time: ", totalTime)
    return totalTime;
  };

  checkSignal = (minDuration, totalTime, maxDuration) => {
    if (minDuration <= totalTime <= maxDuration) {
      this.setState ({ elementStatus: "Complete" });
    } else {
      return null
    }
  };

  increaseCount = () => {
    this.setState({ testCount: this.state.testCount + 1})
    console.log("current count: ", this.state.testCount)
  }

  // checkCharacter = ()

  render() {
    return (
      <div className="game">
        <div className="promptField">
          <PromptField jokeIndex={this.state.currentJokeIndex} charLastComplete={this.state.charLastComplete} elementLastComplete={this.state.elementLastComplete} />
        </div>
          <SignalSwitch increaseCount={this.increaseCount} startTimer={this.saveCurrentStartTime} stopTimer={this.saveCurrentEndTime}/>
      </div>
    )
  }
};

export default GameMaster;