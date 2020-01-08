import React, { Component } from 'react';
import '../App.css';
import PromptField from './PromptField';
import SignalSwitch from './SignalSwitch';

class GameMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentJokeIndex: 0,
      charLastComplete: -1,
      elementLastComplete: -1,
      timeStart: 0,
      testCount: 0,
    };
    this.completeElement = this.completeElement.bind(this);
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

  completeElement = (currentIndex, elementsLength, msgLength) => {
    if (currentIndex < elementsLength) {
      this.setState({ elementLastComplete: this.state.elementLastComplete + 1 });
      console.log("Last Completed Element: ", this.state.elementLastComplete);
    } else {
      this.setState({ 
        charLastComplete: this.state.charLastComplete + 1, 
        elementLastComplete: -1
       });
    }
  };

  // checkCharacter = ()

  render() {
    return (
      <div className="game">
        <div className="promptField">
          <PromptField jokeIndex={this.state.currentJokeIndex} charLastComplete={this.state.charLastComplete} elementLastComplete={this.state.elementLastComplete} />
        </div>
          <SignalSwitch completeElement={this.completeElement} startTimer={this.saveCurrentStartTime} stopTimer={this.saveCurrentEndTime}/>
      </div>
    )
  }
};

export default GameMaster;